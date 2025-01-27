// import React from "react";
// import { CloseOutlined } from "@ant-design/icons";
// import { Button, Card, Form, Input, Typography, Select } from "antd";
// type Props = {};

// const TidingFormInsert: React.FC<Props> = () => {
//   const [form] = Form.useForm();

//   const handleChange = (value: string) => {
//     console.log(`selected ${value}`);
//   };

//   return (
//     <div>
//       <div className="py-5 border-t-2">
//         <h1 className="text-md font-semibold">Tiêu Đề Chính</h1>
//         <Input size="large" placeholder="" required />

//         <h1 className="text-md font-semibold mt-4 mb-1">Phân loại tin</h1>
//         <Select
//           defaultValue="economy"
//           style={{ width: `25%` }}
//           onChange={handleChange}
//           options={[
//             { value: "economy", label: "Kinh tế" },
//             { value: "society", label: "Xã hội" },
//             { value: "macro", label: "Vĩ mô" },
//           ]}
//         />
//       </div>
//       <Form
//         labelCol={{ span: 3 }}
//         wrapperCol={{ span: 20 }}
//         form={form}
//         name="dynamic_form_complex"
//         // style={{ maxWidth: 600 }}
//         autoComplete="off"
//         initialValues={{ items: [{}] }}
//       >
//         <Form.List name="items">
//           {(fields, { add, remove }) => (
//             <div
//               style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
//             >
//               {fields.map((field) => (
//                 <Card
//                   size="small"
//                   title={`Nội dung ${field.name + 1}`}
//                   key={field.key}
//                   extra={
//                     <CloseOutlined
//                       onClick={() => {
//                         remove(field.name);
//                       }}
//                     />
//                   }
//                 >
//                   <Form.Item name={[field.name, "name"]} label="Tiêu đề">
//                     <Input />
//                   </Form.Item>
//                   <Form.Item label="Nội dung" name={[field.name, "content"]}>
//                     <Input.TextArea rows={4} />
//                   </Form.Item>

//                   {/* Nest Form.List */}
//                   <Form.Item label="Đính kèm">
//                     <Form.List name={[field.name, "list"]}>
//                       {(subFields, subOpt) => (
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             rowGap: 16,
//                           }}
//                         >
//                           {subFields.map((subField) => (
//                             <div
//                               key={subField.key}
//                               className="flex flex-row gap-x-5"
//                             >
//                               <Form.Item
//                                 noStyle
//                                 name={[subField.name, "image"]}
//                               >
//                                 <Input placeholder="Link ảnh" />
//                               </Form.Item>

//                               <CloseOutlined
//                                 onClick={() => {
//                                   subOpt.remove(subField.name);
//                                 }}
//                               />
//                             </div>
//                           ))}
//                           <div className="flex flex-row gap-6">
//                             <Button
//                               type="dashed"
//                               onClick={() => subOpt.add()}
//                               block
//                             >
//                               + ảnh minh họa
//                             </Button>
//                             {/* <Button
//                               type="dashed"
//                               onClick={() => subOpt.add()}
//                               block
//                             >
//                               + nội dung
//                             </Button> */}
//                           </div>
//                         </div>
//                       )}
//                     </Form.List>
//                   </Form.Item>
//                 </Card>
//               ))}

//               <Button type="dashed" onClick={() => add()} block>
//                 + Thêm nội dung
//               </Button>
//             </div>
//           )}
//         </Form.List>

//         <Form.Item noStyle shouldUpdate>
//           {() => (
//             <Typography>
//               <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
//             </Typography>
//           )}
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default TidingFormInsert;
