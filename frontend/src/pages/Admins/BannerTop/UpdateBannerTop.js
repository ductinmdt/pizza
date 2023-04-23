import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBannerStart } from "../../../Redux/actions/bannerAction";
import { getBannerById } from "../../../apis/bannerApi";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";

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
      offset: 8,
    },
  },
};


const UpdateBannerTop = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
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
      const data = await getBannerById(id);
      console.log("data :>> ", data);
      if (data) {
        form.setFieldsValue({
          title: data?.data?.elements?.title,
          description: data?.data?.elements?.description,
          // url: data?.data?.elements?.url
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

  const updateSuccess = () => history.push("/admin/banners");
  const onFinish = (data) => {
    let dataValue = new FormData();
    if (file && file.originFileObj) {
      dataValue.append("file", file?.originFileObj);
    }
    dataValue.append("title", data?.title);
    dataValue.append("description", data?.description);
    if (!dataValue) return;
    dispatch(updateBannerStart({ id, dataValue ,updateSuccess}));
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
      <h5 className="text-uppercase text-center mb-2">Cập nhật banner</h5>
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateBannerTop;
