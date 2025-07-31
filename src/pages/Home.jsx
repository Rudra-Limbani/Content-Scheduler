import React from "react";
import { Button } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ThunderboltOutlined,
  ScheduleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa, #e3f2fd)",
        padding: "50px 20px",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#1f2937" }}>
          🚀 Manage & Schedule Your Posts Like a Pro
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#4b5563",
            marginTop: "10px",
          }}
        >
          Upload, schedule, and auto-publish your content on multiple platforms
          effortlessly.
        </p>
        <Link to="/register">
          <Button
            type="primary"
            size="large"
            style={{
              marginTop: "20px",
              backgroundColor: "#3b82f6",
              borderColor: "#3b82f6",
              padding: "0 40px",
              fontWeight: "bold",
            }}
          >
            Get Started Free
          </Button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          padding: "0 10%",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <CloudUploadOutlined style={{ fontSize: "3rem", color: "#3b82f6" }} />
          <h3 style={{ marginTop: "15px" }}>Upload Once, Post Everywhere</h3>
          <p style={{ color: "#6b7280" }}>
            Share your images, videos, and captions to multiple social media
            platforms directly from one place.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <ScheduleOutlined style={{ fontSize: "3rem", color: "#10b981" }} />
          <h3 style={{ marginTop: "15px" }}>Smart Scheduling</h3>
          <p style={{ color: "#6b7280" }}>
            Plan your posts ahead of time, set the perfect date & time, and let
            automation handle publishing.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <ThunderboltOutlined style={{ fontSize: "3rem", color: "#f59e0b" }} />
          <h3 style={{ marginTop: "15px" }}>Analytics That Matter</h3>
          <p style={{ color: "#6b7280" }}>
            Get insights on your post reach, engagement, and performance
            statistics in real-time.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        <h2 style={{ fontSize: "2rem", fontWeight: "600" }}>
          Ready to level up your content game?
        </h2>
        <Link to="/login">
          <Button
            type="primary"
            size="large"
            style={{
              marginTop: "20px",
              backgroundColor: "#2563eb",
              borderColor: "#2563eb",
              padding: "0 40px",
              fontWeight: "bold",
            }}
          >
            Login Now
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
