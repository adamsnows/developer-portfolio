// Simple syntax highlighting utility for code block

// Define color schema
export const colors = {
  comment: "#6A9955", // green for comments
  keyword: "#569CD6", // blue for keywords (const, let, function, return)
  string: "#CE9178", // orange-red for strings
  function: "#DCDCAA", // yellow for functions
  property: "#9CDCFE", // light blue for object properties
  bracket: "#D4D4D4", // gray for brackets and punctuation
  variable: "#4FC1FF", // light-blue for variables
  number: "#B5CEA8", // light green for numbers
  boolean: "#569CD6", // blue for booleans (same as keywords)
  method: "#DCDCAA", // yellow for methods
  object: "#4EC9B0", // teal for objects/classes
};

// Function to highlight code with simple HTML spans
export function highlightJS(code: string): string {
  // Replace keywords
  let highlighted = code
    .replace(
      /(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|=>)/g,
      `<span style="color:${colors.keyword}">$1</span>`
    )
    // Replace comments
    .replace(/(\/\/.*)/g, `<span style="color:${colors.comment}">$1</span>`)
    // Replace strings
    .replace(
      /(['"](?:\\.|[^'\\"])*['"])/g,
      `<span style="color:${colors.string}">$1</span>`
    )
    // Replace brackets and punctuation
    .replace(/([{}[\]()])/g, `<span style="color:${colors.bracket}">$1</span>`)
    // Replace object properties (words followed by a colon)
    .replace(
      /(\w+)(?=\s*:)/g,
      `<span style="color:${colors.property}">$1</span>`
    )
    // Replace numbers
    .replace(/\b(\d+)\b/g, `<span style="color:${colors.number}">$1</span>`)
    // Replace booleans
    .replace(
      /\b(true|false)\b/g,
      `<span style="color:${colors.boolean}">$1</span>`
    )
    // Replace function calls
    .replace(
      /(\w+)(?=\s*\()/g,
      `<span style="color:${colors.function}">$1</span>`
    );

  return highlighted;
}

// Function to animate code typing with highlighting
export function setupCodeTypingAnimation(
  codeBlockRef: React.RefObject<HTMLPreElement>,
  codeText: string,
  duration: number = 6,
  delay: number = 1
) {
  if (!codeBlockRef.current) return;

  const highlightedCode = highlightJS(codeText);
  codeBlockRef.current.innerHTML = "";

  // Extract plain text for progress calculation
  const plainText = highlightedCode.replace(/<[^>]*>/g, "");

  // Track HTML accumulation
  let currentHTML = "";

  // Create animation
  return {
    duration,
    onUpdate: function (this: { progress: () => number }) {
      const progress = this.progress();
      const targetLength = Math.floor(progress * plainText.length);

      // Skip update if we already have enough text showing
      if (currentHTML.replace(/<[^>]*>/g, "").length >= targetLength) {
        return;
      }

      // Build up the HTML string character by character
      let htmlResult = "";
      let plainCounter = 0;
      let htmlCounter = 0;

      while (
        plainCounter < targetLength &&
        htmlCounter < highlightedCode.length
      ) {
        if (highlightedCode[htmlCounter] === "<") {
          // If we encounter a tag, include the entire tag
          const tagEnd = highlightedCode.indexOf(">", htmlCounter) + 1;
          htmlResult += highlightedCode.substring(htmlCounter, tagEnd);
          htmlCounter = tagEnd;
        } else {
          // Add one character and count it towards plain text
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

// Helper to highlight tech arrays
export function highlightTechArray(array: string[]): string {
  if (!array.length) return "[]";

  return `[<span style="color:${colors.string}">'${array.join(
    `'</span>, <span style="color:${colors.string}">'`
  )}'</span>]`;
}

// Highlight a JS object with proper syntax highlighting
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
