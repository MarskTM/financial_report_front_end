import React, { useState, useCallback, useEffect } from "react";
import {
  CloseOutlined,
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Card,
  Form,
  Typography,
  Select,
  Transfer,
  Modal,
  Table,
  Button,
  Input,
  Tooltip,
  Space,
  Tag,
  Checkbox,
} from "antd";
import type { TransferDirection } from "antd/es/transfer";
import { createStyles } from "antd-style";
import { TidingModel, TidingItem } from "@/redux/model/tiding";
import debounce from "lodash.debounce";

import * as api from "@/redux/api/tiding";
import { useDispatch } from "react-redux";

const useStyle = createStyles(({ css }) => ({
  customTable: css`
    .ant-table {
      height: 400px;
      .ant-table-container {
        height: 100%;
        .ant-table-body,
        .ant-table-content {
          scrollbar-width: thin;
          scrollbar-color: #eaeaea transparent;
          scrollbar-gutter: stable;
        }
        .ant-pagination {
          margin-top: auto;
        }
      }
    }
  `,
}));

const SystemTransferNewsApproval: React.FC = () => {
  const dispatch = useDispatch();
  const [tiding, setTiding] = useState<TidingModel>({} as TidingModel);
  const [sourceData, setSourceData] = useState<TidingItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const [selectedNews, setSelectedNews] = useState<TidingItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { styles } = useStyle();
  const [form] = Form.useForm();

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

  const debouncedSetTiding = useCallback(
    debounce((name: string, value: string) => {
      setTiding((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, 300),
    []
  );

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    debouncedSetTiding(name, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    debouncedSetTiding(name, value);
  };

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
            key="add"
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

  const handelUpdateTidings = async () => {
    if (tiding.id && tiding.id != 0) {
      await api.UpdateTiding(tiding, dispatch);
    } else {
      await api.InsertTiding(tiding, dispatch);
    }
    console.log(tiding);
  };

  const handelFormValueChanged = (_: any, allValues: any) => {
    setTiding(convertFormDataToTidingModel(allValues));
  };

  const convertFormDataToTidingModel = (formData: any): TidingModel => {
    return {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      images: formData.images?.map((img: any) => img.image),
      tidings: formData.items?.map((item: any) => ({
        id: item.id,
        title: item.sub_title,
        content: item.sub_content,
        images: item.sub_images?.map((img: any) => img.image),
      })),
      created_at: new Date(),
      updated_at: new Date(),
    };
  };

  const convertTidingModelToTidingItem = (
    tidings: TidingModel[]
  ): TidingItem[] => {
    return tidings.map((tiding) => ({
      key: tiding.id?.toString() || "",
      title: tiding.title || "",
      type: tiding.category || "",
      createdDate: tiding.created_at.toISOString(),
      updatedDate: tiding.updated_at.toISOString(),
      content: tiding.content || "",
    }));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    form.resetFields();
    setTiding({} as TidingModel);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.GetTidingList(dispatch);
      setSourceData(convertTidingModelToTidingItem(data));
    };
    fetchData();
  }, [dispatch]);

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

      <Modal
        title="Chi tiết bài đọc"
        style={{ marginRight: 140, marginTop: -40, marginBottom: 30 }}
        width={1450}
        height={700}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="update"
            onClick={handelUpdateTidings}
            className="mx-2 mt-3"
          >
            Cập nhật
          </Button>,
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        <div className="flex flex-row justify-between">
          <div className="w-1/2 mr-4">
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              form={form}
              name="tidings"
              autoComplete="off"
              initialValues={{ items: [{}] }}
              onValuesChange={handelFormValueChanged}
            >
              {" "}
              <div className="py-5 border-t-2">
                <h1 className="text-md font-semibold">Tiêu Đề Chính</h1>
                <Form.Item name="title" rules={[{ required: true }]}>
                  <Input
                    size="middle"
                    placeholder=""
                    required
                    onChange={handleInputChange}
                  />
                </Form.Item>
                <h1 className="text-md font-semibold mt-2 mb-1">
                  Phân loại tin
                </h1>
                <Form.Item
                  name="category"
                  rules={[{ required: true }]}
                  initialValue="economy"
                >
                  <Select
                    style={{ width: `25%` }}
                    onChange={(value) => handleSelectChange("category", value)}
                    options={[
                      { value: "economy", label: "Kinh tế" },
                      { value: "society", label: "Xã hội" },
                      { value: "macro", label: "Vĩ mô" },
                    ]}
                  />
                </Form.Item>
              </div>
              <Form.List name="items">
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      rowGap: 16,
                      flexDirection: "column",
                    }}
                    className="overflow-y-scroll max-h-[460px]"
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
                        <Form.Item
                          name={[field.name, "sub_title"]}
                          label="Tiêu đề"
                        >
                          <Input
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Nội dung"
                          name={[field.name, "sub_content"]}
                        >
                          <Input.TextArea
                            rows={4}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                        <Form.Item label="Đính kèm">
                          <Form.List name={[field.name, "sub_images"]}>
                            {(subFields, subOpt) => (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  rowGap: 16,
                                }}
                              >
                                {subFields.map((subField, subIndex) => (
                                  <div
                                    key={`${field.key}-${subIndex}`}
                                    className="flex flex-row gap-x-5"
                                  >
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "image"]}
                                    >
                                      <Input
                                        placeholder="Link ảnh"
                                        onChange={handleInputChange}
                                      />
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
              {/* <Form.Item noStyle shouldUpdate>
                {() => (
                  <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  </Typography>
                )}
              </Form.Item> */}
            </Form>
          </div>
          <div className="w-1/2 mt-2">
            {/* Live Preview */}
            <div className="p-4 border rounded-lg shadow-md min-h-[660px] overflow-y-scroll">
              <h2 className="text-xl font-bold mb-2">{tiding.title}</h2>
              <p className="text-gray-600 mb-4">{tiding.category}</p>
              <p className="mb-4">{tiding.content}</p>
              {tiding.images && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tiding.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`image-${index}`}
                      className="w-32 h-32 object-cover"
                    />
                  ))}
                </div>
              )}
              {tiding.tidings && (
                <div className="mt-10">
                  {tiding.tidings.map((subTiding, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {subTiding.title}
                      </h3>
                      <p className="mb-2">{subTiding.content}</p>
                      {subTiding.images && (
                        <div className="flex flex-wrap gap-2">
                          {subTiding.images.map((image, subIndex) => (
                            <img
                              key={subIndex}
                              src={image}
                              alt={`sub-image-${subIndex}`}
                              className="w-24 h-24 object-cover"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SystemTransferNewsApproval;
