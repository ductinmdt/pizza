import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { createBannerStart } from "../../../Redux/actions/bannerAction";
import "./bannerTop.scss";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const randNumberId = () => {
  return 40000 + Math.trunc(Math.random() * 500);
};
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

const CreateBannerTop = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
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
    let newBanner = new FormData();
    if (file && file.originFileObj) {
      newBanner.append("file", file?.originFileObj);
    }
    newBanner.append("title", data?.title);
    newBanner.append("description", data?.description);
    if (!data) return;
    dispatch(createBannerStart(newBanner));
    setTimeout(() => history.push("/admin/banners"), 500);
    // toast.success("Banner được thêm thành công!!");
  };

  return (
    <>
      <TopPage title="Quản lý banner" />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/banners");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
      </span>
      <h5 className="text-uppercase text-center mb-2">thêm mới banner</h5>
      <div className="form-container">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề hình!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Miêu tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập miêu tả!",
              },
            ]}
          >
            <Input />
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
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateBannerTop;
