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

import { ROUTE } from "@/utils/route";
import { useNavigate } from "react-router-dom";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      .ant-table-container {
        height: 100%; /* Đảm bảo container sử dụng toàn bộ chiều cao */
        .ant-table-body,
        .ant-table-content {
          scrollbar-width: thin;
          scrollbar-color: #eaeaea transparent;
          scrollbar-gutter: stable;
        }
        ,
        .ant-pagination {
          margin-top: auto; /* Đẩy phần phân trang xuống đáy */
        }
      }
    }
  `,
}));

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

const TableClientEnterprise = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { styles } = useStyle();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const companies = useSelector(
    (state: RootState) => state.company.listCompany
  );

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleRowClick = async (record: Company) => {
    setSelectedCompany(record);

    await api.GetCompanyByID(dispatch, record.id);
    await reportApi.GetCompanyReportData(dispatch, record.id);

    const detailPath = ROUTE.ENTERPRISE_DETAIL.PATH.replace(
      ":id",
      `${record.id}`
    );
    navigate(detailPath);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    dispatch(companySlice.clearCompany());
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

  const handleUpdateCompany = () => {
    // Update company data here
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    api.GetAllCompany(dispatch);
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
        className={styles.customTable}
      />
    </div>
  );
};

export default TableClientEnterprise;
