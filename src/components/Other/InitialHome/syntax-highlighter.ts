export const colors = {
  comment: "#6A9955",
  keyword: "#569CD6",
  string: "#CE9178",
  function: "#DCDCAA",
  property: "#9CDCFE",
  bracket: "#D4D4D4",
  variable: "#4FC1FF",
  number: "#B5CEA8",
  boolean: "#569CD6",
  method: "#DCDCAA",
  object: "#4EC9B0",
};

export function highlightJS(code: string): string {
  let highlighted = code
    .replace(
      /(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|=>)/g,
      `<span style="color:${colors.keyword}">$1</span>`
    )
    .replace(/(\/\/.*)/g, `<span style="color:${colors.comment}">$1</span>`)
    .replace(
      /(['"](?:\\.|[^'\\"])*['"])/g,
      `<span style="color:${colors.string}">$1</span>`
    )
    .replace(/([{}[\]()])/g, `<span style="color:${colors.bracket}">$1</span>`)
    .replace(
      /(\w+)(?=\s*:)/g,
      `<span style="color:${colors.property}">$1</span>`
    )
    .replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`)
    .replace(
      /\b(true|false)\b/g,
      `<span style="color:${colors.boolean}">$1</span>`
    )
    .replace(
      /\b(problem|robustAndScalableSolution)\b/g,
      `<span style="color:${colors.variable}">$1</span>`
    )
    .replace(
      /(\w+)(?=\s*\()/g,
      `<span style="color:${colors.function}">$1</span>`
    );

  return highlighted;
}

export function setupCodeTypingAnimation(
  codeBlockRef: React.RefObject<HTMLPreElement>,
  codeText: string,
  duration: number = 6,
  delay: number = 1
) {
  if (!codeBlockRef.current) return;

  const highlightedCode = codeText.includes('style="color:')
    ? codeText
    : highlightJS(codeText);
  codeBlockRef.current.innerHTML = "";

  const plainText = highlightedCode.replace(/<[^>]*>/g, "");

  let currentHTML = "";

  return {
    duration,
    onUpdate: function (this: { progress: () => number }) {
      const progress = this.progress();
      const targetLength = Math.floor(progress * plainText.length);

      if (currentHTML.replace(/<[^>]*>/g, "").length >= targetLength) {
        return;
      }

      let htmlResult = "";
      let plainCounter = 0;
      let htmlCounter = 0;

      while (
        plainCounter < targetLength &&
        htmlCounter < highlightedCode.length
      ) {
        if (highlightedCode[htmlCounter] === "<") {
          const tagEnd = highlightedCode.indexOf(">", htmlCounter) + 1;
          htmlResult += highlightedCode.substring(htmlCounter, tagEnd);
          htmlCounter = tagEnd;
        } else {
          htmlResult += highlightedCode[htmlCounter];
          htmlCounter++;
          plainCounter++;
        }
      }

      currentHTML = htmlResult;
      if (codeBlockRef.current) {
        codeBlockRef.current.innerHTML = htmlResult;
      }
    },
    delay,
  };
}

export function highlightTechArray(array: string[]): string {
  if (!array.length) return "[]";

  let result = "[";

  for (let i = 0; i < array.length; i++) {
    result += `<span style="color:${colors.string}">'${array[i]}'</span>`;
    if (i < array.length - 1) {
      result += ", ";
    }
  }

  result += "]";
  return result;
}

export function highlightJSObject(obj: Record<string, any>): string {
  const lines: string[] = [];
  lines.push("{");

  for (const [key, value] of Object.entries(obj)) {
    let valueStr = "";

    if (Array.isArray(value)) {
      valueStr = highlightTechArray(value);
    } else if (typeof value === "object" && value !== null) {
      valueStr = highlightJSObject(value);
    } else if (typeof value === "string") {
      valueStr = `<span style="color:${colors.string}">'${value}'</span>`;
    } else if (typeof value === "number") {
      valueStr = `<span style="color:${colors.number}">${value}</span>`;
    } else if (typeof value === "boolean") {
      valueStr = `<span style="color:${colors.boolean}">${value}</span>`;
    } else if (typeof value === "function") {
      valueStr = `<span style="color:${
        colors.function
      }">${value.toString()}</span>`;
    } else {
      valueStr = String(value);
    }

    lines.push(
      `  <span style="color:${colors.property}">${key}</span>: ${valueStr},`
    );
  }

  lines.push("}");
  return lines.join("\n");
}
