import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrderStart } from "../../../Redux/actions/orderAction";
import HistoryOrder from "../../../components/UserHomePage/HistoryOrder/HistoryOrder";
import { Modal, Image, Input, Form } from "antd";
import "./settingUi.scss";
import ModalEditUser from "./ModalEditUser";
import { actGetProfileUI } from "../../../Redux/actions/actionAuthUser";
import { changePasswordStart } from "../../../Redux/actions/userAdminAction";

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

const SettingUserUI = () => {
  const { profile } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const [visible, setVisible] = useState(false);
  const [isChangedPassword, setIsChangedPassword] = useState(false);
  const userUI = JSON.parse(localStorage.getItem("userUI")) || null;
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(loadOrderStart());
  }, []);

  useEffect(() => {
    if (userUI) {
      dispatch(actGetProfileUI(userUI));
    }
  }, []);

  const onFinish = (data) => {
    dispatch(changePasswordStart(data));
    setIsChangedPassword(false);
  };

  const orderUser = orders.filter((item) => item.user_id === profile.id);

  console.log('orderUser :>> ', orderUser);

  return (
    <div className="setting">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right pr-3">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <Image width={180} height={180} src={userUI?.avatar} />
              <h5 className="font-weight-bold text-uppercase mt-3">
                {userUI?.fullname}
              </h5>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3"></div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Họ và tên</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    value={userUI?.fullname}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">Số điện thoại</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={userUI?.phone}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">Địa chỉ</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Địa chỉ"
                    value={userUI?.address}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">E-mail</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="E-mail"
                    value={userUI?.email}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">Giới tính</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Giới tính"
                    value={userUI?.gender}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <label className="labels">Ngày sinh</label>
                  <input
                    disabled
                    type="date"
                    className="form-control"
                    placeholder="Ngày sinh"
                    value={userUI?.birthday}
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <span
                    className="profile-edit"
                    onClick={() => setVisible(true)}
                  >
                    <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="col-md-12 mt-3">
                <label className="labels">Mật khẩu</label>
                <input
                  disabled
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={userUI?.username}
                />
              </div>
              <div className="col-md-12 mt-3">
                <span
                  className="profile-edit"
                  onClick={() => setIsChangedPassword(true)}
                >
                  <i className="fas fa-pencil-alt"></i> Chỉnh sửa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <h4>Lịch sử đặt hàng</h4>
            <HistoryOrder orderUser={orderUser} />
          </div>
        </div>
        <div>
          <Modal
            title="Chỉnh sửa tài khoản"
            visible={visible}
            width={700}
            footer={null}
            onCancel={() => setVisible(false)}
          >
            <ModalEditUser setVisible={setVisible} profile={userUI} />
          </Modal>
          <Modal
            title="Thay đổi mật khẩu"
            visible={isChangedPassword}
            width={700}
            footer={null}
            onCancel={() => setIsChangedPassword(false)}
          >
            <div className="p-4">
              <Form
                {...layout}
                form={form}
                name="register"
                onFinish={onFinish}
                validateMessages={validateMessages}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <Form.Item
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
                </Form.Item>
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <button className="btn btn-success" htmltype="submit">
                    Lưu thay đổi
                  </button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SettingUserUI;
