import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Button,
  Table,
  Upload,
  Tabs,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Dayjs } from "dayjs"; // Import kiểu dữ liệu Dayjs nếu cần

const { TabPane } = Tabs;

// Data mẫu cho phần "Tài liệu báo cáo"
interface DocumentRecord {
  key: string;
  stt: number;
  name: string;
  date: string;
}

const initialDocuments = [
  {
    key: "1",
    stt: 1,
    name: "Báo cáo tài chính 2023",
    date: "2023-12-01",
  },
];

const CompanyTabListDetail: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documents, setDocuments] = useState(initialDocuments);
  const [newDocument, setNewDocument] = useState<{
    name: string;
    date: Dayjs | null;
  }>({
    name: "",
    date: null,
  });

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  // Xử lý thêm tài liệu
  const handleAddDocument = () => {
    if (newDocument.name && newDocument.date) {
      setDocuments([
        ...documents,
        {
          key: (documents.length + 1).toString(),
          stt: documents.length + 1,
          name: newDocument.name,
          date: newDocument.date?.format("YYYY-MM-DD"),
        },
      ]);
      setNewDocument({ name: "", date: null });
    }
  };

  // Xóa tài liệu
  const handleDeleteDocument = (key: string) => {
    setDocuments(documents.filter((doc) => doc.key !== key));
  };

  // Columns cho bảng tài liệu báo cáo
  const documentColumns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 100 },
    { title: "Tên tài liệu", dataIndex: "name", key: "name", width: 600 },
    { title: "Ngày đăng", dataIndex: "date", key: "date", width: 200 },
    {
      title: "Hành động",
      key: "action",
      render: (record: DocumentRecord) => (
        <div>
          <Button
            icon={<VerticalAlignBottomOutlined />}
            onClick={() => handleDeleteDocument(record.key)}
            className="m-2"
          >
            Tải xuống
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteDocument(record.key)}
          >
            Xóa
          </Button>
        </div>
      ),
      width: 300,
    },
  ];

  // Table columns for board members
  const [boardMembers, setBoardMembers] = useState<
    { avatar: string; name: string; position: string }[]
  >([]);
  const [newBoardMember, setNewBoardMember] = useState({
    avatar: "",
    name: "",
    position: "",
    yearStart: "",
  });
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text: string) => (
        <img src={text} alt="Avatar" className="w-10 h-10 rounded-full" />
      ),
    },
    { title: "Tên", dataIndex: "name" },
    { title: "Chức vụ", dataIndex: "position" },
    { title: "Năm bắt đầu", dataIndex: "yearStart" },
    {
      title: "Thao tác",
      key: "actions",
      width: "20%",
      render: (_: any, record: any) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => {}}>
          Xóa
        </Button>
      ),
    },
  ];

  // Handle adding a new board member
  const handleAddBoardMember = () => {
    if (newBoardMember.name && newBoardMember.position) {
      setBoardMembers([...boardMembers, newBoardMember]);
      setNewBoardMember({ avatar: "", name: "", position: "", yearStart: "" });
    }
  };

  return (
    <>
      <Tabs defaultActiveKey="1">
        {/* Mục 1: Thông tin cơ bản */}
        <TabPane tab="Thông tin cơ bản" key="1">
          <Form layout="vertical">
            <Form.Item label="Tên công ty">
              <Input placeholder="Nhập tên công ty" />
            </Form.Item>
            <Form.Item label="Mã công ty">
              <Input placeholder="Nhập mã công ty" />
            </Form.Item>
            <Form.Item label="Ngày thành lập">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Loại hình công ty">
              <Input placeholder="Nhập loại hình công ty" />
            </Form.Item>
            <Form.Item label="Logo công ty">
              <Upload name="logo" listType="picture">
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Địa chỉ công ty">
              <Input placeholder="Nhập địa chỉ công ty" />
            </Form.Item>
            <Form.Item label="Gmail công ty">
              <Input placeholder="Nhập Gmail công ty" />
            </Form.Item>
          </Form>
        </TabPane>

        {/* Mục 2: Ban lãnh đạo */}
        <TabPane tab="Ban lãnh đạo" key="2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ban lãnh đạo</h3>
            <div className="flex items-end gap-4">
              <Input
                placeholder="Avatar URL"
                value={newBoardMember.avatar}
                onChange={(e) =>
                  setNewBoardMember((prev) => ({
                    ...prev,
                    avatar: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Tên"
                value={newBoardMember.name}
                onChange={(e) =>
                  setNewBoardMember((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Chức vụ"
                value={newBoardMember.position}
                onChange={(e) =>
                  setNewBoardMember((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Năm bắt đầu"
                value={newBoardMember.yearStart}
                onChange={(e) =>
                  setNewBoardMember((prev) => ({
                    ...prev,
                    yearStart: e.target.value,
                  }))
                }
                className="w-1/3"
              />
              <Button type="primary" onClick={handleAddBoardMember}>
                Thêm
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={boardMembers}
              rowKey={(record) => `${record.name}-${record.position}`}
              pagination={false}
            />
          </div>
          {/* <Table
            columns={[
              { title: "Avatar", dataIndex: "avatar", key: "avatar" },
              { title: "Tên", dataIndex: "name", key: "name" },
              { title: "Chức vụ", dataIndex: "position", key: "position" },
            ]}
            dataSource={[]}
            pagination={false}
          /> */}
        </TabPane>

        {/* Mục 3: Thông tin niêm yết */}
        <TabPane tab="Thông tin niêm yết" key="3">
          <Form layout="vertical">
            <Form.Item label="Ngày giao dịch đầu tiên">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Giá giao dịch ngày đầu">
              <Input placeholder="Nhập giá giao dịch ngày đầu" />
            </Form.Item>
            <Form.Item label="Khối lượng niêm yết lần đầu">
              <Input placeholder="Nhập khối lượng niêm yết lần đầu" />
            </Form.Item>
            <Form.Item label="Khối lượng niêm yết hiện tại">
              <Input placeholder="Nhập khối lượng niêm yết hiện tại" />
            </Form.Item>
            <Form.Item label="Khối lượng cổ phiếu đang lưu hành">
              <Input placeholder="Nhập khối lượng cổ phiếu đang lưu hành" />
            </Form.Item>
          </Form>
        </TabPane>

        {/* Mục 4: Tài liệu báo cáo */}
        <TabPane tab="Tài liệu báo cáo" key="4">
          <div className="mb-4">
            <div className="flex flex-row">
              <Input
                placeholder="Tên tài liệu"
                value={newDocument.name}
                onChange={(e) =>
                  setNewDocument((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <DatePicker
                className="ml-2 w-80"
                onChange={(date) =>
                  setNewDocument((prev) => ({ ...prev, date }))
                }
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className="ml-2 w-52"
                onClick={handleAddDocument}
              >
                Thêm
              </Button>
            </div>
          </div>
          <Table
            columns={documentColumns}
            dataSource={documents}
            pagination={false}
          />
        </TabPane>

        {/* Mục 5: Dữ liệu cơ bản */}
        <TabPane tab="Chỉ số tài chính" key="5">
          <div></div>
          <div className="flex justify-between">
            <Button icon={<UploadOutlined />}>Báo cáo phân tích</Button>
            
          </div>
        </TabPane>
      </Tabs>
    </>
  );
};

export default CompanyTabListDetail;
