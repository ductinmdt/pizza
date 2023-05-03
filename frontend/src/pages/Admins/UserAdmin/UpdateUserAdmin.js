import React, { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Button } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdminById } from "../../../apis/userApi";
import { updateUserAdminStart } from "../../../Redux/actions/userAdminAction";
import { toast } from "react-toastify";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import "./updateUserAdmin.scss";
import { changePasswordStart } from "../../../Redux/actions/userAdminAction";

import {
  actGetProfile,
  actLogin,
  actLoginSuccess,
} from "../../../Redux/actions/actionAuthAdmin";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import {
  loadRoleApi,
} from "../../../apis/roleApi";
const { Option } = Select;

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

const UpdateUserAdmin = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();
  const [roles, setRoles] = useState();
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin")) || null;
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  const [roleOption, setRoleOption] = useState();
  const { profile } = useSelector((state) => state.authAdmin);

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

  const onChange = ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];
    if (newImage && newImage.length > 0) {
      newImage[0].status = "success";
    }
    setFileList(newImage);
    setFile(file);
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

  const getDataById = async (id) => {
    try {
      const data = await getUserAdminById(id);
      if (data) {
        form.setFieldsValue({
          fullname: data?.elements?.user?.fullname,
          email: data?.elements?.user?.email,
          //   password: data?.elements?.user?.password,
          birthday: moment(data?.elements?.user?.birthday).format("YYYY-MM-DD"),
          address: data?.elements?.user?.address,
          phone: data?.elements?.user?.phone,
          // avatar: data?.elements?.user?.avatar,
          gender: data?.elements?.user?.gender,
          role_id: data?.elements?.user?.role_id,
          id: data?.elements?.user?.id,
        });
        setFileList([
          {
            name: data?.elements?.user?.avatar,
            status: "done",
            url: data?.elements?.user?.avatar,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // hanle update user
  const updateSuccess = () =>
    setTimeout(() => history.push("/admin/admins"), 500);
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
    dataValue.append("role_id", data?.role_id);

    dispatch(updateUserAdminStart({ id, dataValue, updateSuccess }));
  };

  const onFinishPassword = (data) => {
    const { password } = data;
    dispatch(changePasswordStart({ id, password, updateSuccess }));
  };
  //handle reset password
  const resetPassword = async (data) => {

  }

  useEffect(() => {
    getDataById(id);
    handleGetRole();
  }, [id]);
  return (
    <>
      <TopPage title="Quản lý tài khoản" title1="Cập nhật tài khoản" />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/admins");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
      </span>
      <h5 className="text-uppercase text-center mb-2 mt-3">
        cập nhật tài khoản
      </h5>
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-6">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              labelCol={{
                span: 8,
              }}
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
                  disabled={Number(id) === profile.id}
                  options={roles}
                  placeholder="Vui lòng chọn phân quyền *"
                ></Select>
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

              <div className="submit-create">
                <button>Cập nhật</button>
              </div>
            </Form>
          </div>
          <div className="col-md-6 col-6">
            {profile?.role?.cd === "admin" ? (
              <Form
                //  form={passwordForm}
                name="passwordForm"
                onFinish={onFinishPassword}
                scrollToFirstError
                labelCol={{
                  span: 8,
                }}
              >
                {/* <Form.Item
                  name="oldPassword"
                  label="Nhập mật khẩu cũ"
                  rules={[
                    {
                      required: true,
                      message: "Trường này không được để trống!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật khẩu *" />
                </Form.Item> */}
                <Form.Item
                  name="password"
                  label="Mật khẩu mới"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                    {
                      pattern:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                      message: "Ít nhât 1 Hoa,1 thường, 1 số, 8 ký tự)",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Vui lòng nhập mật khẩu mới" />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Xác nhận mật khẩu"
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
                          new Error("Mật khẩu không khớp!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Vui lòng xác nhận mật khẩu mới" />
                </Form.Item>
                <div className="submit-create">
                  <button>Cập nhật</button>
                </div>
              </Form>
            ) : (""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserAdmin;
