# SPA Conversion - Priority Task List

## 🎯 PRIORITY 1: IMMEDIATE (Already Done ✅)

These files are already converted and working:
- ✅ src/api/axios.js - CSRF + Token handling
- ✅ src/hooks/useForm.js - New form hook
- ✅ src/Pages/Auth/Login.jsx
- ✅ src/Pages/Auth/Register.jsx
- ✅ src/Pages/Auth/ForgotPassword.jsx
- ✅ src/Pages/Auth/ResetPassword.jsx
- ✅ src/Pages/Auth/VerifyEmail.jsx
- ✅ src/Pages/Auth/ConfirmPassword.jsx
- ✅ src/Pages/QA/EditProduct.jsx
- ✅ src/Pages/Reports/Inventory1.jsx
- ✅ src/Pages/Reports/TransactionRecord.jsx
- ✅ src/App.jsx (routes updated)
- ✅ src/Layouts/PrivateRoute.jsx
- ✅ src/Layouts/AuthenticatedLayout.jsx

---

## 🚀 PRIORITY 2: QUICK WINS (5-10 min each)

### Simple Head Removal Only (No form changes needed)
Files that just need `import { Head }` and `<Head title="..."/>` removed:

1. **src/Pages/SalesReports/GenerateSalesReportDaily.jsx**
   - Action: Remove Head import and component
   - Keep: All styling and JSX as-is

2. **src/Pages/SalesReports/GenerateSalesReportWeekly.jsx**
   - Action: Remove Head import and component

3. **src/Pages/SalesReports/GenerateSalesReportMonthly.jsx**
   - Action: Remove Head import and component

4. **src/Pages/CapitalReports/GenerateCapitalReportDaily.jsx**
   - Action: Remove Head import and component

5. **src/Pages/CapitalReports/GenerateCapitalReportWeekly.jsx**
   - Action: Remove Head import and component

6. **src/Pages/CapitalReports/GenerateCapitalReportMonthly.jsx**
   - Action: Remove Head import and component

7. **src/Pages/QA/TransactionHistory.jsx**
   - Action: Remove Head import and component
   - Check: May need data fetching with axios

8. **src/Pages/QA/GenerateReport.jsx**
   - Action: Remove Head import and component

9. **src/Pages/Reports/Inventory2.jsx**
   - Action: Remove Head import and component

---

## ⚡ PRIORITY 3: MEDIUM TASKS (15-20 min each)

### Pages with router.visit (Convert to useNavigate)

1. **src/Pages/Reports/TransactionDetails.jsx**
   - Changes:
     - Add `import { useNavigate } from "react-router-dom"`
     - Replace `router.visit()` with `navigate()`
     - Remove Inertia imports

2. **src/Pages/Reports/SalesReport.jsx**
   - Changes:
     - Add `import { useNavigate } from "react-router-dom"`
     - Replace all `router.visit()` calls
     - Remove Head import

3. **src/Pages/Reports/GenerateSalesReport.jsx**
   - Changes:
     - Replace `router.visit()` with `navigate()`
     - Remove Head import
     - Check route() function usage

4. **src/Pages/Reports/GenerateCapitalReport.jsx**
   - Changes:
     - Replace `router.visit()` with `navigate()`
     - Remove Head import

5. **src/Pages/SalesReports/GenerateSalesReportCustom.jsx**
   - Changes:
     - Replace `router.visit()` with `navigate()`
     - Remove Head import

6. **src/Pages/CapitalReports/GenerateCapitalReportCustom.jsx**
   - Changes:
     - Replace `router.visit()` with `navigate()`
     - Remove Head import

---

## 🔧 PRIORITY 4: MAJOR CONVERSIONS (20-30 min each)

### Pages with Forms (router.post → useForm)

1. **src/Pages/QA/AddProduct.jsx**
   - Changes:
     - Replace Inertia useForm with SPA useForm
     - Replace router.post with form.post
     - Replace router.visit with navigate()
     - Keep all styling as-is

2. **src/Pages/QA/MakeTransaction.jsx**
   - Changes:
     - Replace router.post and router.visit
     - Add useEffect for data loading if needed
     - Update form handling

---

## 👤 PRIORITY 5: PROFILE PAGES (30-40 min total)

### Profile Management (useForm Conversion)

1. **src/Pages/Profile/Edit.jsx**
   - Main profile editing page
   - Needs: useNavigate, useForm, data fetching

2. **src/Pages/Profile/Partials/UpdateProfileInformationForm.jsx**
   - Needs: Convert useForm to SPA version
   - Endpoint: PUT /api/profile

3. **src/Pages/Profile/Partials/UpdatePasswordForm.jsx**
   - Needs: Convert useForm to SPA version
   - Endpoint: PUT /api/password

4. **src/Pages/Profile/Partials/DeleteUserForm.jsx**
   - Needs: Convert form and delete request
   - Endpoint: DELETE /api/user

---

## 📍 PRIORITY 6: FINAL TOUCHES (10-15 min each)

1. **src/Pages/TransactionRecSection.jsx**
   - Replace router.visit() with navigate()
   - Remove Head import

2. **src/Pages/AddItem.jsx**
   - Check for Inertia usage
   - Update if needed

3. **src/Pages/CapitalReport.jsx**
   - Check for Inertia usage
   - Update if needed

4. **src/Layouts/GuestLayout.jsx**
   - Remove any Inertia imports
   - Keep styling intact

---

## 🎓 CONVERSION QUICK REFERENCE

### Pattern 1: Simple Navigation Change
```jsx
// BEFORE
import { router } from "@inertiajs/react";
onClick={() => router.visit("/path")}

// AFTER
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
onClick={() => navigate("/path")}
```

### Pattern 2: Form with useForm
```jsx
// BEFORE
import { useForm } from "@inertiajs/react";
const { data, setData, post, processing } = useForm({...});
post(route("endpoint"), {...});

// AFTER
import { useForm } from "@/hooks/useForm";
const form = useForm({...});
await form.post("/api/endpoint");
```

### Pattern 3: Data Fetching
```jsx
// ADD TO EVERY PAGE THAT LOADS DATA
import { useEffect } from "react";
import axios from "@/api/axios";

useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get('/api/endpoint');
      setData(response.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  fetch();
}, []);
```

---

## ✅ Completion Checklist

- [ ] Priority 2 completed (Head removal)
- [ ] Priority 3 completed (router.visit conversions)
- [ ] Priority 4 completed (AddProduct, MakeTransaction)
- [ ] Priority 5 completed (Profile pages)
- [ ] Priority 6 completed (Final pages)
- [ ] All routes added to App.jsx
- [ ] No Inertia imports remain in codebase
- [ ] All forms use new SPA useForm
- [ ] All navigation uses React Router
- [ ] Full system test passed
- [ ] All designs preserved
- [ ] All auth flows working

---

## 📊 Conversion Statistics

- **Total files affected**: ~35
- **Already converted**: 14 ✅
- **Quick wins (Head only)**: 9 (~45 min total)
- **Medium tasks**: 6 (~2 hours total)
- **Major conversions**: 2 (~1 hour total)
- **Profile pages**: 4 (~2 hours total)
- **Final touches**: 4 (~1 hour total)
- **TOTAL REMAINING TIME**: ~6-7 hours

---

## 🎯 Success = When All These Tests Pass:

1. Login → Register → Dashboard flow works
2. All navigation buttons work
3. All forms submit and save data
4. Editing product works with file upload
5. All protected routes redirect when needed
6. Profile editing works
7. Logout clears auth and redirects
8. Page refresh maintains auth state
9. No console errors
10. All designs match original

