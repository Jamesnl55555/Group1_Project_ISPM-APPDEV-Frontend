/**
 * Quick Find & Replace Guide for SPA Conversion
 * 
 * Use these patterns in VS Code Find & Replace to quickly convert files
 */

// PATTERN 1: Remove Inertia imports
// Find: import { Head(, router)?(, useForm)?(, Link)? } from "@inertiajs/react";
// Replace: import { useNavigate } from "react-router-dom";\nimport axios from "@/api/axios";\nimport { useForm } from "@/hooks/useForm";

// PATTERN 2: Remove Head components
// Find: <Head title="[^"]*" />
// Replace: (delete entire line)

// PATTERN 3: Replace router.visit with navigate
// Find: router\.visit\(([^)]+)\)
// Replace: navigate($1)

// PATTERN 4: Replace router.post with axios.post
// Find: router\.post\(route\("([^"]+)"(?:,\s*(\{[^}]*\}))?\),\s*(\{[^}]*\})\)
// Replace: axios.post('/api/$1', $3)

// PATTERN 5: Replace route() function calls with direct URLs
// Find: route\("([^"]+)",?\s*(\w+)?\s*\)
// Replace: `/api/$1/${ $2 ? $2 : '' }` (needs manual adjustment)

// PATTERN 6: Convert useForm from Inertia
// Find: const { data, setData, post, processing, errors, reset } = useForm\(({[^}]+})\);
// Replace: const form = useForm($1);

// Then replace data with form.data, setData with form.setData, etc.

// ============================================
// QUICK CONVERSION FOR Report Pages
// ============================================

// For all files with just "Head" removal (no form changes):
// 1. Remove: import { Head } from "@inertiajs/react";
// 2. Remove: <Head title="..." />

// Files that ONLY need Head removal:
// - GenerateSalesReportDaily.jsx
// - GenerateSalesReportWeekly.jsx
// - GenerateSalesReportMonthly.jsx
// - GenerateCapitalReportDaily.jsx
// - GenerateCapitalReportWeekly.jsx
// - GenerateCapitalReportMonthly.jsx
// - TransactionHistory.jsx
// - GenerateReport.jsx
// - Inventory2.jsx

// ============================================
// ROUTING UPDATES NEEDED
// ============================================

// Update src/App.jsx to include new routes:

export const newRoutes = [
  { path: "/edit-product/:id", element: <EditProduct /> },
  { path: "/add-product", element: <AddProduct /> },
  // ... add other routes as pages are converted
];

// ============================================
// PROFILE PAGE CONVERSIONS
// ============================================

// These need full conversion:
// src/Pages/Profile/Edit.jsx
// src/Pages/Profile/Partials/UpdateProfileInformationForm.jsx
// src/Pages/Profile/Partials/UpdatePasswordForm.jsx
// src/Pages/Profile/Partials/DeleteUserForm.jsx

// Template for UpdatePasswordForm.jsx:
/*
import { useForm } from "@/hooks/useForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useState } from "react";

export default function UpdatePasswordForm() {
  const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await form.put("/api/password");
      form.reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Update Password</h2>
      </div>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <InputLabel htmlFor="current_password" value="Current Password" />
          <TextInput
            id="current_password"
            type="password"
            value={form.data.current_password}
            onChange={(e) => form.setData("current_password", e.target.value)}
            autoComplete="current-password"
          />
          <InputError message={form.errors.current_password} />
        </div>
        <div>
          <InputLabel htmlFor="password" value="New Password" />
          <TextInput
            id="password"
            type="password"
            value={form.data.password}
            onChange={(e) => form.setData("password", e.target.value)}
            autoComplete="new-password"
          />
          <InputError message={form.errors.password} />
        </div>
        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            type="password"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData("password_confirmation", e.target.value)}
            autoComplete="new-password"
          />
          <InputError message={form.errors.password_confirmation} />
        </div>
        <div className="flex items-center gap-4">
          <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
          {form.recentlySuccessful && (
            <p className="text-sm text-green-600">Saved.</p>
          )}
        </div>
      </form>
    </section>
  );
}
*/
