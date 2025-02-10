import React, { ChangeEvent, useState } from "react";
import { Modal, Input, Avatar, List } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/utils/route";
import { useDispatch } from "react-redux";
import * as api from "@/redux/api/company";

interface Props {}

const DataTest = [
  {
    id: 1,
    name: "Ngân hàng TMCP cổ phần Đầu tư và Phát triển Việt Nam",
    code: "BIDV-BID10117",
    avata:
      "https://image.bnews.vn/MediaUpload/Org/2022/04/26/logo-bidv-20220426071253.jpg",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "HOSE",
  },
  {
    id: 2,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 3,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
  {
    id: 4,
    name: "Công ty TNHH Bảo hiểm nhân thọ BIDV Metlife",
    code: "BIDVMetlife",
    avata: "",
    avata_alert: "BID",
    address: "123 Nguyen Trai, Hà Nội",
    phone: "0987654321",
    place: "",
  },
];

const DialogSearch: React.FC<Props> = ({}) => {
  const [keySearch, setKeySearch] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (id: number) => {
    setIsModalVisible(false);
    await api.GetCompanyByID(dispatch, id);
    navigate(ROUTE.ENTERPRISE_DETAIL.PATH);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    setKeySearch(value);
    if (!isModalVisible) {
      handleOpenModal();
    }
  };

  return (
    <div>
      <Input.Search
        placeholder="Type here..."
        value={keySearch}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        style={{ width: "100%" }}
      />
      <Modal
        title="Search"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Input.Search
          placeholder="Type here..."
          value={keySearch}
          onChange={(e) => setKeySearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <List
          itemLayout="horizontal"
          dataSource={DataTest.filter(
            (item) =>
              item.name.includes(keySearch) || item.code.includes(keySearch)
          )}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleClick(item.id)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <List.Item.Meta
                className="px-1"
                avatar={
                  <Avatar src={item.avata} alt={item.avata_alert}>
                    {item.avata_alert}
                  </Avatar>
                }
                title={item.name}
                description={`${item.code} | ${item.place}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default DialogSearch;
