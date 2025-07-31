import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Statistic,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  message,
  Upload,
  Select,
  Table,
  Popconfirm,
  Spin,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarOutlined,
  LikeOutlined,
  ShareAltOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  LogoutOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import dayjs from "dayjs";
import axios from "axios";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [posts, setPosts] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const postsCollection = collection(db, "posts");
  const [form] = Form.useForm();

  // ✅ Real-time Fetch Posts
  useEffect(() => {
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Add / Update Post
  // ✅ Add / Update Post
  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (!values.date || !values.time) {
        message.error("Please select both date and time!");
        setLoading(false);
        return;
      }

      const newData = {
        title: values.title,
        platform: values.platform,
        time: `${values.date.format("DD MMM")} - ${values.time.format(
          "hh:mm A"
        )}`,
        media: fileList.length ? fileList[0].name : "No Media",
        date: values.date.toISOString(),
        timeVal: values.time.format("HH:mm"),
        createdAt: new Date(),
      };

      if (editMode) {
        const postRef = doc(db, "posts", editMode);
        await updateDoc(postRef, newData);
        message.success("✅ Post updated successfully!");
      } else {
        await addDoc(postsCollection, newData);
        message.success("✅ Post scheduled successfully!");

        // ✅ 🔥 Send data to Vercel backend API
        try {
          await axios.post(
            "https://content-scheduler.vercel.app/api/posts",
            newData
          );
          console.log("✅ Data also sent to backend API");
        } catch (apiErr) {
          console.error("⚠️ API Post Error:", apiErr);
        }
      }

      setFileList([]);
      setEditMode(null);
      setIsModalOpen(false);
      form.resetFields();

      // 🔥 Show custom animated toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Error:", err);
      message.error("❌ Error saving post");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Post
  const handleEdit = (record) => {
    setEditMode(record.key);
    form.setFieldsValue({
      title: record.title,
      platform: record.platform,
      date: record.date ? dayjs(record.date) : null,
      time: record.timeVal ? dayjs(record.timeVal, "HH:mm") : null,
    });
    setIsModalOpen(true);
  };

  // ✅ Delete Post
  const handleDelete = async (key) => {
    try {
      await deleteDoc(doc(db, "posts", key));
      message.success("🗑️ Post deleted!");
    } catch {
      message.error("❌ Error deleting post");
    }
  };

  // ✅ Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // ✅ Search Filter
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchText.toLowerCase())
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Media", dataIndex: "media", key: "media" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Delete this post?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f8f9fb,#eef2f7)",
        padding: "30px",
        position: "relative",
      }}
    >
      {/* ✅ Animated Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              background: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 999,
              fontWeight: "bold",
            }}
          >
            <CheckCircleOutlined /> Post Scheduled Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937" }}
        >
          ⚡ Dashboard
        </h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            placeholder="Search posts..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "200px" }}
          />
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltOutlined />}
            onClick={() => {
              setIsModalOpen(true);
              setEditMode(null);
              form.resetFields();
            }}
          >
            New Post
          </Button>
          <Button icon={<LogoutOutlined />} danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <Row gutter={20}>
        {[
          {
            title: "Scheduled Posts",
            value: posts.length,
            icon: <CalendarOutlined />,
          },
          { title: "Likes", value: 1245, icon: <LikeOutlined /> },
          { title: "Shares", value: 567, icon: <ShareAltOutlined /> },
          { title: "Total Reach", value: "45.6K", icon: <BarChartOutlined /> },
        ].map((stat, i) => (
          <Col xs={24} sm={12} md={6} key={i}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                style={{
                  background: "linear-gradient(135deg, #ffffffcc, #f9fafbcc)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.icon}
                />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Post Table */}
      <Card
        style={{
          marginTop: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredPosts}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title={editMode ? "✏️ Edit Post" : "🚀 Schedule New Post"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditMode(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Post Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>
          <Form.Item
            name="platform"
            label="Select Platform"
            rules={[{ required: true }]}
          >
            <Select placeholder="Choose platform">
              <Select.Option value="Instagram">Instagram</Select.Option>
              <Select.Option value="Facebook">Facebook</Select.Option>
              <Select.Option value="Twitter">Twitter</Select.Option>
              <Select.Option value="YouTube">YouTube</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="media" label="Upload Media">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="date"
            label="Select Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="time"
            label="Select Time"
            rules={[{ required: true }]}
          >
            <TimePicker className="w-full" format="hh:mm A" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ background: "linear-gradient(90deg,#3b82f6,#2563eb)" }}
          >
            {loading ? <Spin /> : editMode ? "Update Post" : "Schedule Post"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;
