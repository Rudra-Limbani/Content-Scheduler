import { useState } from "react";
import { Form, Input, Button, Card, message, Divider } from "antd";
import { motion } from "framer-motion";
import { LockOutlined, UserOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Handle Email/Password Login
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      login(user.accessToken, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "User",
      });

      message.success("✅ Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login(user.accessToken, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });

      message.success("✅ Google Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error("❌ Google login failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298, #6dd5ed)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <Card
          style={{
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            borderRadius: "12px",
          }}
          title={
            <h2 style={{ textAlign: "center", margin: 0, color: "#1e40af" }}>
              🚀 Welcome Back
            </h2>
          }
        >
          <p style={{ textAlign: "center", marginBottom: "20px", color: "#64748b" }}>
            Sign in to continue managing your content
          </p>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email Address"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{
                background: "linear-gradient(90deg,#3b82f6,#2563eb)",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Form>

          <Divider>OR</Divider>

          <Button
            block
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            size="large"
            style={{ backgroundColor: "#db4437", color: "white" }}
          >
            Sign in with Google
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}

export default LoginPage;
