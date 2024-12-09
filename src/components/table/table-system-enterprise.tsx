import React, { useState } from "react";
import { CompanyTabListDetail } from "@/components";
import { Table, Button, Modal, Descriptions } from "antd";
import type { TableColumnsType } from "antd";

interface Company {
  key: React.Key;
  stt: number;
  name: string;
  stockCode: string;
  type: string;
  foundingDate: string;
  createdAt: string;
  taxCode: string;
  website: string;
}

interface Props {}

const TableSystemEnterprise = ({}) => {
  const [data] = useState<Company[]>(() => {
    return Array.from({ length: 14 }).map<Company>((_, i) => ({
      key: i,
      stt: i + 1,
      name: `Công ty ${i + 1}`,
      stockCode: `CT${i + 1}`,
      type: i % 2 === 0 ? "Cổ phần" : "TNHH",
      foundingDate: `2020-01-${i + 1}`,
      createdAt: `2023-01-${i + 1}`,
      taxCode: `123456789${i}`,
      website: `https://company${i + 1}.com`,
    }));
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleRowClick = (record: Company) => {
    setSelectedCompany(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleUpdateCompany = () => {
	// Update company data here
	
  };

  const columns: TableColumnsType<Company> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "center",
    },
    {
      title: "Doanh Nghiệp",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Mã CK",
      dataIndex: "stockCode",
      key: "stockCode",
      width: "10%",
      align: "center",
    },
    {
      title: "Loại Hình",
      dataIndex: "type",
      key: "type",
      width: "15%",
      align: "left",
    },
    {
      title: "Thành Lập",
      dataIndex: "foundingDate",
      key: "foundingDate",
      width: "15%",
      align: "center",
    },
    {
      title: "Vốn Hóa",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      align: "center",
    },
    {
      title: "Mã Số Thuế",
      dataIndex: "taxCode",
      key: "taxCode",
      width: "10%",
      align: "center",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: "10%",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400"
        >
          {text}
        </a>
      ),
    },
  ];

  return (
    <div>
      <Table<Company>
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="cursor-pointer"
      />

      {/* Modal hiển thị thông tin chi tiết */}
      <Modal
        title="Thông Tin Chi Tiết Doanh Nghiệp"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={
          <div>
            <Button className="mx-2" onClick={handleUpdateCompany}>
              Cập nhật
            </Button>
            <Button type="primary" onClick={handleModalClose}>
              Đóng
            </Button>
          </div>
        }
        width={1200}
      >
        {selectedCompany && <CompanyTabListDetail />}
      </Modal>
    </div>
  );
};

export default TableSystemEnterprise;
