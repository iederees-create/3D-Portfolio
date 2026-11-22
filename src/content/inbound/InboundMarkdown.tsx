import { Fragment, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { enrichBookingHref, readQuizResult } from './booking';
import {
  applyCampaignTokens,
  isPlaceholderHref,
  resolveCampaignHref,
} from './placeholders';

interface Cta {
  label: string;
  href: string;
}

function linkBareUrls(source: string): string {
  return source.replace(/(?<!\()https?:\/\/[^\s<>)]+/g, (url) => `[${url}](${url})`);
}

function extractCtas(text: string): Cta[] | null {
  const pattern = /\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  const matches = [...text.matchAll(pattern)];
  if (matches.length === 0) return null;
  let rest = text;
  for (const match of matches) rest = rest.replace(match[0], '');
  if (rest.replace(/[·|\s]/g, '') !== '') return null;
  return matches.map((match) => ({
    label: match[1] || match[3],
    href: resolveCampaignHref(match[2] || match[4]),
  }));
}

export function CampaignLink({
  href,
  children,
  className,
  cta = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  cta?: boolean;
}) {
  const location = useLocation();
  const resolved = enrichBookingHref(
    resolveCampaignHref(href),
    location,
    readQuizResult()?.id ?? null,
  );
  const classes = cta ? `inbound-cta ${className ?? ''}`.trim() : className;
  const stop = (event: { stopPropagation: () => void }) => event.stopPropagation();
  const link = isPlaceholderHref(resolved) ? (
    <a href={resolved} className={classes} data-placeholder={resolved} onClick={stop}>
      {children}
    </a>
  ) : resolved.startsWith('/') ? (
    <Link to={resolved} className={classes} onClick={stop}>
      {children}
    </Link>
  ) : (
    <a href={resolved} className={classes} target="_blank" rel="noreferrer" onClick={stop}>
      {children}
    </a>
  );

  if (!isPlaceholderHref(resolved)) return link;

  return (
    <span className="inline-flex flex-wrap items-center gap-2 align-middle">
      {link}
      <span className="inbound-todo">TODO: {resolved}</span>
    </span>
  );
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;
  let key = 0;
  const nextKey = () => `${keyPrefix}-${key++}`;

  while (index < text.length) {
    if (text.startsWith('**[', index)) {
      const labelEnd = text.indexOf(']', index + 3);
      if (labelEnd !== -1 && text.startsWith('](', labelEnd)) {
        const hrefEnd = text.indexOf(')', labelEnd + 2);
        if (hrefEnd !== -1 && text.startsWith(')**', hrefEnd)) {
          const label = text.slice(index + 3, labelEnd);
          const href = text.slice(labelEnd + 2, hrefEnd);
          nodes.push(
            <CampaignLink key={nextKey()} href={href} cta>
              {parseInline(label, nextKey())}
            </CampaignLink>,
          );
          index = hrefEnd + 3;
          continue;
        }
      }
    }

    if (text.startsWith('**', index)) {
      const end = text.indexOf('**', index + 2);
      if (end !== -1) {
        nodes.push(<strong key={nextKey()}>{parseInline(text.slice(index + 2, end), nextKey())}</strong>);
        index = end + 2;
        continue;
      }
    }

    if (text[index] === '[') {
      const labelEnd = text.indexOf(']', index + 1);
      if (labelEnd !== -1 && text[labelEnd + 1] === '(') {
        const hrefEnd = text.indexOf(')', labelEnd + 2);
        if (hrefEnd !== -1) {
          const label = text.slice(index + 1, labelEnd);
          const href = text.slice(labelEnd + 2, hrefEnd);
          nodes.push(
            <CampaignLink key={nextKey()} href={href}>
              {parseInline(label, nextKey())}
            </CampaignLink>,
          );
          index = hrefEnd + 1;
          continue;
        }
      }
    }

    if (text[index] === '*' && text[index + 1] !== '*') {
      const end = text.indexOf('*', index + 1);
      if (end !== -1) {
        nodes.push(<em key={nextKey()}>{parseInline(text.slice(index + 1, end), nextKey())}</em>);
        index = end + 1;
        continue;
      }
    }

    let cursor = index + 1;
    while (cursor < text.length && text[cursor] !== '*' && text[cursor] !== '[') cursor += 1;
    nodes.push(<Fragment key={nextKey()}>{text.slice(index, cursor)}</Fragment>);
    index = cursor;
  }

  return nodes;
}

function renderTable(lines: string[], key: string): ReactNode {
  const rows = lines
    .map((line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell)));
  if (rows.length === 0) return null;
  const [head, ...body] = rows;
  return (
    <div key={key} className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            {head.map((cell, cellIndex) => (
              <th key={cellIndex}>{parseInline(cell, `${key}-h-${cellIndex}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{parseInline(cell, `${key}-${rowIndex}-${cellIndex}`)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface InboundMarkdownProps {
  source: string;
  skipFirstH1?: boolean;
}

export default function InboundMarkdown({ source, skipFirstH1 = false }: InboundMarkdownProps) {
  const prepared = linkBareUrls(applyCampaignTokens(source)).replace(/\r\n/g, '\n');
  const lines = prepared.split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;
  let skippedH1 = !skipFirstH1;
  let blockKey = 0;
  const nextKey = () => `b${blockKey++}`;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed === '') {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('<!--') && trimmed.endsWith('-->')) {
      index += 1;
      continue;
    }

    if (trimmed === '---') {
      blocks.push(<hr key={nextKey()} />);
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      const level = heading[1].length;
      if (level === 1 && !skippedH1) {
        skippedH1 = true;
        index += 1;
        continue;
      }
      const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
      blocks.push(<Tag key={nextKey()}>{parseInline(heading[2], nextKey())}</Tag>);
      index += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quote.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={nextKey()}>{parseInline(quote.join(' '), nextKey())}</blockquote>);
      continue;
    }

    if (trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      blocks.push(renderTable(tableLines, nextKey()));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        let item = lines[index].trim().replace(/^[-*]\s+/, '');
        index += 1;
        while (index < lines.length && /^\s{2,}\S/.test(lines[index])) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push(
        <ul key={nextKey()}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseInline(item, `li-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        let item = lines[index].trim().replace(/^\d+\.\s+/, '');
        index += 1;
        while (index < lines.length && /^\s{2,}\S/.test(lines[index])) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push(
        <ol key={nextKey()}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{parseInline(item, `ol-${itemIndex}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      lines[index].trim() !== '---' &&
      !lines[index].trim().startsWith('#') &&
      !lines[index].trim().startsWith('>') &&
      !lines[index].trim().startsWith('|') &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(lines[index].trim().startsWith('<!--') && lines[index].trim().endsWith('-->'))
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    const joined = paragraph.join(' ');
    const ctas = extractCtas(joined);
    if (ctas) {
      blocks.push(
        <div key={nextKey()} className="inbound-cta-row">
          {ctas.map((cta) => (
            <CampaignLink key={cta.href + cta.label} href={cta.href} cta>
              {cta.label}
            </CampaignLink>
          ))}
        </div>,
      );
      continue;
    }
    if (/^\*[^*][\s\S]*\*$/.test(joined) && !joined.slice(1, -1).includes('*')) {
      blocks.push(
        <p key={nextKey()} className="inbound-note">
          <em>{parseInline(joined.slice(1, -1), nextKey())}</em>
        </p>,
      );
      continue;
    }
    blocks.push(<p key={nextKey()}>{parseInline(joined, nextKey())}</p>);
  }

  return <>{blocks}</>;
}
