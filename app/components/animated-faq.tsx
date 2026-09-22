"use client";

import { useId, useState } from "react";

type Question = { question: string; answers: string[] };

function FaqItem({ question, answers }: Question) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <div className="animated-faq-item" data-open={open}>
    <h4>
      <button type="button" id={`${id}-question`} aria-expanded={open} aria-controls={`${id}-answer`} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className="animated-faq-icon" aria-hidden="true"><span>+</span></span>
      </button>
    </h4>
    <div className="animated-faq-collapse" id={`${id}-answer`} role="region" aria-labelledby={`${id}-question`} aria-hidden={!open} inert={!open}>
      <div className="animated-faq-clip"><div className="animated-faq-answer">{answers.map((text, i) => <p key={i}>{text}</p>)}</div></div>
    </div>
  </div>;
}

export function AnimatedFaq({ items }: { items: Question[] }) {
  return <div className="animated-faq">{items.map(item => <FaqItem key={item.question} {...item} />)}</div>;
}
