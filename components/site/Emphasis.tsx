import { splitEmphasis } from "@/lib/data";

/**
 * Renders text where *asterisked* words become gold italic, so the client can
 * emphasise a word from the admin panel without writing HTML.
 */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {splitEmphasis(text).map((part) =>
        part.emphasis ? <em key={part.key}>{part.text}</em> : <span key={part.key}>{part.text}</span>
      )}
    </>
  );
}
