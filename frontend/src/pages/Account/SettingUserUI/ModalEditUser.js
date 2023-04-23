import React, { useState, useEffect } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { useDispatch } from "react-redux";
import { updateUserAdminStart } from "../../../Redux/actions/userAdminAction";
import { toast } from "react-toastify";
import { actLoginUI } from "../../../Redux/actions/actionAuthUser";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: "${label} không được để trống!",
  types: {
    email: "${label} không đúng định dạng!",
  },
};

const ModalEditUser = ({ profile, setVisible }) => {
  const [form] = Form.useForm();
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

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        fullname: profile.fullname,
        email: profile.email,
        birthday: moment(profile.birthday).format("YYYY-MM-DD"),
        address: profile.address,
        phone: profile.phone,
        gender: profile.gender,
        role: profile.role,
        id: profile.id,
      });
      setFileList([
        {
          name: profile.avatar,
          status: "done",
          url: profile.avatar,
        },
      ]);
    }
  }, []) && form.setFieldsValue({});
  const onFinish = (data) => {
    let dataValue = new FormData();
    if (file && file.originFileObj) {
      dataValue.append("avatar", file?.originFileObj);
    }
    dataValue.append("fullname", data?.fullname);
    dataValue.append("email", data?.email);
    dataValue.append("birthday", data?.birthday);
    dataValue.append("address", data?.address);
    dataValue.append("phone", data?.phone);
    dataValue.append("gender", data?.gender);
    // dataValue.append("role", data?.role);

    setTimeout(() => {
      dispatch(updateUserAdminStart({ id: profile.id, dataValue }));
    //   dispatch(actLoginUI(dataValue));
      // toast.success("Cập nhật thành công!!")
      setVisible(false);
    }, 500);
  };
  return (
    <div className="p-4">
      <Form
        {...layout}
        form={form}
        name="register"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        {/* <Form.Item name="id">
          <Input type="hidden" />
        </Form.Item> */}
        <Form.Item
          name="fullname"
          label="Họ và tên"
          rules={[
            {
              type: "text",
            },
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Input placeholder="Họ và tên *" />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              type: "text",
            },
          ]}
        >
          <Select placeholder="Vui lòng chọn giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Khác">Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Email không dúng định dạng",
            },
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Trường này không được để trống!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Mật khẩu *" />
                            </Form.Item> */}
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Input type="date" placeholder="Ngày sinh*" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Input placeholder="Địa chỉ *" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện Thoại"
          rules={[
            {
              required: true,
              message: "Trường này không được để trống!",
            },
          ]}
        >
          <Input placeholder="Số điện thoại *" />
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
                                name="education"
                                rules={[

                                    {
                                        type: "text",
                                        message: 'Vùi lòng chọn hình ảnh!',
                                    },
                                ]}
                            >
                                <Input placeholder="Trình độ học vấn" />
                            </Form.Item> */}
        

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <button className="btn btn-success" htmltype="submit">
            Chỉnh sửa
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalEditUser;
