"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RoleGuard } from "@/components/auth/role-guard";
import { ShoppingBagIcon as ShoppingBag, PhoneIcon as Phone, WhatsappLogoIcon as WhatsappLogo, CircleNotchIcon as Loader2, PackageIcon as Package, MapPinIcon as MapPin, TagIcon as Tag, FunnelIcon as Funnel, ArrowRightIcon as ArrowRight, 
 } from "@phosphor-icons/react";


const PRODUCT_TYPES = [
  "compost",
  "biogas_slurry",
  "silage",
  "mulch",
  "animal_feed",
  "vermicompost",
  "bio_fertilizer",
  "other",
] as const;

const COUNTIES = [
  "nairobi","mombasa","kisumu","nakuru","kiambu","machakos","kajiado",
  "murang_a","nyeri","meru","embu","kakamega","bungoma","uasin_gishu",
  "trans_nzoia","nandi","kericho","bomet","narok","laikipia","nyandarua",
  "kirinyaga","tharaka_nithi","kitui","makueni","kilifi","kwale",
  "taita_taveta","lamu","tana_river","garissa","wajir","mandera",
  "marsabit","isiolo","samburu","turkana","west_pokot","elgeyo_marakwet",
  "baringo","vihiga","busia","siaya","homa_bay","migori","kisii","nyamira",
];

export function BuyerDashboardClient() {
  const t = useTranslations();
  const tb = useTranslations("buyerDashboard");
  const ts = useTranslations("sell");
  const currentUser = useQuery(api.users.getCurrent);

  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const listings = useQuery(api.wasteListings.getAvailable, {
    county: selectedCounty !== "all" ? selectedCounty : undefined,
    wasteType: selectedType !== "all" ? selectedType : undefined,
  });
  const stats = useQuery(api.wasteListings.getStats);

  return (
    <RoleGuard allowedRoles={["buyer"]}>
      <main className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl">

          {/* Hero banner */}
          <section className="mb-6 rounded-3xl border border-green-200 bg-gradient-to-br from-[#06402B] via-[#0b5a3d] to-[#d8eddc] px-6 py-8 text-white">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
              {tb("eyebrow")}
            </p>
            <h1 className="mb-2 text-3xl font-bold">
              {tb("title", { name: currentUser?.name ?? t("roles.buyer") })}
            </h1>
            <p className="max-w-2xl text-sm text-white/80">{tb("subtitle")}</p>
          </section>

          {/* Stats */}
          {stats && (
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard
                value={String(stats.total)}
                label={tb("availableListings")}
                icon={<Package weight="duotone" className="h-5 w-5" />}
              />
              <StatCard
                value={String(stats.countiesCovered)}
                label={tb("countiesCovered")}
                icon={<MapPin weight="duotone" className="h-5 w-5" />}
              />
              <StatCard
                value={String(Object.keys(stats.byType).length)}
                label={tb("productTypes")}
                icon={<Tag weight="duotone" className="h-5 w-5" />}
                className="col-span-2 sm:col-span-1"
              />
            </div>
          )}

          {/* Filters */}
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <Funnel weight="duotone" className="h-4 w-4 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="all">{tb("allTypes")}</option>
                {PRODUCT_TYPES.map((type) => (
                  <option key={type} value={type}>{ts(`productTypes.${type}`)}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <MapPin weight="duotone" className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="text-sm text-gray-700 outline-none dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="all">{tb("allCounties")}</option>
                {COUNTIES.map((c) => (
                  <option key={c} value={c}>{t(`counties.${c}`)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listings */}
          {listings === undefined ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : listings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800">
              <ShoppingBag weight="duotone" className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="font-medium text-gray-600 dark:text-gray-400">{tb("noListings")}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} t={t} tb={tb} ts={ts} />
              ))}
            </div>
          )}
        </div>
      </main>
    </RoleGuard>
  );
}

type Listing = {
  _id: string;
  title: string;
  wasteType: string;
  quantityKg: number;
  pricePerKg?: number;
  county: string;
  description: string;
  contactPhone: string;
  contactWhatsapp?: string;
  farmerName: string;
  createdAt: number;
};

function ListingCard({
  listing,
  t,
  tb,
  ts,
}: {
  listing: Listing;
  t: (key: string) => string;
  tb: (key: string) => string;
  ts: (key: string) => string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      {/* Type badge */}
      <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
        {ts(`productTypes.${listing.wasteType}`)}
      </div>

      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{listing.title}</h3>
      <p className="mb-3 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{listing.description}</p>

      <div className="mb-4 space-y-1.5">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Package weight="duotone" className="h-4 w-4 shrink-0 text-green-600" />
          {listing.quantityKg} kg
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Tag weight="duotone" className="h-4 w-4 shrink-0 text-green-600" />
          {listing.pricePerKg ? `KES ${listing.pricePerKg}/kg` : tb("negotiable")}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin weight="duotone" className="h-4 w-4 shrink-0 text-green-600" />
          {t(`counties.${listing.county}`)}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3 dark:border-gray-700">
        <p className="mb-2 text-xs text-gray-400">{tb("listedBy")}: {listing.farmerName}</p>
        <div className="flex gap-2">
          <a
            href={`tel:${listing.contactPhone}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-green-50 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
          >
            <Phone weight="duotone" className="h-3.5 w-3.5" />
            {tb("call")}
          </a>
          {listing.contactWhatsapp && (
            <a
              href={`https://wa.me/${listing.contactWhatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
            >
              <WhatsappLogo weight="duotone" className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  icon,
  className = "",
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      <div className="mb-3 inline-flex rounded-lg bg-green-100 p-2 text-green-700 dark:bg-green-900/40 dark:text-green-300">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
