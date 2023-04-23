import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/NotFound.js/NotFound';
import {useHistory} from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { adminRouter } from './constants/adminRouters';
import PrivateRouter from './components/Router/PrivateRouter';
import React, { Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import { userRouter } from './constants/userRouters';
import { useDispatch, useSelector } from 'react-redux';
import LoginAdmin from './pages/Admins/LoginAdmin/LoginAdmin';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { actLogin } from './Redux/actions/actionAuthAdmin';
import { actLoginUI } from './Redux/actions/actionAuthUser';
import {refreshToken} from './apis/authApi';
import {
  actGetProfileUIFail,
  actGetProfileUISuccess,
  actLoginUIFail,
  actLoginUISuccess,
  actSetLoadingUISuccess,
} from "./Redux/actions/actionAuthUser";
import {
  actGetProfileFail,
  actGetProfileSuccess,
  actLoginFail,
  actLoginSuccess,
  actSetLoadingSuccess,
} from "./Redux/actions/actionAuthAdmin";

function App() {
  const dispatch = useDispatch()
  const userAdmin = JSON.parse(localStorage.getItem('userAdmin')) || null;
  const userUI = JSON.parse(localStorage.getItem('userUI')) || null;
  const isLogged = JSON.parse(localStorage.getItem('isLogged')) || null;
  const authAdmin = useSelector(state => state.authAdmin)
  const isAuthAdmin = authAdmin.isAuthenticated
  const history = useHistory();

  const refreshToken = async () => {
    try {
      console.log('call refresh token :>> ');
      let res = await refreshToken();
      if (res.data.status === 200) {
        localStorage.setItem("accessToken", res.data.elements.access_token);
      } 
    } catch (error) {
      // setError(error.res.data.message);
      console.log(error);
    }
  };

  

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  // useEffect(() => {
  //   console.log('userAdmin :>> ', userAdmin);
  //   console.log('userUI :>> ', userUI);
  //   console.log('isLogged :>> ', isLogged);
  //   if (userAdmin && isLogged) {
  //     history.push('/admin')
  //     // window.location.href = "/admin"
  //   }
  //   if (userUI && isLogged) {
  //     // window.location.href = "/"
  //     history.push('/')
  //   }
  // }, [])

  return (
    <>
      <Suspense fallback={<div><Spin /></div>}>
        <Router>
          <Switch>
            {adminRouter.map((route, index) => {
              const Component = route.component;
              return (
                <Route
                  key={index}
                  exact={route.isExact}
                  path={route.path}
                  render={() => (
                    <PrivateRouter isAuthAdmin={isAuthAdmin}>
                      <Component />
                    </PrivateRouter>
                  )}
                >
                </Route>
              )
            })}

            {userRouter.map((route, index) => {
              const Component = route.component;
              return (
                <Route
                  key={index}
                  exact={route.isExact}
                  path={route.path}
                  render={() => (
                    <DefaultLayout >
                      <Component />
                    </DefaultLayout>
                  )}
                >
                </Route>
              )
            })}
            <Route exact path='/admin/login'>
              <LoginAdmin />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
