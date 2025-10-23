import React, { useState } from "react";
import axios from "axios";

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await axios.post(
        "https://node-backend-tau-three.vercel.app/api/doc/login",
        formData
      );
      console.log("✅ Login Success:", res.data);
      setMessage("Login successful!");
      // optionally save token: localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setMessage("Login failed — check email/password");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Doctor Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    textAlign: "center",
  },
  heading: {
    color: "#F27405",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  button: {
    backgroundColor: "#F27405",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default DoctorLogin;
