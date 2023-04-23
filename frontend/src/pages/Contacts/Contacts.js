import React, { useState } from "react";
import "./Contacts.scss";
import { Button, Form, Input } from "antd";
import BreadCrumb from "../../components/UserHomePage/Main/BreadCrumb";
import { createContactApi } from "../../apis/contactApi";
import { toast } from "react-toastify";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const initialValues = {
  fullname: "",
  phone: "",
  email: "",
  description: "",
};
const defaultProps = {
  center: {
    lat: 16.0544563,
    lng: 108.0717219,
  },
  zoom: 11,
};

const Contacts = () => {
  const [form] = Form.useForm();
  const [center, setCenter] = useState({ lat: 16.0472002, lng: 108.2199588 });
  const { Search } = Input;

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const handleSelect = async (address) => {
    console.log("address :>> ", address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    console.log("latLng :>> ", latLng);
    setCenter(latLng);
  };

  const onFinish = async (values) => {
    try {
      const res = await createContactApi(values);
      if (res.data.status === 201) {
        toast.success(res?.data?.message);
        form.resetFields();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="contacts">
      <div className="container">
        <BreadCrumb title="Liên hệ" />
        <div className="row contacts-flex">
          <div
            className="col-md-6 d-md-block d-none"
            style={{ padding: "0px" }}
          >
            <Search
              placeholder="Nhập địa chỉ tìm kíêm"
              size="large"
              onSearch={handleSelect}
              style={{ marginBottom: "10px", width: 304 }}
            />
            <div className="googlemaps contacts-gmap ">
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  {...center}
                  text={
                    <i
                      class="fas fa-map-marker-alt"
                      style={{ color: "red", fontSize: "20px" }}
                    ></i>
                  }
                />
              </GoogleMapReact>
            </div>
          </div>
          <div className="contacts-form col-md-6 col-12">
            <h2>GỬI THÔNG TIN CHO CHÚNG TÔI</h2>
            <p>
              Hãy liên hệ ngay với chúng tôi để nhận được nhiều ưu đãi hấp dẫn
              dành cho bạn!
            </p>
            <div className="contacts-info">
              <div className="info-address info-flex">
                <i className="fas fa-map-marker info-icon "></i>
                <p className="info-title">Địa chỉ:</p>
                <p>
                  Tâng 6 toà nhà Ladeco, 266 Đội Cấn, phường Liễu Giai, Hà Nội
                </p>
              </div>
              <div className="info-email info-flex">
                <i className="fas fa-envelope email-icon info-icon "></i>
                <p className="info-title">Email:</p>
                <a href="mailto:Panpie@gmail.com">Panpie@gmail.com</a>
              </div>
              <div className="info-tel info-flex">
                <i className="fas fa-phone tel-icon info-icon"></i>
                <p className="info-title">Hotline:</p>
                <a className="fone" href="tel:19006750">
                  {" "}
                  1900 6750
                </a>
              </div>
            </div>
            <div className="contacts-form-bottom">
              <Form
                name="register"
                onFinish={onFinish}
                initialValues={initialValues}
                scrollToFirstError
                form={form}
              >
                <Form.Item
                  name="fullname"
                  rules={[
                    {
                      type: "text",
                      message: "Họ và tên không hợp lệ!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ]}
                >
                  <Input placeholder="Họ và tên *" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Email không hợp lệ!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập E-mail!",
                    },
                  ]}
                >
                  <Input placeholder="E-mail *" />
                </Form.Item>
                <Form.Item
                  name="phone"
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
                <Form.Item name="description">
                  <Input.TextArea
                    showCount
                    maxLength={100}
                    placeholder="Thêm ghi chú"
                  />
                </Form.Item>
                <Form.Item>
                  <button className="form-checkout-btn" htmltype="submit">
                    Gửi Thông Tin
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
