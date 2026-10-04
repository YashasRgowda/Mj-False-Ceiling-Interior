import type { Service } from "@/lib/types";

/**
 * PLACEHOLDER PHOTOGRAPHY.
 * Every `src` below points at licensed stock while the client's own project
 * photos are pending. Replacing them is a single-file edit: swap the URL and
 * rewrite the alt text. Nothing else in the app references image URLs.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const services: Service[] = [
  {
    slug: "false-ceiling",
    name: "False Ceiling",
    navLabel: "False Ceiling",
    kicker: "Service 01",
    tagline: "The surface nobody touches, and every light lives in.",
    summary:
      "Gypsum, POP and designer ceilings with cove lighting engineered into the plane — the work MJ is known for.",
    hero: {
      src: u("photo-1598928506311-c55ded91a20c", 2400),
      alt: "Living room with a stepped coffered false ceiling and concealed cove lighting",
    },
    intro: {
      heading: "A ceiling is the largest unbroken surface in your home.",
      body: [
        "It is also the only one nobody ever touches — which is exactly why it has to be right the first time. A false ceiling hides your wiring, your ducting and your slab imperfections, but its real job is carrying light.",
        "We design the ceiling and the lighting as one drawing. Cove depth, profile position, driver access and the throw of the light are settled before a single channel goes up, so you never end up with a beautiful ceiling lit badly.",
      ],
    },
    highlights: [
      {
        title: "Lighting designed in, not added on",
        body: "Cove depths and profile runs are set on the drawing so light washes the surface evenly instead of pooling in hotspots.",
      },
      {
        title: "Level framing, checked twice",
        body: "GI channel grid set to a laser line, with access panels planned wherever a driver or a duct needs to be reached later.",
      },
      {
        title: "A finish that stays put",
        body: "Jointing tape and two-coat compound at every seam, so the hairline cracks that show up in year two never start.",
      },
    ],
    offerings: [
      "Gypsum board ceilings",
      "POP punning & cornices",
      "Cove and indirect lighting",
      "Designer tray & stepped ceilings",
      "Grid / Armstrong ceilings",
      "PVC and WPC ceilings",
      "Wooden rafter & slat ceilings",
      "Concealed AC and duct integration",
    ],
    materials: [
      { name: "Gypsum board", note: "Saint-Gobain / India Gypsum, 12.5 mm" },
      { name: "GI framing", note: "Galvanised channel, rust-stable in humidity" },
      { name: "POP", note: "For curves, cornices and punning" },
      { name: "LED profiles", note: "Aluminium channel with diffuser, warm 2700–3000K" },
    ],
    gallery: [
      { src: u("photo-1598928506311-c55ded91a20c"), alt: "Coffered ceiling with recessed perimeter lighting above a living room" },
      { src: u("photo-1540932239986-30128078f3c5"), alt: "Cluster of brass pendant lights suspended from a dark ceiling" },
      { src: u("photo-1616594039964-ae9021a400a0"), alt: "Bedroom with a decorative ceiling and a central chandelier" },
      { src: u("photo-1560185007-cde436f6a4d0"), alt: "Dining area lit by warm pendant lights below a flat ceiling" },
      { src: u("photo-1615529182904-14819c35db37"), alt: "Living room with pendant lighting and a layered ceiling detail" },
      { src: u("photo-1588854337236-6889d631faa8"), alt: "Dark kitchen with pendant lights dropped from a recessed ceiling" },
      { src: u("photo-1621293954908-907159247fc8"), alt: "Curved timber slat ceiling and wall treatment in a warm interior" },
      { src: u("photo-1600489000022-c2086d79f9d4"), alt: "Kitchen with a flush ceiling light and grey cabinetry" },
    ],
    faqs: [
      {
        question: "Gypsum or POP — which should I choose?",
        answer:
          "Gypsum board for flat planes, clean lines and speed: it comes as a factory-flat sheet, so large ceilings finish level with far less mess. POP for curves, cornices and mouldings, where a board simply cannot bend. Most homes we do use gypsum for the main ceiling and POP where a profile is needed.",
      },
      {
        question: "Will it crack later?",
        answer:
          "Cracks come from joints, not from the board. Every seam gets jointing tape and two coats of compound, and the frame is fixed to allow for the slight movement a slab makes. Done that way, a gypsum ceiling holds its finish for years.",
      },
      {
        question: "How much ceiling height do I lose?",
        answer:
          "A plain gypsum ceiling takes about 4 inches. A cove detail takes 6 to 8 inches at the perimeter, while the centre of the room stays at full height. In a standard 10-foot Bengaluru flat that is comfortable — we will tell you honestly if your ceiling is too low for a design you have in mind.",
      },
      {
        question: "How long does a false ceiling take?",
        answer:
          "For a 2 BHK, usually 5 to 8 working days including framing, boarding, jointing and two coats of finish. Lighting and painting follow after. Larger or heavily profiled ceilings run longer, and we give you the day count before we start.",
      },
    ],
    priceNote:
      "False ceiling is quoted per square foot of ceiling area, and the rate changes with the profile — a flat plane, a single cove and a stepped designer ceiling are three different numbers. We measure on site and give you a written rate before any work begins.",
    order: 1,
    published: true,
  },

  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    navLabel: "Modular Kitchen",
    kicker: "Service 02",
    tagline: "Built for the way an Indian kitchen actually gets used.",
    summary:
      "Marine-ply modular kitchens with quality hardware, planned around real cooking — heat, steam, heavy vessels and daily scrubbing.",
    hero: {
      src: u("photo-1588854337236-6889d631faa8", 2400),
      alt: "Modern kitchen with dark cabinetry, a marble backsplash and warm pendant lighting",
    },
    intro: {
      heading: "Most kitchens fail at the hinge, not the design.",
      body: [
        "A kitchen looks identical on day one whoever builds it. The difference shows in year three — in whether the shutters still close flush, whether the carcass under the sink has swollen, and whether the drawer holding your heavy vessels still runs smoothly.",
        "So we spend the money where it survives: BWP marine ply for the carcass, branded soft-close hardware, and an edge band that does not lift. The finish you choose sits on top of that.",
      ],
    },
    highlights: [
      {
        title: "Marine ply under the sink, always",
        body: "Bengaluru humidity plus a slow leak destroys ordinary board. BWP-grade ply in the wet zone is not an upgrade we upsell — it is the default.",
      },
      {
        title: "Hardware you can name",
        body: "Hettich or Hafele channels and hinges, specified on the quote by brand and model. If a quote will not name its hardware, that is the corner being cut.",
      },
      {
        title: "Planned around your vessels",
        body: "Drawer depths set against your actual cookers and kadais, not a catalogue. The tall unit gets measured to what you really store.",
      },
    ],
    offerings: [
      "L-shaped and U-shaped layouts",
      "Parallel and straight-line kitchens",
      "Island and breakfast-counter kitchens",
      "Tall units and pantry pull-outs",
      "Corner solutions and magic corners",
      "Quartz and granite countertops",
      "Backsplash tiling and cladding",
      "Chimney, hob and sink integration",
    ],
    materials: [
      { name: "BWP marine ply", note: "710-grade carcass for all wet zones" },
      { name: "HDHMR", note: "For shutters where a flat, dense face is needed" },
      { name: "Acrylic / laminate / PU", note: "Finish options, high gloss to matte" },
      { name: "Quartz & granite", note: "Counters, with a proper drip groove at the edge" },
    ],
    gallery: [
      { src: u("photo-1588854337236-6889d631faa8"), alt: "Dark modular kitchen with marble backsplash and pendant lights" },
      { src: u("photo-1507089947368-19c1da9775ae"), alt: "White kitchen with marble counters and pendant lighting over an island" },
      { src: u("photo-1556911220-bff31c812dba"), alt: "Kitchen counter in marble with fruit and warm cabinetry" },
      { src: u("photo-1565538810643-b5bdb714032a"), alt: "Kitchen sink set into a marble counter with plants alongside" },
      { src: u("photo-1600489000022-c2086d79f9d4"), alt: "Grey modular kitchen with a flush ceiling light" },
      { src: u("photo-1484154218962-a197022b5858"), alt: "Compact kitchen with dark cabinetry and stainless appliances" },
    ],
    faqs: [
      {
        question: "Which core material is best — ply, HDHMR or particle board?",
        answer:
          "BWP marine ply for anything near water, which means the sink run and the counter below the hob. HDHMR is excellent for shutters because it is dense and flat. Particle board is the cheapest and the first to swell; we do not use it in a kitchen.",
      },
      {
        question: "Acrylic, laminate or PU finish?",
        answer:
          "Laminate is the value choice and takes daily abuse well. Acrylic gives a deep mirror gloss and is easy to wipe but shows fingerprints. PU is sprayed, so it gives the most seamless colour and the softest matte — it is also the priciest and the hardest to repair locally.",
      },
      {
        question: "How long will my kitchen take?",
        answer:
          "Two to three weeks from final drawing sign-off, most of which is fabrication. Installation itself is usually three to four days on site. Counters are templated after the carcass is in, so plan for a short gap there.",
      },
    ],
    priceNote:
      "Kitchens are quoted per running foot, split between base units, wall units and tall units — they are not the same rate. Counters, chimney, hob and sink are listed separately so you can see exactly what is yours to choose.",
    order: 2,
    published: true,
  },

  {
    slug: "bedroom-interiors",
    name: "Bedroom Interiors",
    navLabel: "Bedroom",
    kicker: "Service 03",
    tagline: "The room you see first and last, every single day.",
    summary:
      "Wardrobes, beds with storage, headboard panelling and soft ceiling light — composed as one room, not five separate purchases.",
    hero: {
      src: u("photo-1609766857041-ed402ea8069a", 2400),
      alt: "Luxurious bedroom with an upholstered bed, stone feature wall and soft ceiling lighting",
    },
    intro: {
      heading: "A bedroom is a storage problem wearing a calm face.",
      body: [
        "Almost every bedroom brief we get is really about storage — where the luggage goes, where the winter quilts live, whether the loft is reachable. Solve that badly and no amount of finish saves the room.",
        "We plan storage volume first, then design the room around it: wardrobe against the right wall, bed with a hydraulic box where it earns its place, and a lighting layer soft enough to actually sleep in.",
      ],
    },
    highlights: [
      {
        title: "Storage counted, not guessed",
        body: "We count your actual suitcases, quilts and hanging length before drawing a single shutter line.",
      },
      {
        title: "Light you can sleep under",
        body: "No glare from a ceiling light above the pillow. Cove wash plus bedside control, on separate switches.",
      },
      {
        title: "A headboard wall that finishes the room",
        body: "Fluted, upholstered or veneer panelling behind the bed — the one detail that lifts a bedroom from furnished to designed.",
      },
    ],
    offerings: [
      "Sliding and openable wardrobes",
      "Beds with hydraulic or box storage",
      "Headboard and wall panelling",
      "Loft and overhead storage",
      "Dressers and mirror units",
      "Study and work nooks",
      "Bedside and reading lighting",
      "Cove ceilings for bedrooms",
    ],
    materials: [
      { name: "BWP / BWR ply", note: "Carcass, with a laminate or veneer face" },
      { name: "Fabric & leatherette", note: "Upholstered headboards and soft panels" },
      { name: "Veneer", note: "Natural grain, matte PU sealed" },
      { name: "Lacquered glass & mirror", note: "Wardrobe shutters and dresser fronts" },
    ],
    gallery: [
      { src: u("photo-1609766857041-ed402ea8069a"), alt: "Bedroom with upholstered bed and a stone-clad feature wall" },
      { src: u("photo-1616594039964-ae9021a400a0"), alt: "Bedroom with a chandelier and decorative ceiling detail" },
      { src: u("photo-1560185893-a55cbc8c57e8"), alt: "Bedroom with dark painted walls, a large rug and layered bedding" },
      { src: u("photo-1571508601891-ca5e7a713859"), alt: "Bright bedroom with plants and a striped throw across the bed" },
      { src: u("photo-1595526114035-0d45ed16cfbf"), alt: "Minimal white bedroom with a window and simple bedding" },
      { src: u("photo-1616627561950-9f746e330187"), alt: "Close detail of layered pillows and warm bed linen" },
      { src: u("photo-1522771739844-6a9f6d5f14af"), alt: "Calm bedroom with a bedside lamp and neutral palette" },
      { src: u("photo-1513694203232-719a280e022f"), alt: "Bedroom corner with a dresser and dried botanicals" },
    ],
    faqs: [
      {
        question: "Sliding or openable wardrobe?",
        answer:
          "Sliding saves the swing space in front, which matters in a tight Bengaluru bedroom — but you can only ever see half the wardrobe at once, and the bottom channel needs cleaning. Openable gives you the full view and costs less. If the walking gap in front of the wardrobe is under three feet, go sliding.",
      },
      {
        question: "Is a hydraulic storage bed worth it?",
        answer:
          "If you need the volume, yes — it swallows an entire season of quilts. If you do not, it adds cost and weight for space you will not open twice a year. We will tell you which one you are after we count your storage.",
      },
      {
        question: "Can you work around furniture I already own?",
        answer:
          "Yes, and we would rather you kept a piece you love than replaced it for consistency. Bring us the dimensions early so the new work is drawn around it rather than fighting it.",
      },
    ],
    priceNote:
      "Bedrooms are usually quoted as a package — wardrobe by running foot, bed and side units as pieces, panelling and ceiling by area. You will see each line separately so anything can be dropped without redoing the quote.",
    order: 3,
    published: true,
  },

  {
    slug: "living-hall",
    name: "Living Hall",
    navLabel: "Living Hall",
    kicker: "Service 04",
    tagline: "The room your guests judge, and your family actually lives in.",
    summary:
      "TV units, panelling, ceilings, partitions and seating planned together, so the hall reads as one composed space.",
    hero: {
      src: u("photo-1615529182904-14819c35db37", 2400),
      alt: "Living hall with warm pendant lighting, layered seating and a soft ceiling wash",
    },
    intro: {
      heading: "The hall is the one room doing four jobs at once.",
      body: [
        "It receives guests, seats the family in front of the television, absorbs the children in the evening and often hides the shoe rack and the dining table too. A hall that was designed for only the first of those jobs stops working within a month.",
        "We plan circulation first — how people actually cross the room — then place the TV wall, the seating and the storage so none of them block the path. The finishes come last, which is why they end up looking effortless.",
      ],
    },
    highlights: [
      {
        title: "Circulation before decoration",
        body: "The walking line from door to kitchen to balcony is drawn first. Nothing gets placed in it.",
      },
      {
        title: "One wall that carries the room",
        body: "A single considered feature wall — panelled, clad or backlit — beats four walls of scattered decor.",
      },
      {
        title: "Storage that disappears",
        body: "Shoe racks, crockery units and cable clutter are absorbed into the joinery instead of standing in a corner.",
      },
    ],
    offerings: [
      "TV units and media walls",
      "Feature wall panelling and cladding",
      "Designer false ceilings with cove light",
      "Partitions and room dividers",
      "Crockery and display units",
      "Shoe racks and foyer storage",
      "Seating layout and soft furnishing",
      "Accent and task lighting",
    ],
    materials: [
      { name: "Veneer & laminate", note: "Panelled walls and media joinery" },
      { name: "Fluted MDF / WPC", note: "Vertical louvre detailing" },
      { name: "Stone cladding", note: "Feature walls, honed or leathered" },
      { name: "Glass & metal", note: "Partitions, display frames, trims" },
    ],
    gallery: [
      { src: u("photo-1618221195710-dd6b41faaea6"), alt: "Living hall with neutral sofas and a pair of round coffee tables" },
      { src: u("photo-1600585154340-be6161a56a0c"), alt: "Bright living space with a grey sofa and full-height windows" },
      { src: u("photo-1505691938895-1758d7feb511"), alt: "Living room with blue cushions, artwork and wooden side stools" },
      { src: u("photo-1493809842364-78817add7ffb"), alt: "Living room with a deep blue velvet sofa and a pale rug" },
      { src: u("photo-1599619351208-3e6c839d6828"), alt: "Living room with a navy sofa and framed pictures above" },
      { src: u("photo-1522708323590-d24dbb6b0267"), alt: "Open living and dining area with a red accent chair" },
      { src: u("photo-1617103996702-96ff29b1c467"), alt: "Living room with woven wall decor and warm textiles" },
    ],
    faqs: [
      {
        question: "Should the TV be wall-mounted or on a console?",
        answer:
          "Wall-mounted with a floating console under it is the cleanest and the easiest to dust beneath. The one thing to settle early is the conduit for power and HDMI, because chasing it into the wall after the panelling is up means opening the panelling again.",
      },
      {
        question: "Do I need a false ceiling in the hall?",
        answer:
          "Not always. If your slab is level and you are happy with a central fixture, a good paint job is enough. A false ceiling earns its cost when you want layered light, want to conceal ducting or beams, or want the room to feel composed rather than lit by one bulb.",
      },
      {
        question: "Can you design around my existing sofa?",
        answer:
          "Yes. Send dimensions and a photograph at the first meeting and the joinery, wall colour and lighting will be drawn to suit it.",
      },
    ],
    priceNote:
      "Halls vary the most of any room, because a hall can mean a TV unit alone or a full ceiling, panelling and partition package. We break the quote into independent pieces so you can stage the work across months if you prefer.",
    order: 4,
    published: true,
  },

  {
    slug: "tv-units-panelling",
    name: "TV Units & Wall Panelling",
    navLabel: "TV & Panelling",
    kicker: "Service 05",
    tagline: "One wall, done properly, changes the whole room.",
    summary:
      "Fluted, veneer, backlit and stone-clad feature walls with media joinery detailed to hide every cable.",
    hero: {
      src: u("photo-1600121848594-d8644e57abab", 2400),
      alt: "Dark media wall with integrated television, joinery and concealed lighting",
    },
    intro: {
      heading: "Panelling is where cheap work shows fastest.",
      body: [
        "A fluted wall is only as good as its shadow line. If the grooves drift out of parallel or the panel meets the ceiling in a ragged joint, the eye catches it instantly — and it cannot be fixed with paint.",
        "We set out panelling from a centre line, land the last groove deliberately rather than wherever it falls, and detail the top and bottom junctions before fabrication starts.",
      ],
    },
    highlights: [
      {
        title: "Set out from the centre",
        body: "Grooves are spaced so the wall ends on a full panel, not an awkward sliver at the corner.",
      },
      {
        title: "Every cable buried",
        body: "Power, HDMI and set-top conduits are routed and terminated behind the panel, with a serviceable access point.",
      },
      {
        title: "Backlighting that grazes",
        body: "Where a wall is backlit, the LED sits far enough off the surface to wash evenly instead of showing dots.",
      },
    ],
    offerings: [
      "Fluted and louvre panelling",
      "Veneer and laminate feature walls",
      "Backlit and grazed light panels",
      "Stone and tile cladding",
      "Floating media consoles",
      "Open and closed display shelving",
      "Cable management and conduiting",
      "Full-height wardrobe-front panelling",
    ],
    materials: [
      { name: "Fluted MDF", note: "Primed and PU finished in any shade" },
      { name: "WPC louvres", note: "Moisture-stable, good for balcony-adjacent walls" },
      { name: "Natural veneer", note: "Book-matched, matte sealed" },
      { name: "Stone & sintered tile", note: "Large-format cladding with mitred edges" },
    ],
    gallery: [
      { src: u("photo-1600121848594-d8644e57abab"), alt: "Dark media wall with built-in joinery around a television" },
      { src: u("photo-1621293954908-907159247fc8"), alt: "Curved timber slat wall treatment in a warm interior" },
      { src: u("photo-1594026112284-02bb6f3352fe"), alt: "Low floating media console against a pale panelled wall" },
      { src: u("photo-1598928506311-c55ded91a20c"), alt: "Living room with built-in shelving flanking a fireplace" },
      { src: u("photo-1502005229762-cf1b2da7c5d6"), alt: "Stairwell with vertical detailing and a pendant light" },
      { src: u("photo-1615875605825-5eb9bb5d52ac"), alt: "Open shelving styled with books, plants and objects" },
    ],
    faqs: [
      {
        question: "Fluted MDF or solid wood louvres?",
        answer:
          "Fluted MDF is dimensionally stable, takes a PU finish beautifully and costs far less — it is what most premium-looking walls actually are. Solid wood is warmer and can be refinished, but it moves with humidity and needs a bigger budget. For interior walls, MDF is usually the smarter buy.",
      },
      {
        question: "Can panelling go over an existing painted wall?",
        answer:
          "Yes, provided the wall is dry and reasonably plumb. We batten out from the wall, which also gives us the cavity to run cables. If there is any damp, that gets solved first — panelling over damp traps it and makes it worse.",
      },
    ],
    priceNote:
      "Panelling is quoted per square foot of wall face, and the material drives the rate far more than the labour does. We will show you two or three material options at different price points for the same design.",
    order: 5,
    published: true,
  },

  {
    slug: "wardrobes-storage",
    name: "Wardrobes & Storage",
    navLabel: "Wardrobes",
    kicker: "Service 06",
    tagline: "Space you did not know your home had.",
    summary:
      "Sliding, openable and walk-in wardrobes, lofts, utility and shoe storage — planned around what you actually own.",
    hero: {
      src: u("photo-1594026112284-02bb6f3352fe", 2400),
      alt: "Full-height timber storage wall with open shelving and closed cabinetry",
    },
    intro: {
      heading: "Storage is the first thing briefed and the last thing planned.",
      body: [
        "Every home has more to store than its owner admits at the first meeting. The suitcases, the festival cookware, the children's outgrown clothes, the box of documents nobody will throw away.",
        "We start with an honest inventory and design to it. That is the difference between a wardrobe that looks full on day one and one that still closes in year three.",
      ],
    },
    highlights: [
      {
        title: "Hanging length, measured",
        body: "We count sarees, shirts and long coats separately, because they need three different rod heights.",
      },
      {
        title: "Lofts you can actually reach",
        body: "Loft shutters sized and hinged so they open without a second person holding them.",
      },
      {
        title: "Internals that are not an afterthought",
        body: "Drawers, pull-outs and tie racks specified at drawing stage — retrofitting them later never fits properly.",
      },
    ],
    offerings: [
      "Sliding-door wardrobes",
      "Openable shutter wardrobes",
      "Walk-in wardrobe layouts",
      "Loft and overhead storage",
      "Shoe cabinets and foyer units",
      "Crockery and display units",
      "Utility and balcony storage",
      "Under-stair and odd-corner joinery",
    ],
    materials: [
      { name: "BWR / BWP ply", note: "Carcass grade chosen by room and moisture" },
      { name: "Laminate & acrylic", note: "Shutter finishes, matte or gloss" },
      { name: "Lacquered glass", note: "Sliding fronts, with a soft-close track" },
      { name: "Hettich / Hafele", note: "Channels, hinges and internal fittings" },
    ],
    gallery: [
      { src: u("photo-1536376072261-38c75010e6c9"), alt: "Tall storage wall with mixed open and closed compartments" },
      { src: u("photo-1615875605825-5eb9bb5d52ac"), alt: "Open shelving unit styled with books and plants" },
      { src: u("photo-1595526114035-0d45ed16cfbf"), alt: "Bedroom with built-in storage and a minimal palette" },
      { src: u("photo-1513694203232-719a280e022f"), alt: "Bedroom dresser with storage drawers and decor" },
    ],
    faqs: [
      {
        question: "How deep should a wardrobe be?",
        answer:
          "Twenty-two to twenty-four inches for hanging clothes on a standard rod. Anything shallower and shoulders press against the shutter; anything deeper and the back becomes dead space you cannot reach.",
      },
      {
        question: "Are loft shutters worth doing?",
        answer:
          "Yes — an open loft collects dust and looks untidy from the doorway. Shuttered lofts keep the wall reading as one clean plane and protect what you store up there.",
      },
    ],
    priceNote:
      "Wardrobes are quoted per running foot of width at a stated height, with internals listed separately. Loft storage is usually a separate line because the height varies wall to wall.",
    order: 6,
    published: true,
  },

  {
    slug: "pooja-room",
    name: "Pooja Room & Partitions",
    navLabel: "Pooja Room",
    kicker: "Service 07",
    tagline: "A small room that carries more weight than its size.",
    summary:
      "Pooja units, CNC jali partitions, marble cladding and soft concealed light — detailed with care for how the space is used daily.",
    hero: {
      src: u("photo-1618219908412-a29a1bb7b86e", 2400),
      alt: "Quiet niche with a console, round mirror and warm pendant light",
    },
    intro: {
      heading: "Designed for daily use, not only for display.",
      body: [
        "A pooja space has requirements no other room has — a direction to face, somewhere for the lamp that will not scorch the panel above it, ventilation for camphor and incense, and drawers for things that must stay clean.",
        "We ask about your practice before we draw. The design follows from that, whether it ends up a full room, a niche in the hall or a well-made unit behind a jali screen.",
      ],
    },
    highlights: [
      {
        title: "Heat and smoke accounted for",
        body: "A stone or metal-lined lamp shelf and a ventilation path, so the unit above does not darken over the years.",
      },
      {
        title: "Jali that is cut, not bought",
        body: "CNC screens drawn to your opening size so the pattern resolves neatly at every edge.",
      },
      {
        title: "Light that stays soft",
        body: "Warm concealed light behind the frame rather than a spot glaring off the idols.",
      },
    ],
    offerings: [
      "Full pooja rooms",
      "Wall-mounted and niche pooja units",
      "CNC jali screens and partitions",
      "Marble and stone cladding",
      "Glass and metal partition frames",
      "Concealed warm lighting",
      "Storage drawers and lamp shelves",
      "Doors with jali or etched glass",
    ],
    materials: [
      { name: "Marble & granite", note: "Cladding and lamp shelves" },
      { name: "CNC-cut MDF / WPC", note: "Jali screens and door inserts" },
      { name: "Teak & veneer", note: "Frames and traditional detailing" },
      { name: "Brass trims", note: "Inlays, edges and fittings" },
    ],
    gallery: [
      { src: u("photo-1583845112203-29329902332e"), alt: "Slatted screen partition with plants and soft daylight" },
      { src: u("photo-1621293954908-907159247fc8"), alt: "Curved timber slat screen wall in a warm interior" },
      { src: u("photo-1617103996702-96ff29b1c467"), alt: "Corner with woven wall decor and layered textiles" },
    ],
    faqs: [
      {
        question: "Can a pooja unit go in the hall if there is no separate room?",
        answer:
          "Very often, yes — a niche with a jali screen or a shuttered unit works well and can be closed when you have guests. The main things to settle are the facing direction and keeping it clear of the main walking line.",
      },
      {
        question: "Is marble necessary?",
        answer:
          "No. Marble is traditional and wipes clean easily, but a well-detailed wooden unit with a stone lamp shelf achieves the same thing for less. The shelf under the lamp is the part we would not compromise on.",
      },
    ],
    priceNote:
      "Pooja work is quoted as a unit rather than by area, because the detailing varies so much. Jali screens are priced by the square foot of screen.",
    order: 7,
    published: true,
  },

  {
    slug: "bathroom-vanity",
    name: "Bathroom & Vanity",
    navLabel: "Bathroom",
    kicker: "Service 08",
    tagline: "The smallest room, and the least forgiving.",
    summary:
      "Vanity counters, mirror units, storage and lighting built in materials that survive a wet room for years.",
    hero: {
      src: u("photo-1600566752355-35792bedcfea", 2400),
      alt: "Calm bathroom with a freestanding tub, stone surfaces and soft lighting",
    },
    intro: {
      heading: "Everything in a bathroom is being tested constantly.",
      body: [
        "Steam, splash, soap and scrubbing attack joinery in a way no other room does. A vanity built the way a bedroom unit is built will swell at the base within two monsoons.",
        "We build bathroom joinery in materials chosen for water first and looks second — which, done well, still looks better than the alternative.",
      ],
    },
    highlights: [
      {
        title: "Water-first material choice",
        body: "WPC or marine ply carcass with sealed edges, so the base of the vanity never drinks.",
      },
      {
        title: "Mirrors that stay clear",
        body: "Backlit or demister mirror units positioned so the light falls on your face, not the top of your head.",
      },
      {
        title: "Storage off the floor",
        body: "Wall-hung vanities keep the floor clear, dry faster and make the room read larger.",
      },
    ],
    offerings: [
      "Wall-hung and floor vanity units",
      "Stone and sintered counters",
      "Backlit and storage mirror units",
      "Shower partitions and glass",
      "Niche shelving in wet areas",
      "Tile layout and cladding design",
      "Task and ambient lighting",
      "Concealed plumbing coordination",
    ],
    materials: [
      { name: "WPC board", note: "Fully waterproof carcass for wet zones" },
      { name: "BWP marine ply", note: "Where a ply substrate is preferred" },
      { name: "Quartz & sintered stone", note: "Counters, non-porous and stain-stable" },
      { name: "Toughened glass", note: "Shower partitions and mirror backing" },
    ],
    gallery: [
      { src: u("photo-1600566752355-35792bedcfea"), alt: "Bathroom with a freestanding tub and warm stone surfaces" },
      { src: u("photo-1604709177225-055f99402ea3"), alt: "Bathroom vanity with a black vessel basin against marble" },
      { src: u("photo-1560448075-bb485b067938"), alt: "Classic bathroom with a pedestal basin and a tub" },
      { src: u("photo-1565538810643-b5bdb714032a"), alt: "Basin set into a stone counter with plants beside it" },
    ],
    faqs: [
      {
        question: "Will a wooden vanity survive an Indian bathroom?",
        answer:
          "Only if it is not really wood where it matters. A WPC or marine-ply carcass with properly sealed edges and a wall-hung mounting will last. An MDF or particle-board vanity sitting on a wet floor will not see three years.",
      },
      {
        question: "Do I need a demister mirror?",
        answer:
          "It is a genuine convenience rather than a necessity. If your bathroom has poor ventilation and you shower hot, it earns its cost. Otherwise a good backlit mirror is the better place to spend.",
      },
    ],
    priceNote:
      "Bathroom joinery is quoted per piece — vanity, mirror unit and any niche shelving listed separately. Counters are measured after the carcass is installed.",
    order: 8,
    published: true,
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug && s.published);

export const publishedServices = services
  .filter((s) => s.published)
  .sort((a, b) => a.order - b.order);
