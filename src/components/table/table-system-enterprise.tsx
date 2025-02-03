import React, { useEffect, useState } from "react";
import { CompanyTabListDetail } from "@/components";
import { Table, Button, Modal, TablePaginationConfig } from "antd";
import type { TableColumnsType } from "antd";

import { FormatNumberUI } from "@/utils/common";

import dayjs from "dayjs";

import * as api from "@/redux/api/company";
import * as reportApi from "@/redux/api/financial";

import { RootState } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import * as companySlice from "@/redux/slices/company_slice";
import * as reportSlice from "@/redux/slices/report_slice";
import { CompanyInfo } from "@/redux/model";

import { notify } from "@/utils/toast";

interface Company {
  key: React.Key;
  id: number;
  stt: number;
  name: string;
  stockCode: string;
  type: string;
  foundingDate: string;
  marketCapitalization: number;
  createdAt: string;
  taxCode: string;
  website: string;
}

const TableSystemEnterprise = ({}) => {
  // 1. Variables
  const dispatch = useDispatch();
  const companies = useSelector(
    (state: RootState) => state.company.listCompany
  );

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [data, setData] = useState<Company[]>(() => {
    return companies.map<Company>((val, index) => ({
      key: index,
      id: val.id ? val.id : 0,
      stt: index + 1,
      name: val.company_name ? val.company_name : "",
      stockCode: val.company_code ? val.company_code : "",
      type: val.company_type ? val.company_type : "",
      foundingDate: dayjs(val.establishment_date).format("DD/MM/YYYY"),
      createdAt: dayjs(val.created_at).format("DD/MM/YYYY"),
      marketCapitalization: val.market_capitalization
        ? val.market_capitalization
        : 0,
      taxCode: val.tax_code ? val.tax_code : "",
      website: val.company_website ? val.company_website : "-",
    }));
  });

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
      width: "10%",
      align: "center",
    },
    {
      title: "Vốn Hóa",
      dataIndex: "marketCapitalization",
      key: "marketCapitalization",
      width: "15%",
      align: "center",
      render: (text) => (
        <p
          className="text-right pr-2"
          rel="noopener noreferrer"
        >{`${FormatNumberUI(text)} vnđ`}</p>
      ),
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const defaultDataUpdate = {} as CompanyInfo;
  const [dataUpdate, setUpdateCompany] =
    useState<CompanyInfo>(defaultDataUpdate);

  // 2. Handler
  const handleRowClick = async (record: Company) => {
    setSelectedCompany(record);

    await api.GetCompanyByID(dispatch, record.id);
    await reportApi.GetCompanyReportData(dispatch, record.id);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    dispatch(companySlice.clearCompany());
    dispatch(reportSlice.clear());

    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination((pre) => ({
      current: pagination.current ? pagination.current : pre.current,
      pageSize: pagination.pageSize ? pagination.pageSize : pre.pageSize,
    }));

    // console.log("Current Page:", pagination.current);
    // console.log("Page Size:", pagination.pageSize);
    // console.log("Filters:", filters);
    // console.log("Sorter:", sorter);
  };

  const handleUpdateCompany = async () => {
    console.log("Update Company:", dataUpdate);
    if (dataUpdate.id && dataUpdate.id > 0) {
      await api.UpsertCompany(dataUpdate, dispatch);
      

      await api.GetAllCompany(dispatch);

      setUpdateCompany(defaultDataUpdate);
      setIsModalOpen(false);
    } else {
      notify("warning", "Cập nhật thất bại");
    }
  };

  // 3. Effects
  useEffect(() => {
    api.GetAllCompany(dispatch); // Fetch data from API when component mounts
  }, []);

  useEffect(() => {
    setData(
      companies.map<Company>((val, index) => ({
        key: index,
        id: val.id ? val.id : 0,
        stt: index + 1,
        name: val.company_name ? val.company_name : "",
        stockCode: val.company_code ? val.company_code : "",
        type: val.company_type ? val.company_type : "",
        foundingDate: dayjs(val.establishment_date).format("DD/MM/YYYY"),
        createdAt: dayjs(val.created_at).format("DD/MM/YYYY"),
        marketCapitalization: val.market_capitalization
          ? val.market_capitalization
          : 0,
        taxCode: val.tax_code ? val.tax_code : "",
        website: val.company_website ? val.company_website : "-",
      }))
    );
  }, [companies, dispatch]);

  return (
    <div>
      <Table<Company>
        columns={columns}
        dataSource={data}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50, 100], // Các mốc số bản ghi
          total: data.length,
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
        {selectedCompany && (
          <CompanyTabListDetail setUpdateCompany={setUpdateCompany} />
        )}
      </Modal>
    </div>
  );
};

export default TableSystemEnterprise;
