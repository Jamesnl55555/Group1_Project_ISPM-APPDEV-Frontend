// EditDeployedStyled.jsx
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit() {
  const [mustVerifyEmail] = useState(false);
  const [status] = useState(null);

  return (
    <AuthenticatedLayout
      header={
        <div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              lineHeight: 1.3,
              marginLeft: "5rem",
              WebkitTextStroke: ".8px #000000",
              backgroundImage: "linear-gradient(to bottom, #ec8845ff, #3b1f0d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            Profile Settings
          </h1>
          <p
            style={{
              marginLeft: "5rem",
              marginTop: "-2rem",
              fontSize: "0.875rem",
              color: "#4b5563",
              letterSpacing: "2px",
            }}
          >
            Manage your account information and security settings
          </p>
        </div>
      }
    >
      {/* Centered cards like testing version */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "64rem",
            gap: "2rem",
          }}
        >
          {/* PROFILE CARD */}
          <div
            style={{
              backgroundColor: "#fdf6ee",
              borderRadius: "1rem",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              padding: "2rem",
              border: "1px solid rgba(54,54,54,1)", // match testing
              width: "70rem",
              marginLeft: "-5rem",
              marginTop: "-2rem",
            }}
          >
            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
          </div>

          {/* PASSWORD CARD */}
          <div
            style={{
              backgroundColor: "#fdf6ee",
              borderRadius: "1rem",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              padding: "2rem",
              border: "1px solid rgba(54,54,54,1)", // match testing
              width: "70rem",
              marginLeft: "-5rem",
              marginTop: "1rem",
            }}
          >
            <UpdatePasswordForm />
          </div>

          {/* DELETE CARD */}
          <div
            style={{
              backgroundColor: "#fdf6ee",
              borderRadius: "1rem",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              padding: "2rem",
              border: "1px solid rgba(54,54,54,1)", // match testing
              width: "70rem",
              marginLeft: "-5rem",
              marginTop: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DeleteUserForm buttonClassName="w-32" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
