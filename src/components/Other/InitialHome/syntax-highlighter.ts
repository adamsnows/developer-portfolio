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
  if (!codeBlockRef.current) {
    console.warn("Code block reference is not available yet");
    return {
      duration,
      delay,
      onUpdate: () => {},
      onComplete: () => {},
    };
  }

  try {
    // Make sure we have highlighted code
    const highlightedCode = codeText.includes('style="color:')
      ? codeText
      : highlightJS(codeText);

    // Get the plain text without HTML tags for length calculation
    const plainText = highlightedCode.replace(/<[^>]*>/g, "");

    // Initialize an empty string to store the current display text
    let currentText = "";

    return {
      duration,
      ease: "power1.inOut", // Smoother easing
      onUpdate: function (this: { progress: () => number }) {
        try {
          const progress = this.progress();
          const targetLength = Math.floor(progress * plainText.length);

          // Simple character counting approach
          if (targetLength === currentText.length) {
            return; // No change needed
          }

          // Collect all characters up to the target point
          let textCount = 0;
          let resultHTML = "";
          let inTag = false;
          let currentTag = "";

          // Process each character in the highlighted code
          for (let i = 0; i < highlightedCode.length; i++) {
            const char = highlightedCode[i];

            if (char === "<") {
              inTag = true;
              currentTag += char;
            } else if (char === ">") {
              inTag = false;
              currentTag += char;
              resultHTML += currentTag;
              currentTag = "";
            } else if (inTag) {
              currentTag += char;
            } else {
              resultHTML += char;
              textCount++;

              // Stop when we've reached our target length
              if (textCount >= targetLength) {
                break;
              }
            }
          }

          // Only update if we have content and a reference
          if (codeBlockRef.current && resultHTML) {
            codeBlockRef.current.innerHTML = resultHTML;
            currentText = resultHTML;
          }
        } catch (error) {
          console.error("Animation update error:", error);
        }
      },
      onComplete: function () {
        // Set final content
        if (codeBlockRef.current) {
          codeBlockRef.current.innerHTML = highlightedCode;
        }
      },
      delay,
    };
  } catch (error) {
    console.error("Error setting up animation:", error);

    // Simple fallback
    if (codeBlockRef.current) {
      codeBlockRef.current.innerHTML = codeText;
    }

    return {
      duration: 0.1,
      delay: 0.1,
      onUpdate: () => {},
      onComplete: () => {},
    };
  }
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
