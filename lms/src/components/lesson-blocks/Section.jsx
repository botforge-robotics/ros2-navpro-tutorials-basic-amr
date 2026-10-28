import React from 'react';

export function Section({ id, title, children, className = "" }) {
  return (
    <section className={`lesson-section ${className}`}>
      {title && <h2 id={id}>{title}</h2>}
      {children}
    </section>
  );
}

export function SubSection({ id, title, children, className = "" }) {
  return (
    <div className={`lesson-subsection ${className}`}>
      {title && <h3 id={id}>{title}</h3>}
      {children}
    </div>
  );
}

export default Section;
