import React, { useEffect, useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import logo_mobile from '../../../assets/images/logo-dark.png';
import { Image } from 'antd';
import './menumobi.scss'
import { useDispatch, useSelector } from 'react-redux';
import { actGetProfileUI, actLogoutUI } from '../../../Redux/actions/actionAuthUser';

const MenuMobi = ({ showMenu }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { profile } = useSelector(state => state.authUser);
    const userUI = JSON.parse(localStorage.getItem('userUI')) || null;

    useEffect(() => {
        if (userUI) {
            dispatch(actGetProfileUI(userUI))
        }
    }, [])

    const handleLogout = () => {
        setTimeout(() => {
            dispatch(actLogoutUI())
            history.push('/')
        }, 1000)
    }

    return (
        <div className="mobil-container">
            <ul id="mobile_menu" className="mobile_menu">
                <div className="close-menu-mobi">
                    <span onClick={() => showMenu()}>X</span>
                </div>
                {userUI && userUI.isUser === true ? (
                    <li className="li-top">
                        <Image
                            width={50}
                            src={userUI.avatar}
                        />
                    </li>
                ) : (
                    <li className="li-top">
                        <img src={logo_mobile} alt="logo" />
                    </li>
                )}

                {userUI && userUI.isUser === true ? (
                    <div className="user-mobile">
                        <span className="fullname">{userUI.fullname}</span>
                    </div>
                ) : (
                    <div className="user-mobile">
                        <span><Link to="/login" >Đăng nhập</Link></span>
                        <span className="mx-2">/</span>
                        <span><Link to="/register" >Đăng ký</Link></span>
                    </div>
                )}
                <li><NavLink exact to="/" activeClassName="selected">
                    Trang chủ
                </NavLink></li>
                <li><NavLink to="/intro" activeClassName="selected">
                    Giới thiệu
                </NavLink></li>
                <li className="arrow" onClick={() => setVisible(!visible)}>
                    <a className="li-first">
                        <span>Sản phẩm</span> <i className="fas fa-caret-down"></i>
                    </a>
                    {visible &&
                        <ul className="sub-menu1">
                            <li><Link to="/products">Tất cả sản phẩm</Link></li>
                        </ul>
                    }
                </li>
                <li><NavLink to="/news" activeClassName="selected">
                    Tin tức
                </NavLink></li>
                <li><NavLink to="/contacts" activeClassName="selected">
                    Liên hệ
                </NavLink></li>
                {userUI && userUI.isUser === true && (
                    <>
                        <li><NavLink to="/userUI/settings" activeClassName="selected">
                            Tài khoản
                        </NavLink></li>
                        <li>
                            <a onClick={handleLogout}>
                                Đăng xuất
                            </a>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
};

export default MenuMobi;