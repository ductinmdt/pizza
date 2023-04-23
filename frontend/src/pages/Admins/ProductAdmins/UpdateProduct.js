import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { Button, Form, Input, Select, Upload, InputNumber } from "antd";
import { getProductById } from "../../../apis/productApi";
import { useEffect } from "react";
import { loadCategoryStart } from "../../../Redux/actions/categoryAction";
import { updateProductStart } from "../../../Redux/actions/productAction";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
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
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 10,
      },
    },
  };

const UpdateProduct = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { categories } = useSelector((state) => state.categories);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    dispatch(loadCategoryStart());
  }, []);

  useEffect(() => {
    getDataById(id);
  }, [id]);
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

  const getDataById = async (id) => {
    try {
      const data = await getProductById(id);
      if (data) {
        form.setFieldsValue({
          productName: data?.data?.elements?.productName,
          description: data?.data?.elements?.description,
          priceNew: data?.data?.elements?.priceNew,
          priceOld: data?.data?.elements?.priceOld,
          category: data?.data?.elements?.category,
          cd: data?.data?.elements?.cd,
          stock: data?.data?.elements?.stock,
          category_id: data?.data?.elements?.category_id,
        });
        setFileList([
          {
            name: data?.data?.elements?.url,
            status: "done",
            url: data?.data?.elements?.url,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSuccess = () => history.push("/admin/products");

  const onFinish = (data) => {
    let dataValue = new FormData();
    if (file && file.originFileObj) {
      dataValue.append("file", file?.originFileObj);
    }
    dataValue.append("cd", data?.cd);
    dataValue.append("productName", data?.productName);
    dataValue.append("description", data?.description);
    dataValue.append("priceNew", data?.priceNew);
    data?.priceOld && dataValue.append("priceOld", data?.priceOld);
    dataValue.append("stock", data?.stock);
    dataValue.append("category_id", data?.category_id);

    if (!data) return;
    dispatch(updateProductStart({ id, dataValue, updateSuccess }));
    
    // setTimeout(() => history.push("/admin/products"), 500);
    // toast.success("Tài khoản đã được thêm thành công!!");
  };

  return (
    <>
      <TopPage title="Quản lý sản phẩm" title1="cập nhật sản phẩm" />
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
      <h5 className="text-uppercase text-center mt-4">cập nhật sản phẩm</h5>
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
              {/* <Form.Item
                name="id"
                label="ID"
                
              >
                <Input  disabled/>
              </Form.Item> */}
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
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Giá mới *"
                />
              </Form.Item>

              <Form.Item name="priceOld" label="Giá cũ">
                <InputNumber style={{ width: "100%" }} placeholder="Giá cũ *" />
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
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Số lượng *"
                />
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
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
