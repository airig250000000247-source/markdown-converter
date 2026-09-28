function convertMarkdown() {
  const input = document.getElementById("markdown-input").value;
  const lines = input.split("\n");

  const convertedLines = lines.map((line) => {
    let converted = line;

    if (/^\s*###\s+(.*)$/.test(converted)) {
      converted = converted.replace(/^\s*###\s+(.*)$/, "<h3>$1</h3>");
    } else if (/^\s*##\s+(.*)$/.test(converted)) {
      converted = converted.replace(/^\s*##\s+(.*)$/, "<h2>$1</h2>");
    } else if (/^\s*#\s+(.*)$/.test(converted)) {
      converted = converted.replace(/^\s*#\s+(.*)$/, "<h1>$1</h1>");
    } else if (/^\s*>\s+(.*)$/.test(converted)) {
      converted = converted.replace(/^\s*>\s+(.*)$/, "<blockquote>$1</blockquote>");
    }

    converted = converted.replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      '<img alt="$1" src="$2">'
    );

    converted = converted.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );

    converted = converted.replace(
      /\*\*(.*?)\*\*/g,
      (match, content) => {
        content = content.replace(/\*([^*]+)\*/g, "<em>$1</em>");
        return `<strong>${content}</strong>`;
      }
    );

    converted = converted.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    converted = converted.replace(/__(.*?)__/g, "<strong>$1</strong>");
    converted = converted.replace(/_([^_]+)_/g, "<em>$1</em>");

    return converted;
  });

  return convertedLines.join("");
}

const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

markdownInput.addEventListener("input", () => {
  const result = convertMarkdown();
  htmlOutput.textContent = result;
  preview.innerHTML = result;
});