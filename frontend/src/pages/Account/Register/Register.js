import React, { useState } from "react";
import "./Register.scss";
import { Form, Input, Select, Upload, Button } from "antd";
import { useDispatch } from "react-redux";
import { createUserUIStart } from "../../../Redux/actions/userUIAction";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import { createUserAdminStart } from "../../../Redux/actions/userAdminAction";

const randNumberId = () => {
  return 80000000 + Math.trunc(Math.random() * 9000000);
};
const randNumberUserId = () => {
  return 90000000 + Math.trunc(Math.random() * 9000000);
};
const { Option } = Select;
const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory();
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

  const registerSuccess = () => history.push("/login");
  

  const onFinish = (data) => {
    let dataValue = new FormData();
    if (file && file.originFileObj) {
      dataValue.append("avatar", file?.originFileObj);
    }
    dataValue.append("fullname", data?.fullname);
    dataValue.append("username", data?.username);
    dataValue.append("email", data?.email);
    dataValue.append("birthday", moment(data?.birthday));
    dataValue.append("address", data?.address);
    dataValue.append("phone", data?.phone);
    dataValue.append("gender", data?.gender);
    dataValue.append("password", data?.password);
    dataValue.append("role_id", 2);

    dispatch(createUserAdminStart({dataValue, registerSuccess}));
    // if (dataValue.id === userAdmin.id) {
    //   dispatch(actLoginSuccess(dataValue));
    // }
    // setTimeout(() => {
    //   dispatch(createUserUIStart(newUserUI));
    //   // toast.success("Đăng ký thành công!!");
    //   history.push("/login");
    // }, 2000);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 form-register ">
          <div className="register__header">
            <h2>Đăng Ký</h2>
            <p>Nếu bạn chưa có tài khoản, đăng ký tại đây</p>
          </div>
          <div className="register__form">
            <Form
              wrapperCol={{
                span: 26,
              }}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
                birthday: "1970-01-01"
              }}
              scrollToFirstError
              labelCol={{
                span: 6,
              }}
            >
              <Form.Item
                name="fullname"
                label="Họ tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ tên!",
                  },
                  {
                    min: 2,
                    message: "Tên không được ít hơn 2 ký tự!",
                  },
                  {
                    max: 30,
                    message: "Tên không được quá 30 ký tự!",
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
                label="Ngày sinh"
                name="birthday"
                // rules={[
                //   {
                //     required: true,
                //     message: "Trường này không được để trống!",
                //   },
                // ]}
              >
                <Input value="1970-01-01" type="date" placeholder="Ngày sinh*" />
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
                <Input placeholder="Vui lòng nhập địa chỉ" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="SĐT"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    min: 10,
                    message: "Số điện thoại ít nhất 10 số!",
                  },
                ]}
              >
                <Input
                  type={"number"}
                  placeholder="Vui lòng nhập số điện thoại"
                  addonBefore={prefixSelector}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Định dạng email chưa đúng",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập email " />
              </Form.Item>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                  {
                    min: 2,
                    message: "Tên không được ít hơn 2 ký tự!",
                  },
                  {
                    max: 30,
                    message: "Tên không được quá 30 ký tự!",
                  },
                ]}
              >
                <Input placeholder="Họ và tên *" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    message: "Ít nhât 1 Hoa,1 thường, 1 số, 8 ký tự)",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Vui lòng nhập mật khẩu" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Xác nhận MK"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "Mật khẩu không khớp!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                // valuePropName="fileList"
                // rules={[
                //   {
                //     required: true,
                //     message: "Vui lòng nhập hình ảnh!",
                //   },
                // ]}
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

              <button htmlType="submit" className="btn-register">
                Đăng Ký
              </button>
            </Form>
          </div>
          <div className="register__footer">
            <p>Hoặc đăng nhập bằng</p>
            <div className="register__footer--btn">
              <button className="btn-facebook">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </button>
              <button className="btn-google">
                <i className="fab fa-google-plus-g"></i>
                <span>Google</span>
              </button>
            </div>
            <div className="icon-login">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
