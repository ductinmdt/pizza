import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import BreadCrumb from "./../../components/UserHomePage/Main/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Image,
  Form,
  Input,
  Avatar,
  Badge,
  Radio,
  Space,
  Select,
  Modal,
  Result,
} from "antd";
import moment from "moment";
import provinces from "sub-vn";

import { useHistory, useLocation } from "react-router-dom";
import { deleteCart } from "../../Redux/actions/cartActions";
import "./Checkout.scss";
import { createOrderDetailApi } from "../../apis/orderDetailApi";
import { createPaymentURLApi, vnPayIpnApi } from "../../apis/OrderApi";
import {
  createOrderApi,
} from "../../apis/OrderApi";


const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 22,
    },
  },
};

//get province
const selectOptions = (array) => {
  const list = [];
  for (let item of array) {
    list.push({
      ...item,
      value: item.code,
      label: item.name,
    });
  }
  return list;
};

const Checkout = () => {
  const [form] = Form.useForm();
  const { cartProducts } = useSelector((state) => state.cartProducts);
  const totalPrice =
    cartProducts &&
    cartProducts.reduce((a, c) => a + c.quantity * c.priceNew, 0);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.authUser);
  const [value, setValue] = useState(1);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [isChange, setIsChange] = useState();
  const [resVNPayIpn, setResVNPayIpn] = useState();
  const buttonRef = useRef(null);
  const history = useHistory();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const vnp_TxnRef = params.get("vnp_TxnRef");
  const pending_payments =
    JSON.parse(localStorage.getItem("pending_payments")) || "";

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleGetVNPayIpn = async () => {
    const res = await vnPayIpnApi(location?.search);
    setResVNPayIpn(res?.data);
  };

  const handleCreateOrderDetail = async (data) => {
    await createOrderDetailApi(data);
  };
  const onFinish = async (values) => {
    setIsChange(true);
    try {
      // check payments terms
      if (!ward) {
        return;
      }
      if (cartProducts?.length === 0) {
        toast.error("Không có sản phẩm nào trong giỏ hàng");
        return;
      }
      if (vnp_ResponseCode === "00" && vnp_TxnRef !== pending_payments.cd) {
        toast.error("Đơn hàng không tồn tại");
        return;
      }
      if (resVNPayIpn?.RspCode !== "00" && vnp_ResponseCode === "00") {
        toast.error("Đơn hàng chưa được thanh toán");
        return;
      }
      console.log('values :>> ', values);
      // create random cd for order
      const date = new Date();
      const cd = moment(date).format("DDHHmmss");

      const order = {
        ...values,
        user_id: profile?.id,
        totalPrice,
        address: values?.address + ", " + ward?.full_name,
        status: "Chờ xác nhận",
        cartProducts: cartProducts,
        cd: vnp_TxnRef || cd,
        type_payment: resVNPayIpn?.RspCode === "00" ? 2 : 1,
      };


      // hanle payments
      if (value === 2) {
        localStorage.setItem(
          "pending_payments",
          JSON.stringify({
            address: values.address,
            phoneNumber: values.phoneNumber,
            note: values.note,
            province: province,
            district: district,
            ward: ward,
            cd: cd,
          })
        );

        const resPaymentURL = await createPaymentURLApi({
          amount: totalPrice,
          bankCode: "",
          orderId: cd,
        });
        window.location.href = resPaymentURL?.data?.elements;
      } else {
        //hanle checkout
        const newOrder = await createOrderApi(order);
        cartProducts.forEach((cartDetail) => {
          const newOrderDetail = {
            order_id: newOrder?.data?.elements?.id,
            product_id: cartDetail.id,
            quantity: cartDetail.quantity,
          };
          handleCreateOrderDetail(newOrderDetail);
        });
        dispatch(deleteCart());
        localStorage.removeItem("pending_payments");
        history.push("/checkout/success");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    if (profile) {
      if (vnp_ResponseCode !== null && pending_payments) {
        setProvince(pending_payments?.province);
        setDistrict(pending_payments?.district);
        setWard(pending_payments?.ward);

        form.setFieldsValue({
          ...pending_payments,
          fullname: profile.fullname,
        });
      } else {
        form.setFieldsValue({
          fullname: profile.fullname,
          email: profile.email,
          phoneNumber: profile.phone,
          description: profile.description,
        });
      }
    }
    if (vnp_ResponseCode !== null && vnp_ResponseCode !== "00") {
      toast.error("Thanh toán thất bại!!");
    }
    if (vnp_ResponseCode === "00") {
      handleGetVNPayIpn();
    }
  }, [profile]);

  useEffect(() => {
    if (
      resVNPayIpn?.RspCode === "00" &&
      form.getFieldValue("address") &&
      form.getFieldValue("phoneNumber")
    ) {
      buttonRef.current.click();
    }
    
  }, [resVNPayIpn]);

  return (
    <div className="checkout">
      <div className="container">
        <BreadCrumb title="Thanh toán" />
        <div className="row">
          <div
            className={
              vnp_ResponseCode === "00"
                ? "col-md-6  px-2 mb-5"
                : "col-md-4  px-2 mb-5"
            }
          >
            <h5>Đơn hàng</h5>
            {cartProducts &&
              cartProducts.map((item, index) => {
                return (
                  <div className="checkout-order" key={index}>
                    <div className="product-cart">
                      <div className="cart-img">
                        <Badge count={item.quantity}>
                          <Avatar
                            shape="square"
                            style={{
                              width: 70,
                              height: 70,
                            }}
                            src={<Image src={item.url} />}
                          />
                        </Badge>
                      </div>
                      <div className="product-info">
                        <p>{item.productName}</p>
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    </div>
                    <div className="product-price">
                      {Number(item.priceNew).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                  </div>
                );
              })}

            <div className="product-money">
              <div className="provisional">
                <p>Tạm tính</p>
                <p>
                  {Number(totalPrice).toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="fee">
                <p>Phí vận chuyển</p>
                <p>-</p>
              </div>
            </div>
            <div className="product-totalprice">
              <p>Tổng tiền</p>
              <p className="totalprice">
                {Number(totalPrice).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
          {vnp_ResponseCode !== "00" && (
            <div className="col-md-4 mb-5 payments">
              <h5>Hình thức thanh toán</h5>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Thanh toán khi nhận hàng.</Radio>
                  <Radio value={2}>Thanh toán qua VN-PAY</Radio>
                </Space>
              </Radio.Group>
            </div>
          )}
          <div className={vnp_ResponseCode === "00" ? "col-md-6" : "col-md-4"}>
            <h5>Thông tin khách hàng</h5>
            <Form
              {...formItemLayout}
              form={form}
              name="checkout"
              onFinish={onFinish}
              initialValues={{
                prefix: "86",
              }}
              // labelCol={{ span: 6 }}
              // wrapperCol={{ span: 16 }}
              // layout="horizontal"
              scrollToFirstError
            >
              <Form.Item name="fullname">
                <Input placeholder="Họ và tên *" disabled />
              </Form.Item>
              <Form.Item
                // label="Tỉnh thành"
                // name="pr"

                validateStatus={!province && isChange ? "error" : ""}
                help={!province && isChange ? "Vui lòng chọn tỉnh thành!" : ""}
              >
                <Select
                  value={province?.value}
                  placeholder="Chọn tỉnh thành"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={selectOptions(provinces.getProvinces())}
                  onChange={(event, option) => {
                    setProvince(option);
                  }}
                />
              </Form.Item>
              <Form.Item
                // label="Tỉnh thành"
                // name="pr"
                validateStatus={!district && isChange ? "error" : ""}
                help={!district && isChange ? "Vui lòng chọn quận huyện!" : ""}
              >
                <Select
                  value={district?.value}
                  placeholder="Chọn quận huyện"
                  allowClear
                  showSearch
                  disabled={!province}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={selectOptions(
                    provinces.getDistrictsByProvinceCode(province?.code)
                  )}
                  onChange={(event, option) => {
                    setDistrict(option);
                  }}
                />
              </Form.Item>
              <Form.Item
                validateStatus={!ward && isChange ? "error" : ""}
                help={!ward && isChange ? "Vui lòng chọn phường xã!" : ""}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phường xã!",
                  },
                ]}
              >
                <Select
                  value={ward?.value}
                  placeholder="Chọn phường xã"
                  allowClear
                  showSearch
                  disabled={!district}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={selectOptions(
                    provinces.getWardsByDistrictCode(district?.code)
                  )}
                  onChange={(event, option) => {
                    setWard(option);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="address"
                // label="Địa chỉ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ nhận hàng *" />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                // label="SĐT"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                  placeholder="Số điện thoại liên hệ *"
                />
              </Form.Item>
              <Form.Item name="note">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  placeholder="Thêm ghi chú"
                />
              </Form.Item>
              <span>Ship đồng giá 15.000 đ bán kính 5km!!</span>
              {/* {vnp_ResponseCode === null && (
                <span>Ship đồng giá 15.000 đ bán kính 5km!!</span>
              )} */}
              {/* {vnp_ResponseCode === "00" && (
                <span className="checkout-success">
                  Thanh toán thành công!!
                </span>
              )} */}
              {/* {vnp_ResponseCode !== null &&
                vnp_ResponseCode !== "00" && (
                  <span className="checkout-error">Thanh toán thất bại!!</span>
                )} */}

              <div className="btn-checkout">
                <button className="form-checkout-btn"  ref={buttonRef} htmltype="submit">
                  {value === 1 ? "Đặt hàng" : ""}
                  {value === 2 && vnp_ResponseCode !== "00" ? "Thanh toán" : ""}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
