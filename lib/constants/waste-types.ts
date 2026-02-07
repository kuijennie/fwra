export type WasteCategory =
  | "crop_residue"
  | "manure"
  | "food_scraps"
  | "other";

export interface WasteSubType {
  id: string;
  category: WasteCategory;
  labelKey: string; // Translation key
  icon: string;
  nitrogenContent: "high" | "medium" | "low";
  carbonContent: "high" | "medium" | "low";
  moistureLevel: "high" | "medium" | "low";
  suitableFor: string[]; // recycling methods
}

export interface WasteCategoryInfo {
  id: WasteCategory;
  labelKey: string;
  descKey: string;
  icon: string;
  color: string;
}

export const wasteCategories: WasteCategoryInfo[] = [
  {
    id: "crop_residue",
    labelKey: "wasteInput.cropResidue",
    descKey: "wasteInput.cropResidueDesc",
    icon: "🌾",
    color: "amber",
  },
  {
    id: "manure",
    labelKey: "wasteInput.manure",
    descKey: "wasteInput.manureDesc",
    icon: "🐄",
    color: "brown",
  },
  {
    id: "food_scraps",
    labelKey: "wasteInput.foodScraps",
    descKey: "wasteInput.foodScrapsDesc",
    icon: "🥬",
    color: "green",
  },
  {
    id: "other",
    labelKey: "wasteInput.other",
    descKey: "wasteInput.otherDesc",
    icon: "♻️",
    color: "gray",
  },
];

export const wasteSubTypes: WasteSubType[] = [
  // Crop Residues
  {
    id: "maize_stalks",
    category: "crop_residue",
    labelKey: "wasteTypes.maize_stalks",
    icon: "🌽",
    nitrogenContent: "low",
    carbonContent: "high",
    moistureLevel: "low",
    suitableFor: ["composting", "mulching", "animal_feed", "biogas"],
  },
  {
    id: "wheat_straw",
    category: "crop_residue",
    labelKey: "wasteTypes.wheat_straw",
    icon: "🌾",
    nitrogenContent: "low",
    carbonContent: "high",
    moistureLevel: "low",
    suitableFor: ["composting", "mulching", "animal_feed"],
  },
  {
    id: "rice_husks",
    category: "crop_residue",
    labelKey: "wasteTypes.rice_husks",
    icon: "🍚",
    nitrogenContent: "low",
    carbonContent: "high",
    moistureLevel: "low",
    suitableFor: ["composting", "mulching"],
  },
  {
    id: "sugarcane_bagasse",
    category: "crop_residue",
    labelKey: "wasteTypes.sugarcane_bagasse",
    icon: "🎋",
    nitrogenContent: "low",
    carbonContent: "high",
    moistureLevel: "medium",
    suitableFor: ["composting", "mulching", "biogas"],
  },
  {
    id: "bean_residue",
    category: "crop_residue",
    labelKey: "wasteTypes.bean_residue",
    icon: "🫘",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "low",
    suitableFor: ["composting", "animal_feed", "mulching"],
  },
  {
    id: "vegetable_trimmings",
    category: "crop_residue",
    labelKey: "wasteTypes.vegetable_trimmings",
    icon: "🥕",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "animal_feed", "biogas"],
  },
  {
    id: "fruit_peels",
    category: "crop_residue",
    labelKey: "wasteTypes.fruit_peels",
    icon: "🍌",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas", "vermicompost"],
  },
  {
    id: "coffee_pulp",
    category: "crop_residue",
    labelKey: "wasteTypes.coffee_pulp",
    icon: "☕",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas", "vermicompost"],
  },
  {
    id: "tea_waste",
    category: "crop_residue",
    labelKey: "wasteTypes.tea_waste",
    icon: "🍵",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "medium",
    suitableFor: ["composting", "mulching"],
  },

  // Animal Manure
  {
    id: "cow_dung",
    category: "manure",
    labelKey: "wasteTypes.cow_dung",
    icon: "🐄",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas", "vermicompost"],
  },
  {
    id: "goat_droppings",
    category: "manure",
    labelKey: "wasteTypes.goat_droppings",
    icon: "🐐",
    nitrogenContent: "high",
    carbonContent: "medium",
    moistureLevel: "low",
    suitableFor: ["composting", "vermicompost"],
  },
  {
    id: "chicken_manure",
    category: "manure",
    labelKey: "wasteTypes.chicken_manure",
    icon: "🐔",
    nitrogenContent: "high",
    carbonContent: "low",
    moistureLevel: "medium",
    suitableFor: ["composting", "biogas"],
  },
  {
    id: "pig_manure",
    category: "manure",
    labelKey: "wasteTypes.pig_manure",
    icon: "🐷",
    nitrogenContent: "high",
    carbonContent: "low",
    moistureLevel: "high",
    suitableFor: ["biogas", "composting"],
  },

  // Food Scraps
  {
    id: "vegetable_peels",
    category: "food_scraps",
    labelKey: "wasteTypes.vegetable_peels",
    icon: "🥔",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas", "vermicompost"],
  },
  {
    id: "food_leftovers",
    category: "food_scraps",
    labelKey: "wasteTypes.food_leftovers",
    icon: "🍲",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas"],
  },
  {
    id: "spoiled_produce",
    category: "food_scraps",
    labelKey: "wasteTypes.spoiled_produce",
    icon: "🍎",
    nitrogenContent: "medium",
    carbonContent: "medium",
    moistureLevel: "high",
    suitableFor: ["composting", "biogas", "animal_feed"],
  },
];

export const volumeUnits = [
  { id: "kg", labelKey: "wasteInput.kg", conversionToKg: 1 },
  { id: "bags", labelKey: "wasteInput.bags", conversionToKg: 50 }, // ~50kg per bag
  { id: "wheelbarrows", labelKey: "wasteInput.wheelbarrows", conversionToKg: 80 }, // ~80kg per wheelbarrow
] as const;

export const availableResources = [
  { id: "water", labelKey: "wasteInput.water", icon: "💧" },
  { id: "labor", labelKey: "wasteInput.labor", icon: "👷" },
  { id: "containers", labelKey: "wasteInput.containers", icon: "🪣" },
  { id: "shade", labelKey: "wasteInput.shade", icon: "🏠" },
  { id: "space", labelKey: "wasteInput.space", icon: "📐" },
] as const;

export const seasons = [
  { id: "dry", labelKey: "wasteInput.dry" },
  { id: "wet", labelKey: "wasteInput.wet" },
  { id: "transition", labelKey: "wasteInput.transition" },
] as const;

export function getWasteSubTypesByCategory(category: WasteCategory): WasteSubType[] {
  return wasteSubTypes.filter((subType) => subType.category === category);
}

export function getWasteSubTypeById(id: string): WasteSubType | undefined {
  return wasteSubTypes.find((subType) => subType.id === id);
}
