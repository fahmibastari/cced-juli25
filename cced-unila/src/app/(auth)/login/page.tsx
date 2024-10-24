"use client";

import LoginPage from "./login1";

export default function Login() {
  const handleLogin = (email: string, password: string) => {
    console.log("Login attempt:", email, password);
    // Handle login logic here
  };

  return <LoginPage onLogin={handleLogin} />;
}
