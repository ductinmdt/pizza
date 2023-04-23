import { Form, Input, Select, Upload, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUserAdminStart } from "../../../Redux/actions/userAdminAction";
import { toast } from "react-toastify";
import "./createNewUserAdmin.scss";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  loadRoleApi,
  createRoleApi,
  deleteRoleApi,
  getRoleById,
  updateRoleApi,
} from "../../../apis/roleApi";
const { Option } = Select;

const randNumberId = () => {
  return 900000 + Math.trunc(Math.random() * 90000);
};
const randNumberUserId = () => {
  return 100000 + Math.trunc(Math.random() * 90000);
};

const CreateNewUserAdmin = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [roleOption, setRoleOption] = useState();

  const selectOptions = (array) => {
    const list = [];
    for (let item of array) {
      list.push({
        value: item.id,
        label: item.name,
        cd: item.cd,
      });
    }
    return list;
  };

  const handleGetRole = async () => {
    try {
      const res = await loadRoleApi();
      if (res.status === 200) {
        setRoles(selectOptions(res?.data?.elements));
        // toast.success(res?.data?.message);
      }
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  useEffect(() => {
    handleGetRole();
  }, []);

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
  const registerSuccess = () => history.push("/admin/admins");
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

    dispatch(createUserAdminStart({dataValue,registerSuccess }));
    // if (dataValue.id === userAdmin.id) {
    //   dispatch(actLoginSuccess(dataValue));
    // }
    // toast.success("Update user success");
    // setTimeout(() => history.push("/admin/admins"), 500);
  };

  return (
    <>
      <TopPage title="Quản lý tài khoản" title1="Thêm mới tài khoản" />
      <div className="backa-admin mb-4">
        <span
          className="back-admin-user"
          onClick={() => {
            history.push("/admin/admins");
          }}
        >
          <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
        </span>
      </div>
      <h5 className="text-uppercase text-center mb-2">thêm mới tài khoản</h5>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-12">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              labelCol={{
                span: 6,
              }}
              initialValues={{
                birthday: "1970-01-01"
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
                  //   addonBefore={prefixSelector}
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
              {/* {roles === "admin" ? (
                <Form.Item
                  name="role"
                  label="Phân quyền"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn quyền!",
                    },
                  ]}
                >
                  <Select disabled placeholder="Vui lòng chọn phân quyền *">
                    <Option value="admin">Admin</Option>
                    <Option value="manage">Manage</Option>
                    <Option value="employee">Employee</Option>
                  </Select>
                </Form.Item>
              ) : (
                ""
              )} */}
              <Form.Item
                name="role_id"
                label="Phân quyền"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn quyền!",
                  },
                ]}
              >
                <Select
                  options={roles}
                  placeholder="Vui lòng chọn phân quyền *"
                ></Select>
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
                  //   {
                  //     pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                  //     message: "Ít nhât 1 Hoa,1 thường, 1 số, 8 ký tự)",
                  //   },
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
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
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

              <div className="submit-create">
                <button htmlType="submit" >
                  Tạo mới
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewUserAdmin;
