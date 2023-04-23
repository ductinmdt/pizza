import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCategoryStart } from "../../../Redux/actions/categoryAction";
import { getCategoryById } from "../../../apis/categoryApi";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";
// const storage = process.env.REACT_APP_BE + "/uploads/files/"
const storage = "http://localhost:9999/uploads/files/";
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

const UpdateCategory = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getDataById(id);
  }, [id]);

  const getDataById = async (id) => {
    try {
      const data = await getCategoryById(id);
      console.log("data: ", data);
      if (data) {
        form.setFieldsValue({
          categoryName: data?.data?.elements?.categoryName,
          description: data?.data?.elements?.description,
          //   url: data?.data?.elements?.url,
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

  const onFinish = (data) => {
    if (!data) return;
    let dataValue = new FormData();
    if (file && file.originFileObj) {
      dataValue.append("file", file?.originFileObj);
    }
    dataValue.append("categoryName", data?.categoryName);
    dataValue.append("description", data?.description);

    dispatch(updateCategoryStart({ id, dataValue }));
    setTimeout(() => history.push("/admin/categories"), 500);
  };
  return (
    <>
      <TopPage title="Quản lý danh mục sản phẩm" title1="Cập nhật danh mục" />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/categories");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
      </span>
      <h5 className="text-uppercase text-center mb-2">cập nhật danh mục</h5>
      <div className="form-container">
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
                message: "Please input your E-mail!",
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
                message: "Please input your description!",
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
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateCategory;
