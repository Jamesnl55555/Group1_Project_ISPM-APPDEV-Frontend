import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "@/api/axios";

export default function ConfirmRegistration() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (!token) return;

    axios
      .get(`/api/register/confirm?token=${token}`)
      .then((res) => {
        localStorage.setItem("auth_token", res.data.token);
        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/register?error=invalid-token");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Completing your registration...</h2>
    </div>
  );
}
