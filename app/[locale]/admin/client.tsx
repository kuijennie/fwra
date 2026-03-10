"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Users,
  Plant as Sprout,
  ShoppingBag,
  Shield,
  Globe,
  FileText,
  Lightbulb,
  Bell,
  CircleNotch as Loader2,
  ShieldWarning as ShieldAlert,
  CheckCircle,
  XCircle,
  ChartBar as BarChart3,
  BookOpen,
  Star,
  MagnifyingGlass as Search,
  ToggleLeft,
  ToggleRight,
  SealCheck as BadgeCheck,
} from "@phosphor-icons/react";
import { Id } from "@/convex/_generated/dataModel";

type Tab = "overview" | "users" | "buyers" | "content";

/* ── design tokens ───────────────────────── */
const B   = "#06402B";          // brand
const B10 = "rgba(6,64,43,0.10)";
const B06 = "rgba(6,64,43,0.06)";
const BG  = "var(--background)";
const SUR = "var(--surface)";
const BRD = "var(--border)";
const FG  = "var(--foreground)";
const FGM = "var(--foreground-muted)";

export function AdminDashboardClient() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userSearch, setUserSearch] = useState("");

  const currentUser = useQuery(api.users.getCurrent);
  const stats       = useQuery(api.users.getStats);
  const users       = useQuery(api.users.listAll);
  const buyers      = useQuery(api.buyers.adminListAll);
  const stories     = useQuery(api.successStories.adminListAll);
  const tutorials   = useQuery(api.tutorials.adminListAll);

  const updateRole         = useMutation(api.users.updateRole);
  const setVerified        = useMutation(api.buyers.adminSetVerified);
  const setActive          = useMutation(api.buyers.adminSetActive);
  const setStoryApproved   = useMutation(api.successStories.adminSetApproved);
  const deleteStory        = useMutation(api.successStories.adminDelete);
  const setTutorialPublished = useMutation(api.tutorials.adminSetPublished);

  /* ── loading ── */
  if (currentUser === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-8" style={{ background: BG }}>
        <Loader2 weight="duotone" className="h-7 w-7 animate-spin" style={{ color: B }} />
      </main>
    );
  }

  /* ── access denied ── */
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <main className="min-h-screen px-4 py-8" style={{ background: BG }}>
        <div className="mx-auto max-w-6xl">
          <div
            className="flex flex-col items-center justify-center rounded-2xl border p-12 text-center"
            style={{ background: SUR, borderColor: BRD }}
          >
            <div className="mb-4 rounded-full p-4" style={{ background: B10 }}>
              <ShieldAlert weight="duotone" className="h-10 w-10" style={{ color: B }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: FG }}>
              {t("admin.accessDenied")}
            </h2>
          </div>
        </div>
      </main>
    );
  }

  const filteredUsers = users?.filter((u) => {
    if (!userSearch) return true;
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.email ?? "").toLowerCase().includes(q) ||
      u.county.toLowerCase().includes(q)
    );
  });

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: t("admin.tabOverview"), icon: <BarChart3 weight="duotone" className="h-4 w-4" /> },
    { id: "users",    label: t("admin.tabUsers"),    icon: <Users     weight="duotone" className="h-4 w-4" /> },
    { id: "buyers",   label: t("admin.tabBuyers"),   icon: <ShoppingBag weight="duotone" className="h-4 w-4" /> },
    { id: "content",  label: t("admin.tabContent"),  icon: <BookOpen  weight="duotone" className="h-4 w-4" /> },
  ];

  return (
    <main className="min-h-screen px-4 py-8" style={{ background: BG }}>
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display mb-1 text-2xl font-bold italic" style={{ color: FG }}>
            {t("admin.title")}
          </h1>
          <p className="text-sm" style={{ color: FGM }}>
            {t("admin.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div
          className="mb-6 flex gap-1 rounded-xl p-1"
          style={{ background: B06 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={
                activeTab === tab.id
                  ? { background: SUR, color: B, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }
                  : { color: FGM }
              }
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && stats && (
          <div className="space-y-6">
            <StatGroup label={t("admin.userStats")}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <StatCard icon={<Users       weight="duotone" className="h-5 w-5" />} label={t("admin.totalUsers")}         value={stats.totalUsers} />
                <StatCard icon={<Sprout      weight="duotone" className="h-5 w-5" />} label={t("admin.farmers")}             value={stats.farmers} />
                <StatCard icon={<ShoppingBag weight="duotone" className="h-5 w-5" />} label={t("admin.buyers")}              value={stats.buyers} />
                <StatCard icon={<Shield      weight="duotone" className="h-5 w-5" />} label={t("admin.admins")}              value={stats.admins} />
                <StatCard icon={<Globe       weight="duotone" className="h-5 w-5" />} label={t("admin.anonymousSessions")}   value={stats.anonymousSessions} />
              </div>
            </StatGroup>

            <StatGroup label={t("admin.systemUsage")}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard icon={<FileText  weight="duotone" className="h-5 w-5" />} label={t("admin.totalEntries")}         value={stats.totalEntries} />
                <StatCard icon={<Lightbulb weight="duotone" className="h-5 w-5" />} label={t("admin.totalRecommendations")} value={stats.totalRecommendations} />
                <StatCard icon={<Bell      weight="duotone" className="h-5 w-5" />} label={t("admin.totalReminders")}       value={stats.totalReminders} />
              </div>
            </StatGroup>

            <StatGroup label={t("admin.contentStats")}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StatCard icon={<ShoppingBag weight="duotone" className="h-5 w-5" />} label={t("admin.totalBuyers")}       value={buyers?.length ?? 0} />
                <StatCard icon={<BadgeCheck  weight="duotone" className="h-5 w-5" />} label={t("admin.verifiedBuyers")}    value={buyers?.filter((b) => b.isVerified).length ?? 0} />
                <StatCard icon={<Star        weight="duotone" className="h-5 w-5" />} label={t("admin.pendingStories")}    value={stories?.filter((s) => !s.isApproved).length ?? 0} />
                <StatCard icon={<BookOpen    weight="duotone" className="h-5 w-5" />} label={t("admin.publishedTutorials")} value={tutorials?.filter((tt) => tt.isPublished).length ?? 0} />
              </div>
            </StatGroup>
          </div>
        )}

        {/* ── Users ── */}
        {activeTab === "users" && (
          <section
            className="overflow-hidden rounded-2xl border"
            style={{ background: SUR, borderColor: BRD }}
          >
            <div className="flex items-center gap-4 border-b px-6 py-4" style={{ borderColor: BRD }}>
              <h2 className="flex-1 text-lg font-semibold" style={{ color: FG }}>
                {t("admin.tabUsers")}
              </h2>
              <div className="relative">
                <Search weight="duotone" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: FGM }} />
                <input
                  type="text"
                  placeholder={t("admin.searchUsers")}
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="rounded-lg border py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2"
                  style={{
                    borderColor: BRD,
                    background: BG,
                    color: FG,
                    "--tw-ring-color": B,
                  } as React.CSSProperties}
                />
              </div>
            </div>

            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ background: B06, borderColor: BRD }}>
                      {[t("admin.colName"), t("admin.colEmail"), t("admin.colCounty"), t("admin.changeRole"), t("admin.colLastActive")].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: FGM }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b transition-colors"
                        style={{ borderColor: BRD }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = B06)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div
                              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                              style={{ background: B10, color: B }}
                            >
                              {user.name[0]?.toUpperCase()}
                            </div>
                            <span className="text-sm font-medium" style={{ color: FG }}>{user.name}</span>
                            {user._id === currentUser._id && (
                              <span className="text-xs" style={{ color: FGM }}>(you)</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: FGM }}>
                          {user.email ?? "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize" style={{ color: FGM }}>
                          {user.county.replace(/_/g, " ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => updateRole({ userId: user._id as Id<"users">, role: e.target.value })}
                            disabled={user._id === currentUser._id}
                            className="rounded-lg border px-2 py-1 text-sm disabled:opacity-50"
                            style={{ borderColor: BRD, background: SUR, color: FG }}
                          >
                            <option value="farmer">{t("roles.farmer")}</option>
                            <option value="buyer">{t("roles.buyer")}</option>
                            <option value="admin">{t("roles.admin")}</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: FGM }}>
                          {new Date(user.lastActive).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text={userSearch ? t("admin.noUsersFound") : t("admin.noUsers")} />
            )}
          </section>
        )}

        {/* ── Buyers ── */}
        {activeTab === "buyers" && (
          <section
            className="overflow-hidden rounded-2xl border"
            style={{ background: SUR, borderColor: BRD }}
          >
            <div className="border-b px-6 py-4" style={{ borderColor: BRD }}>
              <h2 className="text-lg font-semibold" style={{ color: FG }}>{t("admin.tabBuyers")}</h2>
              <p className="mt-0.5 text-sm" style={{ color: FGM }}>{t("admin.buyersSubtitle")}</p>
            </div>

            {buyers && buyers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ background: B06, borderColor: BRD }}>
                      {[t("admin.colBusiness"), t("admin.colCounty"), t("admin.colProducts"), t("admin.colVerified"), t("admin.colActive")].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: FGM }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {buyers.map((buyer) => (
                      <tr
                        key={buyer._id}
                        className="border-b transition-colors"
                        style={{ borderColor: BRD }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = B06)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium" style={{ color: FG }}>{buyer.businessName}</p>
                          <p className="text-xs" style={{ color: FGM }}>{buyer.contactPerson} · {buyer.phone}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm capitalize" style={{ color: FGM }}>
                          {buyer.county.replace(/_/g, " ")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {buyer.productTypes.slice(0, 2).map((type) => (
                              <span
                                key={type}
                                className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                style={{ background: B10, color: B }}
                              >
                                {type.replace(/_/g, " ")}
                              </span>
                            ))}
                            {buyer.productTypes.length > 2 && (
                              <span className="text-xs" style={{ color: FGM }}>
                                +{buyer.productTypes.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setVerified({ id: buyer._id, isVerified: !buyer.isVerified })}
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                            style={
                              buyer.isVerified
                                ? { background: B10, color: B }
                                : { background: "var(--brand-50)", color: FGM, outline: `1px solid ${BRD}` }
                            }
                          >
                            {buyer.isVerified
                              ? <><CheckCircle weight="duotone" className="h-3.5 w-3.5" /> {t("admin.verified")}</>
                              : <><XCircle    weight="duotone" className="h-3.5 w-3.5" /> {t("admin.unverified")}</>}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setActive({ id: buyer._id, isActive: !buyer.isActive })}
                            className="transition-opacity hover:opacity-75"
                            title={buyer.isActive ? t("admin.deactivate") : t("admin.activate")}
                          >
                            {buyer.isActive
                              ? <ToggleRight weight="duotone" className="h-6 w-6" style={{ color: B }} />
                              : <ToggleLeft  weight="duotone" className="h-6 w-6" style={{ color: FGM }} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text={t("admin.noBuyers")} />
            )}
          </section>
        )}

        {/* ── Content ── */}
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Stories */}
            <section
              className="overflow-hidden rounded-2xl border"
              style={{ background: SUR, borderColor: BRD }}
            >
              <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: BRD }}>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: FG }}>{t("admin.successStories")}</h2>
                  <p className="mt-0.5 text-sm" style={{ color: FGM }}>{t("admin.storiesSubtitle")}</p>
                </div>
                {stories && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ background: B10, color: B }}
                  >
                    {stories.filter((s) => !s.isApproved).length} {t("admin.pending")}
                  </span>
                )}
              </div>

              {stories && stories.length > 0 ? (
                <div>
                  {stories.map((story) => (
                    <div
                      key={story._id}
                      className="flex items-start gap-4 border-b px-6 py-4 last:border-0 transition-colors"
                      style={{ borderColor: BRD }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = B06)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 flex items-center gap-2">
                          <p className="truncate text-sm font-medium" style={{ color: FG }}>{story.farmerName}</p>
                          <span style={{ color: FGM }}>·</span>
                          <span className="text-xs capitalize" style={{ color: FGM }}>{story.county.replace(/_/g, " ")}</span>
                          <span style={{ color: FGM }}>·</span>
                          <span className="text-xs" style={{ color: FGM }}>{story.method.replace(/_/g, " ")}</span>
                        </div>
                        <p className="line-clamp-2 text-xs" style={{ color: FGM }}>{story.story.en}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => setStoryApproved({ id: story._id, isApproved: !story.isApproved })}
                          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                          style={
                            story.isApproved
                              ? { background: B10, color: B }
                              : { background: "var(--brand-50)", color: FGM, outline: `1px solid ${BRD}` }
                          }
                        >
                          {story.isApproved
                            ? <><CheckCircle weight="duotone" className="h-3 w-3" /> {t("admin.approved")}</>
                            : <><XCircle    weight="duotone" className="h-3 w-3" /> {t("admin.approve")}</>}
                        </button>
                        <button
                          onClick={() => deleteStory({ id: story._id })}
                          className="text-xs transition-opacity hover:opacity-60"
                          style={{ color: FGM }}
                        >
                          {t("admin.delete")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text={t("admin.noStories")} />
              )}
            </section>

            {/* Tutorials */}
            <section
              className="overflow-hidden rounded-2xl border"
              style={{ background: SUR, borderColor: BRD }}
            >
              <div className="border-b px-6 py-4" style={{ borderColor: BRD }}>
                <h2 className="text-lg font-semibold" style={{ color: FG }}>{t("admin.tutorials")}</h2>
                <p className="mt-0.5 text-sm" style={{ color: FGM }}>{t("admin.tutorialsSubtitle")}</p>
              </div>

              {tutorials && tutorials.length > 0 ? (
                <div>
                  {tutorials.map((tutorial) => (
                    <div
                      key={tutorial._id}
                      className="flex items-center gap-4 border-b px-6 py-4 last:border-0 transition-colors"
                      style={{ borderColor: BRD }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = B06)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium" style={{ color: FG }}>{tutorial.title.en}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-xs capitalize" style={{ color: FGM }}>{tutorial.category.replace(/_/g, " ")}</span>
                          <span style={{ color: FGM }}>·</span>
                          <span className="text-xs" style={{ color: FGM }}>{tutorial.difficulty}</span>
                          <span style={{ color: FGM }}>·</span>
                          <span className="text-xs" style={{ color: FGM }}>{tutorial.viewCount} views</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setTutorialPublished({ id: tutorial._id, isPublished: !tutorial.isPublished })}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                        style={
                          tutorial.isPublished
                            ? { background: B10, color: B }
                            : { background: "var(--brand-50)", color: FGM, outline: `1px solid ${BRD}` }
                        }
                      >
                        {tutorial.isPublished
                          ? <><CheckCircle weight="duotone" className="h-3 w-3" /> {t("admin.published")}</>
                          : <><XCircle    weight="duotone" className="h-3 w-3" /> {t("admin.unpublished")}</>}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text={t("admin.noTutorials")} />
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

/* ── helpers ── */

function StatGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--brand-muted)" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div
        className="mb-3 inline-flex rounded-lg p-2"
        style={{ background: "rgba(6,64,43,0.08)", color: "#06402B" }}
      >
        {icon}
      </div>
      <div className="font-display text-2xl font-bold italic" style={{ color: "var(--foreground)" }}>
        {value}
      </div>
      <div className="mt-0.5 text-xs" style={{ color: "var(--foreground-muted)" }}>
        {label}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>{text}</p>
    </div>
  );
}
