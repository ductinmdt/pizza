import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCategoryStart } from "../../../Redux/actions/categoryAction";
import { toast } from "react-toastify";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";

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

const CreateNewCategory = () => {
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  const [form] = Form.useForm();
  let history = useHistory();
  const dispatch = useDispatch();

  const onChange = ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];
    if (newImage && newImage.length > 0) {
      newImage[0].status = "success";
    }
    setFileList(newImage);
    setFile(file)

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

  const onFinish = (data) => {
    let formData = new FormData();
    if (file && file.originFileObj) {
      formData.append("file", file?.originFileObj);
    }
    formData.append("categoryName", data?.categoryName);
    formData.append("description", data?.description);

    if (!data) return;
    dispatch(createCategoryStart(formData));
    history.push("/admin/categories")
    // setTimeout(() => history.push("/admin/categories"), 500);
    // toast.success("Danh mục được thêm thành công!!");
  };
  return (
    <>
      <TopPage
        title="Quản lý danh mục sản phẩm"
        title1="Thêm danh mục sản phẩm"
      />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/categories");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Back
      </span>
      <h5 className="text-uppercase text-center mt-3">thêm mới danh mục</h5>
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
                name="categoryName"
                label="Tên danh mục"
                rules={[
                  {
                    required: true,
                    message: "Vùi lòng nhập tên danh mục!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả!",
                  },
                ]}
              >
                <Input.TextArea />
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
              {/* <Form.Item
                                name="url"
                                label="Hình ảnh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đường dẫn hình ảnh!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> */}

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

export default CreateNewCategory;
