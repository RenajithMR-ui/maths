import React from 'react';
import katex from 'katex';

/**
 * Renders strings containing inline LaTeX ($...$), block LaTeX ($$...$$),
 * and **bold** inline spans cleanly.
 */
export function MathText({ text, className = '' }) {
  if (text == null) return null;
  const str = String(text);

  // Split on $$...$$ first, then $...$
  const blockParts = str.split(/(\$\$[\s\S]+?\$\$)/g);

  return (
    <span className={className}>
      {blockParts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const tex = part.slice(2, -2).trim();
          return <KatexSpan key={i} tex={tex} displayMode={true} />;
        }

        const inlineParts = part.split(/(\$[^$\n]+?\$)/g);
        return (
          <React.Fragment key={i}>
            {inlineParts.map((sub, j) => {
              if (sub.startsWith('$') && sub.endsWith('$') && sub.length > 2) {
                const tex = sub.slice(1, -1).trim();
                return <KatexSpan key={`${i}-${j}`} tex={tex} displayMode={false} />;
              }
              return <FormattedText key={`${i}-${j}`} text={sub} />;
            })}
          </React.Fragment>
        );
      })}
    </span>
  );
}

function FormattedText({ text }) {
  if (!text) return null;
  const boldParts = text.split(/(\*\*[^*\n]+?\*\*)/g);
  return (
    <>
      {boldParts.map((seg, idx) => {
        if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
          return <strong key={idx}>{seg.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={idx}>{seg}</React.Fragment>;
      })}
    </>
  );
}

function KatexSpan({ tex, displayMode }) {
  let html = '';
  try {
    html = katex.renderToString(tex, {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch {
    html = tex;
  }

  if (displayMode) {
    return (
      <div
        className="math-display-box"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default MathText;
