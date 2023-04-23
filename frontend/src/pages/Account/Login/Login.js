import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { actLoginUI } from "../../../Redux/actions/actionAuthUser";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axiosApiInstance from "../../../untils/axiosClient";
import { toast } from "react-toastify";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";

const Login = () => {
  const [form] = Form.useForm();
  const { isLoading, notif, isLoggIn, profile } = useSelector(
    (state) => state.authUser
  );
  const {
    isLoading: isLoadingAdmin,
    notif: notifAdmin,
    isLoggIn: isLoggInAdmin,
    profile: profileAdmin,
  } = useSelector((state) => state.authAdmin);
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    dispatch(actLoginUI(values));
  };

  useEffect(() => {
    if (isLoggInAdmin && profileAdmin?.role?.cd === "admin") {
      // history.push("/admin");
      window.location.href = "/admin";
    } else if (isLoggIn && profile?.role?.cd === "user") {
      // history.push("/");
      window.location.href = "/";
    } else {
    }
  }, [isLoggIn, isLoggInAdmin]);
  const componentClicked = (e) => {
    console.log('e :>> ', e);
  }

  // if (isLoggIn) {
  //   return <Redirect to='/'></Redirect>
  // }

  // if(isLoggIn && profile?.role === 'admin'){
  //   return <Redirect to='/admin'></Redirect>
  // }else if(isLoggIn && profile?.role === 'user'){
  //   return <Redirect to='/'></Redirect>
  // }else{
  //   return
  // }

  const responseGoogle = async (response) => {
    try {
      console.log("response :>> ", response);
      const res = await axiosApiInstance.post("/auth/google-login", {
        tokenId: response.tokenId,
      });
      const dataUser = {
        username: res?.data?.elements?.user?.username,
        password: res?.data?.elements?.oldPassword,
      };
      dispatch(actLoginUI(dataUser));
      // setAuth({
      //   profile: res.data.elements.user,
      // });
      // localStorage.setItem("accessToken", res.data.elements.access_token);
      // localStorage.setItem("isLogged", true);
      // window.location.href = "/";
      // setLoading(false);
    } catch (err) {
      // enqueueSnackbar(err.response.data.message, { variant: "error" });
      toast.error(err.response.data.message);
    }
  };
  const responseFacebook = async (response) => {
    console.log('response :>> ', response);
    const { accessToken, userID } = response;
    try {
      const res = await axiosApiInstance.post("/auth/facebook-login", {
        accessToken,
        userID,
      });
      console.log('res :>> ', res);
      
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 form-register ">
          <div className="register__header">
            <h2>Đăng nhập</h2>
            <p>
              Nếu chưa có tài khoản, <Link to="/register">đăng ký tại đây</Link>
            </p>
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
              }}
              scrollToFirstError
            >
              <Form.Item
                name="username"
                // rules={[
                //   {
                //     type: 'email',
                //     message: 'E-mail example@gmail.com!',
                //   },
                //   {
                //     required: true,
                //     message: 'Vui lòng nhập email!',
                //   },
                // ]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>
              <span className="text-danger">{notif}</span>

              <button htmltype="submit" className="btn-register">
                Đăng nhập
              </button>
            </Form>
          </div>
          <div className="register__footer">
            <p>Hoặc đăng nhập bằng</p>
            <div className="row">
              <div className="col-6">
                <GoogleLogin
                  clientId="856481487114-a5l7ot4ooenqavjt40mtk8enfafs6bmi.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  // className={"btn-google"}
                  buttonText="GOOGLE"
                />
              </div>
              <div className="col-6">
                <FacebookLogin
                  appId="1088597931155576"
                  fields="name,email,picture"
                  autoLoad={false}
                  callback={responseFacebook}
                  textButton="Facebook"
                  icon="fa-facebook"
                  size="medium"
                />
              </div>
            </div>
            <div className="register__footer--btn"></div>
            {/* <div className="icon-login">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
