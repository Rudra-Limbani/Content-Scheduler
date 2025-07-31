import { useState } from "react";
import { Form, Input, Button, Card, message, Divider } from "antd";
import { motion } from "framer-motion";
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // ✅ Handle Email/Password Signup
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Set Display Name
      await updateProfile(user, { displayName: values.username });

      login(user.accessToken, {
        uid: user.uid,
        email: user.email,
        name: values.username,
      });

      message.success("🎉 Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error("⚠️ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login(user.accessToken, {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      });

      message.success("🎉 Google Sign Up Successful!");
      navigate("/dashboard");
    } catch (error) {
      message.error("⚠️ Google Signup Failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6a00, #ff9966, #f12711)",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <Card
          style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.2)", borderRadius: "12px" }}
          title={<h2 style={{ textAlign: "center", margin: 0 }}>🚀 Create Your Account</h2>}
        >
          <Form layout="vertical" onFinish={handleRegister}>
            <Form.Item name="username" rules={[{ required: true, message: "Enter username" }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Enter password" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Register
            </Button>
          </Form>

          <Divider>OR</Divider>

          <Button
            block
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignup}
            size="large"
            style={{ backgroundColor: "#db4437", color: "white" }}
          >
            Sign up with Google
          </Button>

          <div
            onClick={() => navigate("/login")}
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px",
              color: "#6b7280",
              cursor: "pointer",
            }}
          >
            Already have an account? <span style={{ color: "#ff4500" }}>Login</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default RegisterPage;
