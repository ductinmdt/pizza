import { Form, Input, Select, Upload, Button, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProductStart } from "../../../Redux/actions/productAction";
import { toast } from "react-toastify";
import "./createProduct.scss";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { loadCategoryStart } from "../../../Redux/actions/categoryAction";

import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const randNumberId = () => {
  return 90000000 + Math.trunc(Math.random() * 900000);
};
const randNumberProductId = () => {
  return 1100000 + Math.trunc(Math.random() * 90000);
};

const CreateNewProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  let history = useHistory();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const onChange = ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];
    if (newImage && newImage.length > 0) {
      newImage[0].status = "success";
    }
    setFileList(newImage);
    setFile(file);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    dispatch(loadCategoryStart());
  }, []);

  const createSuccess = () => history.push("/admin/products")
  const onFinish = (data) => {
    let formData = new FormData();
    if (file && file.originFileObj) {
      formData.append("file", file?.originFileObj);
    }
    formData.append("cd", data?.cd);
    formData.append("productName", data?.productName);
    formData.append("description", data?.description);
    formData.append("priceNew", data?.priceNew);
    data?.priceOld && formData.append("priceOld", data?.priceOld);
    formData.append("stock", data?.stock);
    formData.append("category_id", data?.category_id);
    formData.createSuccess = createSuccess

    if (!data) return;
    dispatch(createProductStart(formData));
    // history.push("/admin/products")
    // setTimeout(() => history.push("/admin/products"), 500);
    // toast.success("Tài khoản đã được thêm thành công!!");
  };
  return (
    <>
      <TopPage title="Quản lý sản phẩm" title1="Thêm mới sản phẩm" />
      <div className="backa-admin">
        <span
          className="back-admin-user"
          onClick={() => {
            history.push("/admin/products");
          }}
        >
          <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
        </span>
      </div>
      <h5 className="text-uppercase text-center mt-4">thêm mới sản phẩm</h5>
      <div className="container my-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-12">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="cd"
                label="Mã sản phẩm"
                rules={[
                  {
                    type: "text",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập mã sản phẩm!",
                  },
                ]}
              >
                <Input placeholder="Mã sản phẩm *" />
              </Form.Item>
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[
                  {
                    type: "text",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập Tên sản phẩm!",
                  },
                ]}
              >
                <Input placeholder="Tên sản phẩm *" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập miêu tả!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Mô tả sản phẩm *" />
              </Form.Item>
              <Form.Item
                name="priceNew"
                label="Giá mới"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập giá mới!",
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} placeholder="Giá mới *" />
              </Form.Item>
              
              <Form.Item name="priceOld" label="Giá cũ">
                <InputNumber style={{ width: '100%' }} placeholder="Giá cũ *" />
              </Form.Item>
              <Form.Item
                name="stock"
                label="Số lượng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng!",
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }}  placeholder="Số lượng *" />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn danh mục!",
                  },
                ]}
              >
                <Select placeholder="Chọn danh mục *">
                  {categories &&
                    categories.map((item, index) => {
                      return (
                        <Option key={index} value={item.id}>
                          {item.categoryName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                // valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập hình ảnh!",
                  },
                ]}
              >
                <Upload
                  fileList={fileList}
                  listType="picture"
                  maxCount={1}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Form.Item>
              <div className="submit-create">
                <button htmlType="submit">Tạo mới</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewProduct;
