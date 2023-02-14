// src/components/LoginForm.js
import React, { useState } from "react";

export function LoginForm({ onLogin, loading, error }) {
  const [deviceId, setDeviceId] = useState(""); //idk 98bc594faa73a2afd9b68994988ab2f9
  const [email, setEmail] = useState(""); //bidoh@thinkglobalschool.com
  const [password, setPassword] = useState(""); //1f6d5a70c

  function onSubmit(event) {
    event.preventDefault();
    onLogin({ deviceId, email, password });
  }

  return (
    <form className="card login-form" onSubmit={onSubmit}>
      <h3 className="card-heading">Login</h3>
      {!!error ? <h4 className="card-error">{error}</h4> : null}
      <div className="row">
        <label>Notion Device ID</label>
        <input
          type="text"
          value={deviceId}
          disabled={loading}
          onChange={e => setDeviceId(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled={loading}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="row">
        <label>Password</label>
        <input
          type="password"
          value={password}
          disabled={loading}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="row">
        <button type="submit" className="card-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}