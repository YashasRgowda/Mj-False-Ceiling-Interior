import type { ProcessStep } from "@/lib/types";

export const processSteps: ProcessStep[] = [
  {
    numeral: "01",
    title: "Site visit & measure",
    body: "We come to your home, measure every wall ourselves and look at the things that decide a design — slab level, beam positions, existing wiring, where the daylight actually falls.",
    meta: "Free",
  },
  {
    numeral: "02",
    title: "Design & 3D view",
    body: "You see the room before it is built. Layouts, materials and a 3D render, revised with you until the drawing is one you would sign your name to.",
    meta: "Drawing",
  },
  {
    numeral: "03",
    title: "Written quotation",
    body: "Line by line, with brands and grades named. No lump sums, no allowances hiding a second bill later. What you approve is what you pay.",
    meta: "Transparent",
  },
  {
    numeral: "04",
    title: "Execution on site",
    body: "Our own team, not a rotating set of subcontractors. Daily photographs sent to you, the site swept at the end of each day, and a schedule you can hold us to.",
    meta: "In-house",
  },
  {
    numeral: "05",
    title: "Handover & service",
    body: "A final walk-through where you list anything that is not right, and we fix it before the last payment. Service support continues well after the work is done.",
    meta: "Warranty",
  },
];
