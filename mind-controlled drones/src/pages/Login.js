// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

export function Login({ notion, user, setUser, setDeviceId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function onLogin({ email, password, deviceId }) {
    if (email && password && deviceId) {
      setError("");
      setEmail(email);
      setPassword(password);
      setDeviceId(deviceId);
    } else {
      setError("Please fill the form");
    }
  }

  return (
    <LoginForm onLogin={onLogin} loading={isLoggingIn} error={error} />
  );
}
useEffect(() => {
    if (!user && notion && email && password) {
      login();
    }
  
    async function login() {
      setIsLoggingIn(true);
      const auth = await notion
        .login({ email, password })
        .catch(error => {
          setError(error.message);
        });
  
      if (auth) {
        setUser(auth.user);
      }
  
      setIsLoggingIn(false);
    }
  }, [email, password, notion, user, setUser, setError]);