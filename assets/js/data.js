/*
 * Legacy Land Developers — Property Data
 * -------------------------------------------------
 * Single source of truth for all four projects.
 * Content sourced from the existing legacylanddevelopers.in.
 * Do not invent prices or specs — keep fields empty
 * if the existing website does not expose them.
 */
window.LLD = window.LLD || {};

window.LLD.contact = {
  phoneDisplay: "+91 78944 71666",
  phoneTel: "+917894471666",
  whatsappNumber: "917894471666",
  address: "Rayagada – 765001, Odisha, India",
  region: "Rayagada District, Odisha"
};

window.LLD.waLink = function (message) {
  var base = "https://wa.me/" + window.LLD.contact.whatsappNumber;
  if (!message) return base;
  return base + "?text=" + encodeURIComponent(message);
};

window.LLD.waPropertyMessage = function (propertyName) {
  return "Hello Legacy Land Developers, I am interested in " + propertyName +
    ". Please share more details about the available plots.";
};

window.LLD.properties = [
  {
    slug: "kashyapi-township",
    name: "Kashyapi Township",
    tagline: "Township plots facing MIT's College",
    location: "MIT's College Front, Kolnora Tahasil, Rayagada",
    locationShort: "Kolnora, Rayagada",
    plotSizeShort: "18 × 50 ft / 15 × 60 ft",
    plotSizeDisplay: "18 × 50 ft & 15 × 60 ft",
    plotSizes: ["18 × 50 ft", "15 × 60 ft"],
    plotSizeNote: "Existing listing also references 18' × 15' — please confirm at enquiry.",
    startingFrom: "",
    tags: ["Township", "Residential Plots", "All Facing"],
    tag: "Township",
    highlights: [
      "Township-style layout facing MIT's College, Kolnora Tahasil",
      "Multiple plot sizes: 18 × 50 ft and 15 × 60 ft",
      "Residential plotting project in Rayagada",
      "Clear titles and enquiry support over WhatsApp"
    ],
    description:
      "Kashyapi Township is a residential plotting project by Legacy Land Developers positioned right in front of MIT's College at Kolnora Tahasil, Rayagada. The layout offers a mix of plot sizes designed for families planning to build their own home in a well-connected part of the district.",
    accent: "primary",
    imageSlug: "kashyapi-township",
    image: "assets/images/photos/kashyapi-township.png",
    imageWidth: 1536,
    imageHeight: 1024
  },
  {
    slug: "srin-vedha-ventures",
    name: "Srin Vedha Ventures",
    tagline: "All-facing plots in Malligon Village",
    location: "Malligon Village, Rayagada District",
    locationShort: "Malligon, Rayagada",
    plotSizeShort: "18 × 50 ft • 900 Sq. Ft.",
    plotSizeDisplay: "18 × 50 ft (900 Sq. Ft.)",
    plotSizes: ["18 × 50 ft (900 Sq. Ft.)"],
    plotSizeNote: "",
    startingFrom: "Starting from 18' × 50'",
    tags: ["Residential Plots", "All Facing", "900 Sq. Ft."],
    tag: "All Facing",
    highlights: [
      "Located in Malligon Village, Rayagada District",
      "Standard plot size of 18 × 50 ft (900 Sq. Ft.)",
      "All facing plots available",
      "Residential plotting project by Legacy Land Developers"
    ],
    description:
      "Srin Vedha Ventures is a residential plotting project in Malligon Village, Rayagada District. Every plot in the project is designed as an all-facing plot at 18 × 50 ft (900 Sq. Ft.), giving buyers flexibility for their preferred orientation while planning their home.",
    accent: "accent",
    imageSlug: "srin-vedha-ventures",
    image: "assets/images/photos/srin-vedha-ventures.png",
    imageWidth: 1536,
    imageHeight: 1024
  },
  {
    slug: "omkareswar-venture",
    name: "Omkareswar Venture",
    tagline: "Plots near Kotapeta, Malligon",
    location: "Near Kotapeta, Malligon, Rayagada",
    locationShort: "Malligon, Rayagada",
    plotSizeShort: "15 × 60 ft",
    plotSizeDisplay: "15 × 60 ft",
    plotSizes: ["15 × 60 ft"],
    plotSizeNote: "",
    startingFrom: "Starting from 15' × 60'",
    priceNote: "Starting price available on the current listing — please enquire for the latest details.",
    tags: ["Residential Plots", "All Facing"],
    tag: "Roadside",
    highlights: [
      "Near Kotapeta on the Malligon side, Rayagada",
      "Standard plot size of 15 × 60 ft",
      "All facing plots available",
      "Starting price shared on enquiry"
    ],
    description:
      "Omkareswar Venture is a residential plotting project by Legacy Land Developers, located near Kotapeta at Malligon, Rayagada. The project offers 15 × 60 ft all-facing plots with a starting price shared during enquiry.",
    accent: "primary",
    imageSlug: "omkareswar-venture",
    image: "assets/images/photos/omkareswar-venture.png",
    imageWidth: 1600,
    imageHeight: 879
  },
  {
    slug: "sri-kamal-vedha-township",
    name: "Sri Kamal Vedha Township",
    tagline: "Premium gated township at Sanopodia",
    location: "Sanopodia, Kolnara, Rayagada, Odisha",
    locationShort: "Sanopodia, Kolnara",
    plotSizeShort: "18 × 50 ft onwards",
    plotSizeDisplay: "18 × 50 ft onwards",
    plotSizes: ["18 × 50 ft onwards"],
    plotSizeNote: "",
    startingFrom: "Starting from 18' × 50'",
    tags: ["Gated Township", "Premium", "Residential"],
    tag: "Gated Township",
    highlights: [
      "Premium gated residential plotting project",
      "Strategically located at Sanopodia, Kolnara, Rayagada",
      "Township-style planning and layout",
      "Plot sizes from 18 × 50 ft onwards"
    ],
    description:
      "Sri Kamal Vedha Township is a premium gated residential plotting project by Legacy Land Developers, strategically located at Sanopodia, Kolnara, Rayagada, Odisha. The project is designed for buyers looking for the security and long-term value of a planned township with plot sizes from 18 × 50 ft onwards.",
    accent: "accent",
    imageSlug: "sri-kamal-vedha-township",
    image: "assets/images/photos/sri-kamal-vedha-township.jpeg",
    imageWidth: 960,
    imageHeight: 1280
  }
];
