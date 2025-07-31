import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, DatePicker, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

const PostScheduler = () => {
  const [fileList, setFileList] = useState([]);

  const handleFinish = (values) => {
    console.log("Scheduled Post:", values);
    message.success("✅ Post scheduled successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Card title="📅 Schedule a New Post">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item name="platform" label="Select Platform" rules={[{ required: true }]}>
            <Select placeholder="Choose platform">
              <Select.Option value="instagram">Instagram</Select.Option>
              <Select.Option value="facebook">Facebook</Select.Option>
              <Select.Option value="twitter">Twitter</Select.Option>
              <Select.Option value="youtube">YouTube</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="content" label="Post Content" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Write your post content..." />
          </Form.Item>

          <Form.Item label="Upload Media" name="media">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="scheduleTime"
            label="Select Date & Time"
            rules={[{ required: true }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(current) => current && current < dayjs().startOf("day")}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ background: "#ff6a00", border: "none" }}
          >
            Schedule Post
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default PostScheduler;
