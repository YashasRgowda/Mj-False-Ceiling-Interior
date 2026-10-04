export const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4.2 2.5h3l1.5 3.8-1.9 1.4a11 11 0 0 0 4.5 4.5l1.4-1.9 3.8 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14.5 14.5 0 0 1 2.7 4.1 1.5 1.5 0 0 1 4.2 2.5Z" />
  </svg>
);

export const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5v-.4l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.3 5.3 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.2Z" />
  </svg>
);

export const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.68 5.06 16.3l.94-5.5-4-3.9 5.53-.89z" />
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowRight = () => <span aria-hidden="true">&#8594;</span>;

export const VerifiedIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
      fillRule="evenodd"
    />
  </svg>
);
