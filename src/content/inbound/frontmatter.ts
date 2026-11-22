export interface Frontmatter {
  meta: Record<string, string>;
  body: string;
}

/** Split a leading YAML block. Values stay as written, including quotes stripped once. */
export function parseFrontmatter(raw: string): Frontmatter {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---')) return { meta: {}, body: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: text };
  const meta: Record<string, string> = {};
  for (const line of text.slice(3, end).split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[match[1]] = value;
  }
  return { meta, body: text.slice(end + 4).replace(/^\n/, '') };
}

export function splitMarkedSections(markdown: string): { id: string; body: string }[] {
  const parts = markdown.split(/<!--\s*([A-Z0-9 ,]+)\s*-->/);
  const sections: { id: string; body: string }[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ id: parts[i].trim(), body: parts[i + 1] ?? '' });
  }
  return sections;
}

export function splitH3Sections(markdown: string): { intro: string; cards: { title: string; body: string }[] } {
  const start = markdown.search(/^### /m);
  if (start === -1) return { intro: markdown, cards: [] };
  const intro = markdown.slice(0, start);
  const rest = markdown.slice(start).replace(/^### /, '');
  const cards = rest.split(/\n### /).map((chunk) => {
    const breakAt = chunk.indexOf('\n');
    if (breakAt === -1) return { title: chunk.trim(), body: '' };
    return { title: chunk.slice(0, breakAt).trim(), body: chunk.slice(breakAt + 1) };
  });
  return { intro, cards };
}

export function formatLongDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
