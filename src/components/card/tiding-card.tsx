import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import { createRoot } from "react-dom/client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { TextArea } = Input;
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

interface Props {
  title: string;
  img: string;
}

const TidingCard: React.FC<Props> = ({ title, img }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-52 p-1 m-2 border-2 backdrop-blur-md bg-white rounded-md drop-shadow-lg overflow-hidden">
      <div className="relative">
        <img src={img} alt="" className="w-full h-32 object-fill opacity-95" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xs font-bold mt-2">{title}</h3>
        </div>
      </div>

      <div className="flex flex-row items-center justify-end mt-2 mb-1">
        <Button
          icon={<EditOutlined />}
          iconPosition="end"
          size="small"
          onClick={showModal}
          className="mx-2"
        >
          Chỉnh sửa
        </Button>
        <Button
          size="small"
          icon={<DeleteOutlined />}
          iconPosition="end"
        ></Button>
      </div>

      {/* Hiển thị chi tiết */}
      <Modal
        title="Thông tin bài đọc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginRight: 50 }}
        width={1600}
        height={600}
        footer={(_, { }) => (
          <div className="mt-4">
            <Button>Công khai bài đăng</Button>
            <Button className="mx-2">Cập nhật nội dung</Button>
          </div>
        )}
      >
        <div className="flex flex-row justify-between">
          <div className="w-1/2 mr-4">
            <TextArea
            rows={22}
              placeholder="maxLength is 6"
              maxLength={800}
            //   autoSize={{ minRows: 12, maxRows: 24 }}
            />
          </div>
          <div className="w-1/2">
            <h1 className="font-bold border-b-2">Preview</h1>
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TidingCard;
