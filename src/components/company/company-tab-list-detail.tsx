import React, { useEffect, useState } from "react";
import { CompanyTabExtract, CompanyTabExtractHistoryPrice } from "@/components";
import {
  // Modal,
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
import dayjs, { Dayjs } from "dayjs"; // Import kiểu dữ liệu Dayjs nếu cần
import { CompanyInfo, CompanyManagements } from "@/redux/model/company";
import { RootState } from "@/redux/Store";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;
const { TextArea } = Input;

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

interface Props {
  setUpdateCompany: React.Dispatch<React.SetStateAction<CompanyInfo>>;
}

const CompanyTabListDetail: React.FC<Props> = ({ setUpdateCompany }) => {
  // 1. variables
  const companyInfo = useSelector((state: RootState) => state.company.company);
  const [companyDetail, setCompanyDetail] = useState<CompanyInfo>();

  // -------------------------------------- thông tin tài liệu liên quan------------------------------------
  const [documents, setDocuments] = useState(initialDocuments);
  const [newDocument, setNewDocument] = useState<{
    name: string;
    date: Dayjs | null;
  }>({
    name: "",
    date: null,
  });

  // Thông tin cột danh sách tài liệu
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

  // -------------------------------------- thông tin ban lãnh đạo ------------------------------------------
  const [boardMembers, setBoardMembers] = useState<CompanyManagements[]>([]);
  const [newBoardMember, setNewBoardMember] = useState<CompanyManagements>({
    id: 0,
    company_id: 0,
    avatar: "",
    name: "",
    position: "",
    year_start: null,
  });

  // Thông tin cột danh sách ban lãnh đạo
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text: string) => (
        <img src={text} alt="Avatar" className="w-10 h-10 rounded-full" />
      ),
      width: 100,
    },
    { title: "Tên", dataIndex: "name", width: 220 },
    { title: "Chức vụ", dataIndex: "position", width: 200 },
    {
      title: "Năm bắt đầu",
      dataIndex: "year_start",
      width: 150,
      render: (year_start: Date) => {
        return year_start ? dayjs(year_start).format("DD/MM/YYYY") : "-";
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_: any, record: any, index: number) => (
        <Button
          type="link"
          className="w-10"
          onClick={() => handleDelete(index)} // Gọi hàm xóa với index
        >
          Xóa
        </Button>
      ),
      width: 100,
    },
  ];

  // 2. Handler
  // -------------------------------------- tài liệu liên quan------------------------------------
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

  const handleDeleteDocument = (key: string) => {
    setDocuments(documents.filter((doc) => doc.key !== key));
  };

  // -------------------------------------- ban lãnh đạo ------------------------------------------
  const handleAddBoardMember = () => {
    if (newBoardMember.name && newBoardMember.position) {
      setBoardMembers([...boardMembers, newBoardMember]);
      console.log(newBoardMember);
      setNewBoardMember(() => ({
        id: 0,
        company_id: 0,
        avatar: "",
        name: "",
        position: "",
        year_start: null,
      }));
    }
  };

  const handleDelete = (index: number) => {
    const updatedMembers = boardMembers.filter((_, i) => i !== index); // Loại bỏ thành viên theo index
    setBoardMembers(updatedMembers);
  };

  // ------------------------------------- Hàm xử lý cho các input và textarea ----------------------------------------------------------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Cập nhật dữ liệu lên component cha
    setUpdateCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------------- Hàm xử lý cho DatePicker ---------------------------------------------------------------
  const handleDateChange = (name: keyof CompanyInfo, date: Dayjs | null) => {
    setCompanyDetail((prev) => ({
      ...prev,
      [name]: date ? date.toISOString() : null,
    }));

    // Cập nhật dữ liệu lên component cha
    setUpdateCompany((prev) => ({
      ...prev,
      [name]: date ? date.toISOString() : null,
    }));
  };

  // 3. Effects
  useEffect(() => {
    setCompanyDetail(companyInfo); // Đồng bộ dữ liệu từ Redux
    setUpdateCompany((prev) => {
      return {
        ...prev,
        id: companyInfo.id || 0,
      };
    });
    setBoardMembers(companyInfo?.company_stakeholder || []); // Lấy dữ liệu ban lãnh dạo
  }, [companyInfo]);

  // 4. Render
  return (
    <div>
      <Tabs defaultActiveKey="1">
        {/* Mục 1: Thông tin cơ bản */}
        <TabPane tab="Thông tin cơ bản" key="1">
          <Form layout="vertical">
            <Form.Item label="Tên công ty">
              <Input
                placeholder="Nhập tên công ty"
                name="company_name"
                value={companyDetail?.company_name}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Mã công ty">
              <Input
                placeholder="Nhập mã công ty"
                name="company_code"
                value={companyDetail?.company_code}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Ngày thành lập">
              <DatePicker
                className="w-full"
                name="establishment_date"
                value={
                  companyDetail?.establishment_date
                    ? dayjs(companyDetail.establishment_date)
                    : null
                }
                onChange={(date) =>
                  handleDateChange("establishment_date", date)
                }
              />
            </Form.Item>
            <Form.Item label="Loại hình công ty">
              <Input
                placeholder="Nhập loại hình công ty"
                name="company_type"
                value={companyDetail?.company_type}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Logo công ty">
              <Upload name="logo" listType="picture">
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Địa chỉ công ty">
              <Input
                placeholder="Nhập địa chỉ công ty"
                name="company_address"
                value={companyDetail?.company_address}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Gmail công ty">
              <Input
                placeholder="Nhập Gmail công ty"
                name="company_email"
                value={companyDetail?.company_email}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Điện thoại công ty">
              <Input
                placeholder="Nhập điện thoại công ty"
                name="company_phone"
                value={companyDetail?.company_phone}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Website công ty">
              <Input
                placeholder="Nhập website công ty"
                name="company_website"
                value={companyDetail?.company_website}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Giới thiệu về công ty">
              <TextArea
                placeholder="Viết một đoạn giới thiệu ngắn về công ty"
                rows={5}
                name="company_description"
                value={companyDetail?.company_description}
                onChange={handleInputChange}
              />
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
              <DatePicker
                className="w-1/3"
                placeholder="Năm bắt đầu"
                value={newBoardMember.year_start}
                onChange={(date) =>
                  setNewBoardMember((prev) => ({
                    ...prev,
                    year_start: date, // Chuyển từ moment về Date
                  }))
                }
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
        </TabPane>

        {/* Mục 3: Thông tin niêm yết */}
        <TabPane tab="Thông tin niêm yết" key="3">
          <Form layout="vertical">
            <Form.Item label="Ngày giao dịch đầu tiên">
              <DatePicker
                className="w-full"
                name="first_trading_date"
                value={
                  companyDetail?.first_trading_date
                    ? dayjs(companyDetail.first_trading_date)
                    : null
                }
                onChange={(date) =>
                  handleDateChange("first_trading_date", date)
                }
              />
            </Form.Item>
            <Form.Item label="Giá giao dịch ngày đầu">
              <Input
                placeholder="Nhập giá giao dịch ngày đầu"
                name="first_trading_price"
                value={companyDetail?.first_trading_price}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Khối lượng niêm yết lần đầu">
              <Input
                placeholder="Nhập khối lượng niêm yết lần đầu"
                name="initial_listing_volume"
                value={companyDetail?.initial_listing_volume}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Khối lượng niêm yết hiện tại">
              <Input
                placeholder="Nhập khối lượng niêm yết hiện tại"
                name="current_listing_volume"
                value={companyDetail?.current_listing_volume}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Khối lượng cổ phiếu đang lưu hành">
              <Input
                placeholder="Nhập khối lượng cổ phiếu đang lưu hành"
                name="outstanding_shares"
                value={companyDetail?.outstanding_shares}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>
        </TabPane>

        {/* Mục 4: Tài liệu báo cáo */}
        <TabPane tab="Tài liệu báo cáo" key="4">
          <div className="mb-4">
            <div className="flex flex-row">
              <Input
                placeholder="Tên tài liệu"
                type="file"
                value={newDocument.name}
                onChange={(e) =>
                  setNewDocument((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
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

        {/* Mục 5: Dữ liệu tài chính*/}
        <TabPane tab="Dữ Liệu Tài Chính" key="5">
          <div className="flex justify-between">
            {/* <Button icon={<UploadOutlined />}>Báo cáo phân tích</Button> */}
            <CompanyTabExtract />
          </div>
        </TabPane>

        {/* Mục 5: Dữ liệu cơ bản */}
        <TabPane tab="Lịch Sử Giá" key="6">
          <div className="flex justify-between">
            <CompanyTabExtractHistoryPrice />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CompanyTabListDetail;
