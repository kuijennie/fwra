export type RecyclingMethod =
  | "composting"
  | "biogas"
  | "mulching"
  | "animal_feed"
  | "vermicompost";

export interface RecyclingMethodInfo {
  id: RecyclingMethod;
  labelKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedDuration: string;
  requiredResources: string[];
  benefits: string[];
  suitableWasteTypes: string[];
  climateConsiderations: {
    arid: number; // Suitability score 0-10
    semi_arid: number;
    sub_humid: number;
    humid: number;
  };
  minimumVolumeKg: number;
  waterRequirement: "low" | "medium" | "high";
  laborRequirement: "low" | "medium" | "high";
}

export const recyclingMethods: RecyclingMethodInfo[] = [
  {
    id: "composting",
    labelKey: "recommendations.composting",
    descriptionKey: "methodDescriptions.composting",
    icon: "🌱",
    color: "green",
    difficulty: "beginner",
    estimatedDuration: "4-8 weeks",
    requiredResources: ["space", "water"],
    benefits: [
      "Produces nutrient-rich soil amendment",
      "Reduces waste volume by 50-70%",
      "Improves soil structure and water retention",
      "Reduces need for chemical fertilizers",
    ],
    suitableWasteTypes: [
      "maize_stalks",
      "wheat_straw",
      "rice_husks",
      "sugarcane_bagasse",
      "bean_residue",
      "vegetable_trimmings",
      "fruit_peels",
      "coffee_pulp",
      "tea_waste",
      "cow_dung",
      "goat_droppings",
      "chicken_manure",
      "vegetable_peels",
      "food_leftovers",
      "spoiled_produce",
    ],
    climateConsiderations: {
      arid: 5,
      semi_arid: 7,
      sub_humid: 9,
      humid: 10,
    },
    minimumVolumeKg: 20,
    waterRequirement: "medium",
    laborRequirement: "medium",
  },
  {
    id: "biogas",
    labelKey: "recommendations.biogas",
    descriptionKey: "methodDescriptions.biogas",
    icon: "🔥",
    color: "orange",
    difficulty: "intermediate",
    estimatedDuration: "2-4 weeks setup, continuous production",
    requiredResources: ["water", "containers", "shade"],
    benefits: [
      "Produces clean cooking fuel",
      "Generates liquid fertilizer (slurry)",
      "Reduces methane emissions",
      "Saves money on fuel costs",
    ],
    suitableWasteTypes: [
      "cow_dung",
      "pig_manure",
      "chicken_manure",
      "food_leftovers",
      "vegetable_peels",
      "fruit_peels",
      "sugarcane_bagasse",
      "vegetable_trimmings",
      "maize_stalks",
    ],
    climateConsiderations: {
      arid: 6,
      semi_arid: 7,
      sub_humid: 9,
      humid: 8,
    },
    minimumVolumeKg: 50,
    waterRequirement: "high",
    laborRequirement: "low",
  },
  {
    id: "mulching",
    labelKey: "recommendations.mulching",
    descriptionKey: "methodDescriptions.mulching",
    icon: "🍂",
    color: "amber",
    difficulty: "beginner",
    estimatedDuration: "Immediate use",
    requiredResources: ["space"],
    benefits: [
      "Conserves soil moisture",
      "Suppresses weed growth",
      "Regulates soil temperature",
      "Adds organic matter as it decomposes",
    ],
    suitableWasteTypes: [
      "maize_stalks",
      "wheat_straw",
      "rice_husks",
      "sugarcane_bagasse",
      "bean_residue",
      "tea_waste",
    ],
    climateConsiderations: {
      arid: 10,
      semi_arid: 9,
      sub_humid: 7,
      humid: 5,
    },
    minimumVolumeKg: 10,
    waterRequirement: "low",
    laborRequirement: "low",
  },
  {
    id: "animal_feed",
    labelKey: "recommendations.animalFeed",
    descriptionKey: "methodDescriptions.animalFeed",
    icon: "🐄",
    color: "purple",
    difficulty: "beginner",
    estimatedDuration: "Immediate to 2 weeks (for silage)",
    requiredResources: ["containers"],
    benefits: [
      "Reduces feed costs",
      "Provides nutritious supplement",
      "Reduces waste disposal needs",
      "Can be stored as silage",
    ],
    suitableWasteTypes: [
      "maize_stalks",
      "wheat_straw",
      "bean_residue",
      "vegetable_trimmings",
      "spoiled_produce",
    ],
    climateConsiderations: {
      arid: 8,
      semi_arid: 8,
      sub_humid: 8,
      humid: 8,
    },
    minimumVolumeKg: 5,
    waterRequirement: "low",
    laborRequirement: "low",
  },
  {
    id: "vermicompost",
    labelKey: "recommendations.vermicompost",
    descriptionKey: "methodDescriptions.vermicompost",
    icon: "🪱",
    color: "red",
    difficulty: "intermediate",
    estimatedDuration: "2-3 months",
    requiredResources: ["shade", "containers", "water"],
    benefits: [
      "Produces high-quality fertilizer",
      "Faster than traditional composting",
      "Rich in beneficial microorganisms",
      "Can be done in small spaces",
    ],
    suitableWasteTypes: [
      "vegetable_peels",
      "fruit_peels",
      "coffee_pulp",
      "food_leftovers",
      "cow_dung",
      "goat_droppings",
    ],
    climateConsiderations: {
      arid: 4,
      semi_arid: 6,
      sub_humid: 9,
      humid: 8,
    },
    minimumVolumeKg: 5,
    waterRequirement: "medium",
    laborRequirement: "medium",
  },
];

export function getMethodById(id: RecyclingMethod): RecyclingMethodInfo | undefined {
  return recyclingMethods.find((method) => method.id === id);
}

export function getMethodsForWasteType(wasteTypeId: string): RecyclingMethodInfo[] {
  return recyclingMethods.filter((method) =>
    method.suitableWasteTypes.includes(wasteTypeId)
  );
}

export function getMethodsByDifficulty(
  difficulty: RecyclingMethodInfo["difficulty"]
): RecyclingMethodInfo[] {
  return recyclingMethods.filter((method) => method.difficulty === difficulty);
}
