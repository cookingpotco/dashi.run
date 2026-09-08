import type { DashiNode } from "dashi/jsx-runtime";

const KEYWORD_COLOR = "#82005b";
const IDENT_COLOR = "#00587e";
const STRING_COLOR = "#118502";

const KEYWORDS = new Set([
  "async",
  "await",
  "class",
  "const",
  "default",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "from",
  "function",
  "if",
  "import",
  "interface",
  "let",
  "new",
  "return",
  "true",
  "type",
  "typeof",
  "var",
  "void",
]);

function span(color: string, text: string): DashiNode {
  return <span style={`color: ${color}`}>{text}</span>;
}

export function highlightCode(source: string): DashiNode[] {
  const nodes: DashiNode[] = [];
  const pattern =
    /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|\b[A-Za-z_$][\w$]*\b|[^\s"'A-Za-z_$]+|\s+/g;
  let match = pattern.exec(source);
  while (match !== null) {
    const token = match[0];
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'"))
    ) {
      nodes.push(span(STRING_COLOR, token));
    } else if (KEYWORDS.has(token)) {
      nodes.push(span(KEYWORD_COLOR, token));
    } else if (/^[A-Za-z_$][\w$]*$/.test(token)) {
      nodes.push(span(IDENT_COLOR, token));
    } else {
      nodes.push(token);
    }
    match = pattern.exec(source);
  }
  return nodes;
}
