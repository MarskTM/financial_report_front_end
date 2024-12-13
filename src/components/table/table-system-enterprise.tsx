import React, { useEffect, useState } from "react";
import { CompanyTabListDetail } from "@/components";
import { Table, Button, Modal, TablePaginationConfig } from "antd";
import type { TableColumnsType } from "antd";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import dayjs from "dayjs";

import * as api from "@/redux/api/company";
import { RootState } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";

import { CompanyInfo } from "@/redux/model/company";

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

const TableSystemEnterprise = ({}) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const companies = useSelector(
    (state: RootState) => state.company.listCompany
  );

  const [data, setData] = useState<Company[]>(() => {
    return companies.map<Company>((val, index) => ({
      key: index,
      stt: index + 1,
      name: val.company_name,
      stockCode: val.company_code,
      type: val.company_type,
      foundingDate: dayjs(val.establishment_date).format("DD/MM/YYYY"),
      createdAt: dayjs(val.created_at).format("DD/MM/YYYY"),
      taxCode: val.tax_code,
      website: val.company_website ? val.company_website : "-",
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

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const currentPage = pagination.current || 1; // Đảm bảo giá trị không undefined
    const pageSize = pagination.pageSize || 10; // Đảm bảo giá trị không undefinedi
    setCurrentPage(currentPage);
    setPageSize(pageSize);

    // console.log("Current Page:", currentPage);
    // console.log("Page Size:", pageSize);
    // console.log("Filters:", filters);
    // console.log("Sorter:", sorter);
  };

  const handleUpdateCompany = () => {
    // Update company data here
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    api.GetAllCompany(dispatch);
  }, []);

  // 
  useEffect(() => {
    setData(
      companies.map<Company>((val, index) => ({
        key: index,
        stt: index + 1,
        name: val.company_name,
        stockCode: val.company_code,
        type: val.company_type,
        foundingDate: dayjs(val.establishment_date).format("DD/MM/YYYY"),
        createdAt: dayjs(val.created_at).format("DD/MM/YYYY"),
        taxCode: val.tax_code,
        website: val.company_website ? val.company_website : "-",
      }))
    );
  }, [companies]);

  // Mô tả thông tin các cột dữ liệu của bảng danh sách doanh nghiệp
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
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"], // Các mốc số bản ghi
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        onChange={handleTableChange} // Gắn sự kiện onChange
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
        width={1400}
        style={{ marginRight: 200 }}
      >
        {selectedCompany && <CompanyTabListDetail />}
      </Modal>
    </div>
  );
};

export default TableSystemEnterprise;
