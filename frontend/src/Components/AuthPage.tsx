import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function handleSubmit() {
    if (mode === "signup") {
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });

        const data = await resp.json();
        console.log("signup response", data);
        if (!resp.ok || data.success !== "true") {
          throw new Error(data?.data?.message || "Signup failed");
        }

        console.log("signup response", data);

        // ✅ redirect after successful signup
        //navigate("/login"); // or "/dashboard"
        setMode("login");
      } catch (err) {
        console.error("signup failed", err);
      }
    } else {
      // login logic later
      console.log("login with", email, password);
      try {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await resp.json();
        console.log("login response", data);
        if (!resp.ok || data.success !== "true") {
          throw new Error(data?.data?.message || "Login failed");
        }

        console.log("login response", data);

        // ✅ redirect after successful signup
        navigate("/attend"); // or "/dashboard"
      } catch (err) {
        console.error("login failed", err);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm px-8 py-10">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-1">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-sm text-neutral-500 mb-6">
            {mode === "login"
              ? "Sign in to continue"
              : "Sign up to get started"}
          </p>

          <div className="space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />

            {mode === "signup" && (
              <input
                type="role"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-neutral-900 text-white py-2 text-sm font-medium hover:bg-neutral-800 transition"
            >
              {mode === "login" ? "Log in" : "Sign up"}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-neutral-500">
            {mode === "login" ? (
              <span>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-neutral-900 font-medium hover:underline"
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-neutral-900 font-medium hover:underline"
                >
                  Log in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
