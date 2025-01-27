import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Form, Typography, Select } from "antd";
import { Transfer, Modal, Table, Button } from "antd";
import { Input, Tooltip, Space, Tag, Checkbox } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { TransferDirection } from "antd/es/transfer";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      height: 400px; /* Xét chiều cao cố định của bảng */
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

import { TidingModel, TidingItem } from "@/redux/model/tiding";


const SystemTransferNewsApproval: React.FC = () => {
  const initialNews: TidingItem[] = [
    {
      key: "1",
      title: "Tin tức 1",
      type: "Thời sự",
      createdDate: "2023-12-01",
      updatedDate: "2023-12-05",
      content: "Nội dung chi tiết của tin tức 1.",
    },
    {
      key: "2",
      title: "Tin tức 2",
      type: "Kinh tế",
      createdDate: "2023-12-02",
      updatedDate: "2023-12-06",
      content: "Nội dung chi tiết của tin tức 2.",
    },
    {
      key: "3",
      title: "Tin tức 3",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
    {
      key: "4",
      title: "Tin tức 4",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
    {
      key: "5",
      title: "Tin tức 5",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
    {
      key: "6",
      title: "Tin tức 7",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
    {
      key: "7",
      title: "Tin tức 7",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
    {
      key: "8",
      title: "Tin tức 8",
      type: "Giải trí",
      createdDate: "2023-12-03",
      updatedDate: "2023-12-07",
      content: "Nội dung chi tiết của tin tức 3.",
    },
  ];

  const [tiding, setTiding] = useState<TidingModel>({} as TidingModel);
  const [sourceData, setSourceData] = useState<TidingItem[]>(initialNews);
  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const [selectedNews, setSelectedNews] = useState<TidingItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { styles } = useStyle();

  const handleTransfer = (
    keys: React.Key[],
    direction: TransferDirection,
    moveKeys: React.Key[]
  ) => {
    if (direction === "right") {
      setTargetKeys([...targetKeys, ...moveKeys]);
    } else {
      setTargetKeys(targetKeys.filter((key) => !moveKeys.includes(key)));
    }
  };

  const handleViewDetails = (news: TidingItem) => {
    setSelectedNews(news);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setSourceData(sourceData.filter((item) => item.key !== key));
    setTargetKeys(targetKeys.filter((targetKey) => targetKey !== key));
  };

  const filterData = (data: TidingItem[]) =>
    data.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const renderTable = (
    data: TidingItem[],
    isTarget: boolean,
    isPublish: boolean
  ) => (
    <div>
      <div className="flex flex-row my-2">
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-3 rounded-r-md rounded-l-none border-none"
        />
        {!isPublish && (
          <Button
            key="close"
            onClick={() => setIsModalVisible(true)}
            className="mx-2"
          >
            <EditOutlined />
            Thêm mới
          </Button>
        )}
      </div>
      <Table
        dataSource={filterData(data)}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        columns={[
          {
            title: "",
            dataIndex: "key",
            render: (_: any, record: TidingItem) => (
              <Checkbox
                checked={isTarget ? targetKeys.includes(record.key) : false}
                onChange={() => {
                  const exists = targetKeys.includes(record.key);
                  if (exists) {
                    setTargetKeys((prevKeys) =>
                      prevKeys.filter((key) => key !== record.key)
                    );
                  } else {
                    setTargetKeys((prevKeys) => [...prevKeys, record.key]);
                  }
                }}
              />
            ),
            width: 40,
          },
          {
            title: "Stt",
            dataIndex: "key",
            render: (_: string, __: any, index: number) => index + 1,
            width: 60,
          },
          {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 250,
          },
          {
            title: "Loại tin",
            dataIndex: "type",
            render: (type: string) => <Tag color="blue">{type}</Tag>,
          },
          {
            title: "Cập nhật",
            dataIndex: "updatedDate",
          },
          {
            title: "Thao tác",
            render: (record: TidingItem) => (
              <Space>
                <Tooltip title="Xem chi tiết">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EyeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(record);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <Button
                    type="default"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(record.key);
                    }}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]}
        className={styles.customTable}
        scroll={{ y: 55 * 6 }}
      />
    </div>
  );

  // --------------------------------- modal handel -------------------------------
  const [form] = Form.useForm();


  const handelUpdateTidings = async () => {
    console.log(`New tidings: `, tiding);
  }

  const handelFormValueChanged = (changedValues: any, allValues: any) => {
    console.log("SubTitle:", changedValues.sub_title);
    setTiding((prev) => {
      return { ...prev, body: JSON.stringify(allValues, null, 2) };
    });
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-bold mb-4">Phê duyệt tin tức</h2>
      <Transfer
        dataSource={sourceData}
        targetKeys={targetKeys}
        onChange={handleTransfer}
        render={(item) => item.title}
        titles={["Tin tức cần duyệt", "Tin tức đã duyệt"]}
        operations={["Phê duyệt", "Hủy phê duyệt"]}
      >
        {({ direction }) =>
          direction === "left"
            ? renderTable(
                sourceData.filter((item) => !targetKeys.includes(item.key)),
                false,
                false
              )
            : renderTable(
                sourceData.filter((item) => targetKeys.includes(item.key)),
                true,
                true
              )
        }
      </Transfer>

      {/* Hiển thị chi tiết */}
      <Modal
        title="Chi tiết bài đọc"
        // open={isModalOpen}
        // onOk={handleOk}
        style={{ marginRight: 110 }}
        width={1500}
        height={600}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={handelUpdateTidings} className="mx-2">
            Cập nhật
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        <div className="flex flex-row justify-between">
          <div className="w-1/2 mr-4">
            <div className="py-5 border-t-2">
              <h1 className="text-md font-semibold">Tiêu Đề Chính</h1>
              <Input
                size="large"
                placeholder=""
                required
                onChange={(e) => {
                  setTiding((prev) => {
                    return { ...prev, title: e.target.value };
                  });
                }}
              />

              <h1 className="text-md font-semibold mt-4 mb-1">Phân loại tin</h1>
              <Select
                defaultValue="economy"
                style={{ width: `25%` }}
                onChange={(value) => {
                  setTiding((prev) => {
                    return { ...prev, category: value };
                  });
                }}
                options={[
                  { value: "economy", label: "Kinh tế" },
                  { value: "society", label: "Xã hội" },
                  { value: "macro", label: "Vĩ mô" },
                ]}
              />
            </div>
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              form={form}
              name="dynamic_form_complex"
              // style={{ maxWidth: 600 }}
              autoComplete="off"
              initialValues={{ items: [{}] }}
              onValuesChange={handelFormValueChanged}
            >
              <Form.List name="items">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Nội dung ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item name={[field.name, "sub_title"]} label="Tiêu đề">
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Nội dung"
                          name={[field.name, "content"]}
                        >
                          <Input.TextArea rows={4} />
                        </Form.Item>

                        {/* Nest Form.List */}
                        <Form.Item label="Đính kèm">
                          <Form.List name={[field.name, "list"]}>
                            {(subFields, subOpt) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  rowGap: 16,
                                }}
                              >
                                {subFields.map((subField) => (
                                  <div
                                    key={subField.key}
                                    className="flex flex-row gap-x-5"
                                  >
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "image"]}
                                    >
                                      <Input placeholder="Link ảnh" />
                                    </Form.Item>

                                    <CloseOutlined
                                      onClick={() => {
                                        subOpt.remove(subField.name);
                                      }}
                                    />
                                  </div>
                                ))}
                                <div className="flex flex-row gap-6">
                                  <Button
                                    type="dashed"
                                    onClick={() => subOpt.add()}
                                    block
                                  >
                                    + ảnh minh họa
                                  </Button>
                                  {/* <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + nội dung
                            </Button> */}
                                </div>
                              </div>
                            )}
                          </Form.List>
                        </Form.Item>
                      </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm nội dung
                    </Button>
                  </div>
                )}
              </Form.List>

              <Form.Item noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  </Typography>
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="w-1/2 -mt-6">
            <h1 className="font-bold border-b-2">Preview</h1>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SystemTransferNewsApproval;
