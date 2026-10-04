import { getContact } from "@/lib/data";
import { PhoneIcon, WhatsappIcon } from "./Icons";

/**
 * Mobile-only sticky bar. For this trade almost every enquiry arrives as a
 * phone call, so the number is never more than one thumb-reach away.
 */
export async function FloatingCta() {
  const contact = await getContact();

  return (
    <div className="float-cta">
      <a className="call" href={contact.phoneHref}>
        <PhoneIcon />
        Call now
      </a>
      <a className="wa" href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
        <WhatsappIcon />
        WhatsApp
      </a>
    </div>
  );
}
