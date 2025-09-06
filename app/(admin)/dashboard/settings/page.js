"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    logo_url: "",
    orgName: "",
    banner_url: "",
    bannerTitle: "",
    bannerSubtitle: "",
    phone: "",
    email: "",
    address: "",
  });

  const [settingsId, setSettingsId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
          throw error;
        }

        if (data) {
          setSettingsId(data.id);
          setFormData({
            logo_url: data.logo_url || "",
            orgName: data.org_name || "",
            banner_url: data.banner_url || "",
            bannerTitle: data.banner_title || "",
            bannerSubtitle: data.banner_subtitle || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
          });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        setMessage("Error fetching settings: " + err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const uploadFile = async (file) => {
    if (!file || !(file instanceof File)) {
      console.error("No file or invalid file object provided to uploadFile.");
      return null;
    }

    const fileFormData = new FormData();
    fileFormData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: fileFormData,
    });

    if (!response.ok) {
      const apiError = await response.json();
      throw new Error(apiError.error || "File upload failed.");
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      let uploadedLogoUrl = formData.logo_url;
      let uploadedBannerUrl = formData.banner_url;

      // Only upload if new files are selected
      if (formData.logo instanceof File) {
        uploadedLogoUrl = await uploadFile(formData.logo);
      }
      if (formData.banner instanceof File) {
        uploadedBannerUrl = await uploadFile(formData.banner);
      }

      const dataToSave = {
        org_name: formData.orgName,
        logo_url: uploadedLogoUrl,
        banner_url: uploadedBannerUrl,
        banner_title: formData.bannerTitle,
        banner_subtitle: formData.bannerSubtitle,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
      };

      let supabaseResponse;
      if (settingsId) {
        // Update existing entry
        supabaseResponse = await supabase
          .from("site_settings")
          .update(dataToSave)
          .eq("id", settingsId);
      } else {
        // Insert new entry
        supabaseResponse = await supabase
          .from("site_settings")
          .insert([dataToSave])
          .select();

        if (supabaseResponse.data && supabaseResponse.data.length > 0) {
          setSettingsId(supabaseResponse.data[0].id);
        }
      }

      if (supabaseResponse.error) {
        throw new Error(supabaseResponse.error.message);
      }

      console.log("Saved Data to Supabase:", supabaseResponse.data);
      setMessage("Settings saved successfully!");
    } catch (error) {
      console.error("Save Error:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1B4332] mb-8">Settings</h1>
      {message && (
        <div className={`p-4 mb-4 rounded-lg ${message.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Logo & Org Name (Full Width) */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Logo
              </label>
              {formData.logo_url && (
                <div className="mb-4">
                  <img src={formData.logo_url} alt="Current Logo" className="h-20 w-auto rounded-lg" />
                </div>
              )}
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332] file:text-white hover:file:bg-green-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                placeholder="Enter organization name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Banner Fields (Full Width) */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Banner Image
              </label>
              {formData.banner_url && (
                <div className="mb-4 ">
                  <img src={formData.banner_url} alt="Current Banner" className="w-full rounded-lg h-60" />
                </div>
              )}
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332] file:text-white hover:file:bg-green-800"
              />
            </div>

            {/* Banner Title & Subtitle (Two Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  name="bannerTitle"
                  value={formData.bannerTitle}
                  onChange={handleChange}
                  placeholder="Enter banner title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  name="bannerSubtitle"
                  value={formData.bannerSubtitle}
                  onChange={handleChange}
                  placeholder="Enter banner subtitle"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Info (Two Columns) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Address (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              rows={3}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-0">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#1B4332] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );

}