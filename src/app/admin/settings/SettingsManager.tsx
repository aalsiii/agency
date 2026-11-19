"use client";

import { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, Phone, Mail, Building, Bell, Sparkles } from "lucide-react";

export default function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({
    agency_name: "NextCurrent Media",
    agency_tagline: "Build your brand's next stage of growth with high-velocity funnels & modern web engineering.",
    contact_email: "hello@nextcurrentmedia.com",
    admin_notify_email: "bijalwanakshat@gmail.com",
    whatsapp_number: "919389403190",
    phone_display: "+91 93894 03190",
    office_address: "Dehradun / Delhi NCR, India & Serving Global Clients",
    announcement_bar: "Q2 Growth Cohort Open: Claim Your Free Growth & Funnel Audit Today",
    show_announcement: "true",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center font-mono text-xs text-muted">Loading settings...</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl space-y-6">
      <div>
        <div className="font-mono text-xs text-primary/80 tracking-widest uppercase mb-1">
          System Configuration & Preferences
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Site & Agency Settings
        </h1>
        <p className="font-mono text-xs text-muted mt-1">
          Configure branding, WhatsApp routing, contact channels, and global banner messaging dynamically.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span>Settings saved successfully and applied across the public application.</span>
          </div>
        )}

        {/* Section 1: Agency Identity */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-serif text-sm font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            Brand Identity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                Agency Brand Name
              </label>
              <input
                type="text"
                value={settings.agency_name}
                onChange={(e) => handleChange("agency_name", e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                Office / Base Location
              </label>
              <input
                type="text"
                value={settings.office_address}
                onChange={(e) => handleChange("office_address", e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
              Primary Brand Tagline / Mission
            </label>
            <input
              type="text"
              value={settings.agency_tagline}
              onChange={(e) => handleChange("agency_tagline", e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none font-sans"
            />
          </div>
        </div>

        {/* Section 2: Contact & WhatsApp */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-serif text-sm font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Direct Communication & WhatsApp
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => handleChange("whatsapp_number", e.target.value)}
                placeholder="919389403190"
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
              <p className="text-[10px] text-muted mt-1">Used for 1-click WhatsApp chat triggers.</p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                Display Phone
              </label>
              <input
                type="text"
                value={settings.phone_display}
                onChange={(e) => handleChange("phone_display", e.target.value)}
                placeholder="+91 93894 03190"
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                Public Inquiries Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => handleChange("contact_email", e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
                Admin Notification Recipient Email
              </label>
              <input
                type="email"
                value={settings.admin_notify_email}
                onChange={(e) => handleChange("admin_notify_email", e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Announcement Bar */}
        <div className="bg-[var(--background-layer-1)] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-serif text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Top Announcement Banner
          </h2>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-muted mb-1.5">
              Banner Text
            </label>
            <input
              type="text"
              value={settings.announcement_bar}
              onChange={(e) => handleChange("announcement_bar", e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-primary/60 rounded-xl py-2 px-3.5 text-xs text-white outline-none font-sans"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show_announcement"
              checked={settings.show_announcement === "true"}
              onChange={(e) => handleChange("show_announcement", e.target.checked ? "true" : "false")}
              className="w-4 h-4 accent-[#C5A059] rounded cursor-pointer"
            />
            <label htmlFor="show_announcement" className="text-xs text-neutral-300 cursor-pointer">
              Enable announcement banner across site
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-primary hover:bg-[#d6b268] text-black font-semibold text-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </form>
    </div>
  );
}
