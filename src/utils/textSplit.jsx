import React from 'react';

/**
 * React component for splitting text into animatable spans.
 * Supports 'chars', 'words', and 'lines' split types.
 */
export function SplitText({ children, type = 'words', className = '' }) {
  if (!children || typeof children !== 'string') return null;

  if (type === 'chars') {
    return (
      <span className={`split-text ${className}`} aria-label={children}>
        {children.split('').map((char, i) => (
          <span key={i} className="split-char" aria-hidden="true">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  }

  if (type === 'lines') {
    const lines = children.split('\n');
    return (
      <span className={`split-text ${className}`}>
        {lines.map((line, i) => (
          <span key={i} className="split-line">
            <span className="split-line-inner">{line}</span>
          </span>
        ))}
      </span>
    );
  }

  // Default: words
  const words = children.split(' ');
  return (
    <span className={`split-text ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="split-word">
            <span className="split-word-inner">{word}</span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </span>
  );
}

/**
 * Imperative: split element text into character spans for GSAP.
 * Returns array of char span elements.
 */
export function splitTextToChars(element) {
  if (!element) return [];
  const text = element.textContent;
  element.setAttribute('aria-label', text);
  element.innerHTML = '';

  return text.split('').map((char) => {
    const span = document.createElement('span');
    span.classList.add('split-char');
    span.style.display = 'inline-block';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = char === ' ' ? '\u00A0' : char;
    element.appendChild(span);
    return span;
  });
}

/**
 * Imperative: split element text into line spans for GSAP mask reveal.
 * Returns array of inner line span elements.
 */
export function splitTextToLines(element) {
  if (!element) return [];
  const text = element.textContent;
  element.setAttribute('aria-label', text);
  element.innerHTML = '';

  const lines = text.split('\n');
  return lines.map((line) => {
    const outer = document.createElement('span');
    outer.classList.add('split-line');
    const inner = document.createElement('span');
    inner.classList.add('split-line-inner');
    inner.setAttribute('aria-hidden', 'true');
    inner.textContent = line;
    outer.appendChild(inner);
    element.appendChild(outer);
    return inner;
  });
}
