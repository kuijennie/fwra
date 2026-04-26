"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BuyerGrid, SearchFilters } from "@/components/marketplace";
import { Badge } from "@/components/ui";
import { StorefrontIcon as Store, PackageIcon as Package, MapPinIcon as MapPin, TagIcon as Tag, PhoneIcon as Phone, WhatsappLogoIcon as WhatsappLogo, CircleNotchIcon as Loader2, UsersIcon as Users, CheckCircleIcon as CheckCircle, FunnelIcon as Funnel, 
 } from "@phosphor-icons/react";

type Tab = "listings" | "buyers";

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

export function MarketplaceClient() {
  const t = useTranslations();
  const ts = useTranslations("sell");
  const [activeTab, setActiveTab] = useState<Tab>("listings");

  // Listings tab state
  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Buyers tab state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuyerCounty, setSelectedBuyerCounty] = useState("all");
  const [selectedProductType, setSelectedProductType] = useState("all");

  const listings = useQuery(api.wasteListings.getAvailable, {
    county: selectedCounty !== "all" ? selectedCounty : undefined,
    wasteType: selectedType !== "all" ? selectedType : undefined,
  });
  const listingStats = useQuery(api.wasteListings.getStats);

  const buyers = useQuery(api.buyers.search, {
    query: searchQuery,
    county: selectedBuyerCounty !== "all" ? selectedBuyerCounty : undefined,
    productType: selectedProductType !== "all" ? selectedProductType : undefined,
  });
  const buyerStats = useQuery(api.buyers.getStats);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Store weight="duotone" className="h-7 w-7 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("marketplace.title")}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t("marketplace.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => setActiveTab("listings")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              activeTab === "listings"
                ? "bg-[#06402B] text-white"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Package weight="duotone" className="h-4 w-4" />
            {t("marketplace.tabListings")}
          </button>
          <button
            onClick={() => setActiveTab("buyers")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
              activeTab === "buyers"
                ? "bg-[#06402B] text-white"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Users weight="duotone" className="h-4 w-4" />
            {t("marketplace.tabBuyers")}
          </button>
        </div>

        {/* ── LISTINGS TAB ── */}
        {activeTab === "listings" && (
          <>
            {/* Stats */}
            {listingStats && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard icon={<Package weight="duotone" className="h-5 w-5 text-green-600 mx-auto mb-1" />} value={listingStats.total} label={t("marketplace.totalListings")} />
                <StatCard icon={<MapPin weight="duotone" className="h-5 w-5 text-blue-600 mx-auto mb-1" />} value={listingStats.countiesCovered} label={t("marketplace.countiesCovered")} />
                <StatCard icon={<Tag weight="duotone" className="h-5 w-5 text-purple-600 mx-auto mb-1" />} value={Object.keys(listingStats.byType).length} label={t("marketplace.productTypes")} />
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
                  <option value="all">{t("marketplace.allProducts")}</option>
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
                  <option value="all">{t("marketplace.allCounties")}</option>
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>{t(`counties.${c}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Listing cards */}
            {listings === undefined ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 weight="duotone" className="h-8 w-8 animate-spin text-green-600" />
              </div>
            ) : listings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800">
                <Package weight="duotone" className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
                <p className="font-medium text-gray-600 dark:text-gray-400">{t("marketplace.noListings")}</p>
                <p className="mt-1 text-sm text-gray-400">{t("marketplace.noListingsDesc")}</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {listings.map((listing) => (
                  <div key={listing._id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
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
                        {listing.pricePerKg ? `KES ${listing.pricePerKg}/kg` : t("marketplace.negotiable")}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin weight="duotone" className="h-4 w-4 shrink-0 text-green-600" />
                        {t(`counties.${listing.county}`)}
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-3 dark:border-gray-700">
                      <p className="mb-2 text-xs text-gray-400">{t("marketplace.listedBy")}: {listing.farmerName}</p>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${listing.contactPhone}`}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-green-50 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
                        >
                          <Phone weight="duotone" className="h-3.5 w-3.5" />
                          {t("marketplace.call")}
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
                ))}
              </div>
            )}
          </>
        )}

        {/* ── BUYERS TAB ── */}
        {activeTab === "buyers" && (
          <>
            {/* Stats */}
            {buyerStats && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatCard icon={<Users weight="duotone" className="h-5 w-5 text-blue-600 mx-auto mb-1" />} value={buyerStats.total} label={t("marketplace.totalBuyers")} />
                <StatCard icon={<CheckCircle weight="duotone" className="h-5 w-5 text-green-600 mx-auto mb-1" />} value={buyerStats.verified} label={t("marketplace.verifiedBuyers")} />
                <StatCard icon={<Store weight="duotone" className="h-5 w-5 text-purple-600 mx-auto mb-1" />} value={Object.keys(buyerStats.byCounty).length} label={t("marketplace.countiesCovered")} />
              </div>
            )}

            {/* Search & Filters */}
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCounty={selectedBuyerCounty}
              onCountyChange={setSelectedBuyerCounty}
              selectedProductType={selectedProductType}
              onProductTypeChange={setSelectedProductType}
            />

            {(selectedBuyerCounty !== "all" || selectedProductType !== "all") && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t("marketplace.activeFilters")}:</span>
                {selectedBuyerCounty !== "all" && (
                  <Badge variant="secondary" size="sm" className="cursor-pointer" onClick={() => setSelectedBuyerCounty("all")}>
                    {selectedBuyerCounty.replace(/_/g, " ")} ✕
                  </Badge>
                )}
                {selectedProductType !== "all" && (
                  <Badge variant="secondary" size="sm" className="cursor-pointer" onClick={() => setSelectedProductType("all")}>
                    {selectedProductType.replace(/_/g, " ")} ✕
                  </Badge>
                )}
              </div>
            )}

            {buyers && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t("marketplace.showingResults", { count: buyers.length })}
              </p>
            )}

            <BuyerGrid buyers={buyers || []} isLoading={buyers === undefined} />

            <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-center">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t("marketplace.ctaTitle")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("marketplace.ctaDescription")}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t("marketplace.ctaContact")}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
      {icon}
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  );
}
