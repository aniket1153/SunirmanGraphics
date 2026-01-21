// Dynamically import all images
const modules = import.meta.glob("../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const grouped = {};

// Group images by folder name
Object.entries(modules).forEach(([path, mod]) => {
  const parts = path.split("/");
  const folderName = parts[parts.length - 2]; // e.g. BussinessCard

  if (!grouped[folderName]) grouped[folderName] = [];
  grouped[folderName].push(mod.default);
});

// 🔑 IMPORTANT: map UI names → folder names
const NAME_MAP = {
  "Business Cards": "BussinessCard",
  Certificates: "certificate",
  Letterheads: "letterhead",
  Brochures: "broucher",
  "ID Cards": "IDCard",
  Invitations: "InvitationsCard",
  "Thank You Cards": "ThankYouCards",
  Calendars: "Calendars",
  Diaries: "DIARIES",
  "Photo Frames": "PhotoFrames",
  "Photo Prints": "PhotoPrints",
  "Photo Mugs": "PhotoMugs",
  "Greeting Cards": "GreetingCardsImg",
  "Flyers and Leaflets": "FlyersLeaflets",
  Posters: "Posters",
  Booklets: "Booklets",
  Danglers: "Danglers",
  standy: "standy",
  "Packaging Sleeves": "PackagingSleeves",
  Tags: "Tags",
  "Packaging Labels": "PackagingLabels",
  "Boxes Package": "boxpackaging",
  "Bags Printing": "BagsPrinting",
  "Pouches Printing": "PouchesPrinting",
  Envelopes: "Envelopes",
  "Bill Books": "BillBooks",
  Pens: "Pens",
  Mousepads: "Mousepads",
  "Custom Stickers": "CustomStickers",
  "NT Sticker Labels": "NTStickerLabels",
  "Transparent Stickers": "TransparentStickers",
  "Menu Cards": "MenuCard",
  "DPR Register": "DPRRegister",
  "Product Design": "ProductDesign",
  "Logo Design": "LogoDesign",
  "Social Media Design": "SocialMediaDesign",
};

// Export helper
export const getCardsForItem = (itemName) => {
  const folder = NAME_MAP[itemName];
  const images = grouped[folder] || [];

  return images.map((img, idx) => ({
    id: idx + 1,
    title: `${itemName} Design ${idx + 1}`,
    image: img,
    description: `High-quality ${itemName} design`,
  }));
};
