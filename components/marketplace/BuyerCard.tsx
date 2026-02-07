"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, Badge, Button } from "@/components/ui";
import { Phone, MessageCircle, MapPin, Star, CheckCircle } from "lucide-react";
import type { Doc } from "@/convex/_generated/dataModel";

interface BuyerCardProps {
  buyer: Doc<"buyers">;
  onContact?: (buyer: Doc<"buyers">) => void;
}

const productTypeLabels: Record<string, { en: string; sw: string }> = {
  compost: { en: "Compost", sw: "Mboji" },
  vermicompost: { en: "Vermicompost", sw: "Mboji ya Minyoo" },
  bio_fertilizer: { en: "Bio-Fertilizer", sw: "Mbolea ya Kibiolojia" },
  biogas_slurry: { en: "Biogas Slurry", sw: "Tope la Biogesi" },
  animal_feed: { en: "Animal Feed", sw: "Chakula cha Mifugo" },
  silage: { en: "Silage", sw: "Silaji" },
  mulch: { en: "Mulch", sw: "Kifuniko" },
  coffee_pulp_compost: { en: "Coffee Pulp Compost", sw: "Mboji ya Maganda ya Kahawa" },
};

export function BuyerCard({ buyer, onContact }: BuyerCardProps) {
  const t = useTranslations();
  const locale = useLocale();

  const description = locale === "sw" ? buyer.description.sw : buyer.description.en;
  const priceRange = buyer.priceRange
    ? locale === "sw"
      ? buyer.priceRange.sw
      : buyer.priceRange.en
    : null;

  const handleCall = () => {
    window.location.href = `tel:${buyer.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      locale === "sw"
        ? `Habari, ninapenda kujua zaidi kuhusu bidhaa zako.`
        : `Hello, I would like to know more about your products.`
    );
    window.open(`https://wa.me/${buyer.whatsapp?.replace(/\+/g, "")}?text=${message}`, "_blank");
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {buyer.businessName}
            </h3>
            {buyer.isVerified && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {buyer.contactPerson}
          </p>
        </div>
        {buyer.rating && (
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{buyer.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({buyer.reviewCount})</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <MapPin className="h-4 w-4" />
        <span className="capitalize">{buyer.county.replace(/_/g, " ")}</span>
        {buyer.subCounty && <span>, {buyer.subCounty}</span>}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {description}
      </p>

      {priceRange && (
        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">
          {priceRange}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {buyer.productTypes.slice(0, 3).map((type) => (
          <Badge key={type} variant="secondary" size="sm">
            {productTypeLabels[type]?.[locale as "en" | "sw"] || type}
          </Badge>
        ))}
        {buyer.productTypes.length > 3 && (
          <Badge variant="secondary" size="sm">
            +{buyer.productTypes.length - 3}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleCall}
        >
          <Phone className="h-4 w-4" />
          {t("marketplace.call")}
        </Button>
        {buyer.whatsapp && (
          <Button
            variant="primary"
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        )}
      </div>
    </Card>
  );
}
