export interface County {
  id: string;
  name: string;
  labelKey: string;
  region: string;
  climateZone: "arid" | "semi_arid" | "sub_humid" | "humid";
  averageRainfall: "low" | "medium" | "high"; // mm per year
}

export const counties: County[] = [
  // Central Region
  {
    id: "kiambu",
    name: "Kiambu",
    labelKey: "counties.kiambu",
    region: "Central",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "murang_a",
    name: "Murang'a",
    labelKey: "counties.murang_a",
    region: "Central",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "nyeri",
    name: "Nyeri",
    labelKey: "counties.nyeri",
    region: "Central",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "kirinyaga",
    name: "Kirinyaga",
    labelKey: "counties.kirinyaga",
    region: "Central",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "nyandarua",
    name: "Nyandarua",
    labelKey: "counties.nyandarua",
    region: "Central",
    climateZone: "humid",
    averageRainfall: "high",
  },

  // Nairobi
  {
    id: "nairobi",
    name: "Nairobi",
    labelKey: "counties.nairobi",
    region: "Nairobi",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },

  // Coast Region
  {
    id: "mombasa",
    name: "Mombasa",
    labelKey: "counties.mombasa",
    region: "Coast",
    climateZone: "humid",
    averageRainfall: "medium",
  },
  {
    id: "kilifi",
    name: "Kilifi",
    labelKey: "counties.kilifi",
    region: "Coast",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "kwale",
    name: "Kwale",
    labelKey: "counties.kwale",
    region: "Coast",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "taita_taveta",
    name: "Taita Taveta",
    labelKey: "counties.taita_taveta",
    region: "Coast",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "lamu",
    name: "Lamu",
    labelKey: "counties.lamu",
    region: "Coast",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "tana_river",
    name: "Tana River",
    labelKey: "counties.tana_river",
    region: "Coast",
    climateZone: "arid",
    averageRainfall: "low",
  },

  // Eastern Region
  {
    id: "meru",
    name: "Meru",
    labelKey: "counties.meru",
    region: "Eastern",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "embu",
    name: "Embu",
    labelKey: "counties.embu",
    region: "Eastern",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "tharaka_nithi",
    name: "Tharaka Nithi",
    labelKey: "counties.tharaka_nithi",
    region: "Eastern",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "machakos",
    name: "Machakos",
    labelKey: "counties.machakos",
    region: "Eastern",
    climateZone: "semi_arid",
    averageRainfall: "medium",
  },
  {
    id: "makueni",
    name: "Makueni",
    labelKey: "counties.makueni",
    region: "Eastern",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "kitui",
    name: "Kitui",
    labelKey: "counties.kitui",
    region: "Eastern",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "isiolo",
    name: "Isiolo",
    labelKey: "counties.isiolo",
    region: "Eastern",
    climateZone: "arid",
    averageRainfall: "low",
  },
  {
    id: "marsabit",
    name: "Marsabit",
    labelKey: "counties.marsabit",
    region: "Eastern",
    climateZone: "arid",
    averageRainfall: "low",
  },

  // North Eastern Region
  {
    id: "garissa",
    name: "Garissa",
    labelKey: "counties.garissa",
    region: "North Eastern",
    climateZone: "arid",
    averageRainfall: "low",
  },
  {
    id: "wajir",
    name: "Wajir",
    labelKey: "counties.wajir",
    region: "North Eastern",
    climateZone: "arid",
    averageRainfall: "low",
  },
  {
    id: "mandera",
    name: "Mandera",
    labelKey: "counties.mandera",
    region: "North Eastern",
    climateZone: "arid",
    averageRainfall: "low",
  },

  // Rift Valley Region
  {
    id: "nakuru",
    name: "Nakuru",
    labelKey: "counties.nakuru",
    region: "Rift Valley",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "kajiado",
    name: "Kajiado",
    labelKey: "counties.kajiado",
    region: "Rift Valley",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "narok",
    name: "Narok",
    labelKey: "counties.narok",
    region: "Rift Valley",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "laikipia",
    name: "Laikipia",
    labelKey: "counties.laikipia",
    region: "Rift Valley",
    climateZone: "semi_arid",
    averageRainfall: "medium",
  },
  {
    id: "samburu",
    name: "Samburu",
    labelKey: "counties.samburu",
    region: "Rift Valley",
    climateZone: "arid",
    averageRainfall: "low",
  },
  {
    id: "turkana",
    name: "Turkana",
    labelKey: "counties.turkana",
    region: "Rift Valley",
    climateZone: "arid",
    averageRainfall: "low",
  },
  {
    id: "west_pokot",
    name: "West Pokot",
    labelKey: "counties.west_pokot",
    region: "Rift Valley",
    climateZone: "semi_arid",
    averageRainfall: "medium",
  },
  {
    id: "baringo",
    name: "Baringo",
    labelKey: "counties.baringo",
    region: "Rift Valley",
    climateZone: "semi_arid",
    averageRainfall: "low",
  },
  {
    id: "elgeyo_marakwet",
    name: "Elgeyo Marakwet",
    labelKey: "counties.elgeyo_marakwet",
    region: "Rift Valley",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },
  {
    id: "uasin_gishu",
    name: "Uasin Gishu",
    labelKey: "counties.uasin_gishu",
    region: "Rift Valley",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "trans_nzoia",
    name: "Trans Nzoia",
    labelKey: "counties.trans_nzoia",
    region: "Rift Valley",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "nandi",
    name: "Nandi",
    labelKey: "counties.nandi",
    region: "Rift Valley",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "kericho",
    name: "Kericho",
    labelKey: "counties.kericho",
    region: "Rift Valley",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "bomet",
    name: "Bomet",
    labelKey: "counties.bomet",
    region: "Rift Valley",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },

  // Western Region
  {
    id: "kakamega",
    name: "Kakamega",
    labelKey: "counties.kakamega",
    region: "Western",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "bungoma",
    name: "Bungoma",
    labelKey: "counties.bungoma",
    region: "Western",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "vihiga",
    name: "Vihiga",
    labelKey: "counties.vihiga",
    region: "Western",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "busia",
    name: "Busia",
    labelKey: "counties.busia",
    region: "Western",
    climateZone: "sub_humid",
    averageRainfall: "high",
  },

  // Nyanza Region
  {
    id: "kisumu",
    name: "Kisumu",
    labelKey: "counties.kisumu",
    region: "Nyanza",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "siaya",
    name: "Siaya",
    labelKey: "counties.siaya",
    region: "Nyanza",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "homa_bay",
    name: "Homa Bay",
    labelKey: "counties.homa_bay",
    region: "Nyanza",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "migori",
    name: "Migori",
    labelKey: "counties.migori",
    region: "Nyanza",
    climateZone: "sub_humid",
    averageRainfall: "medium",
  },
  {
    id: "kisii",
    name: "Kisii",
    labelKey: "counties.kisii",
    region: "Nyanza",
    climateZone: "humid",
    averageRainfall: "high",
  },
  {
    id: "nyamira",
    name: "Nyamira",
    labelKey: "counties.nyamira",
    region: "Nyanza",
    climateZone: "humid",
    averageRainfall: "high",
  },
];

export function getCountyById(id: string): County | undefined {
  return counties.find((county) => county.id === id);
}

export function getCountiesByRegion(region: string): County[] {
  return counties.filter((county) => county.region === region);
}

export function getCountiesByClimateZone(
  zone: County["climateZone"]
): County[] {
  return counties.filter((county) => county.climateZone === zone);
}

export const regions = [
  "Central",
  "Nairobi",
  "Coast",
  "Eastern",
  "North Eastern",
  "Rift Valley",
  "Western",
  "Nyanza",
] as const;

// Formatted for Select component
export const KENYA_COUNTIES = counties.map((county) => ({
  value: county.id,
  label: county.name,
}));
