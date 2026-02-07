import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farm Waste Recycling Advisor",
    short_name: "FWRA",
    description:
      "Turn your farm waste into valuable resources. Get personalized recommendations for composting, biogas, mulching, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#16a34a",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["agriculture", "environment", "education", "utilities"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "Home screen",
      },
      {
        src: "/screenshots/tutorials.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "Tutorial library",
      },
    ],
    shortcuts: [
      {
        name: "Log Waste",
        short_name: "Log",
        description: "Record your farm waste",
        url: "/en/waste-input",
        icons: [{ src: "/icons/shortcut-waste.png", sizes: "96x96" }],
      },
      {
        name: "Tutorials",
        short_name: "Learn",
        description: "Browse recycling tutorials",
        url: "/en/tutorials",
        icons: [{ src: "/icons/shortcut-tutorials.png", sizes: "96x96" }],
      },
      {
        name: "Marketplace",
        short_name: "Market",
        description: "Find buyers for your products",
        url: "/en/marketplace",
        icons: [{ src: "/icons/shortcut-market.png", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
