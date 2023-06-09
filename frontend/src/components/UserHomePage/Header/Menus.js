import React, {useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo-dark.png";
import "./menu.scss";
import { loadCategoryStart } from "../../../Redux/actions/categoryAction";
import { useDispatch, useSelector } from 'react-redux';

const Menus = () => {
    const dispatch = useDispatch();

    const { categories } = useSelector(state => state.categories)
    useEffect(() => {
        dispatch(loadCategoryStart());
    }, []);

    return (
        <div className="menu-top">
            <div className="container">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="navbar-logo col-md-3">
                        <Link to="/" >
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="menu col-md-8">
                        <ul id="mobile_menu" className="menu navbar">
                            <li><NavLink exact to="/" activeClassName="selected">
                                Trang chủ
                            </NavLink></li>
                            <li><NavLink to="/intro" activeClassName="selected">
                                Giới thiệu
                            </NavLink></li>
                            <li>
                                <NavLink to="/products" activeClassName="selected">
                                    Sản phẩm <i className="fas fa-caret-down"></i>
                                </NavLink>
                                <ul className="sub__menu">
                                    {categories.map(category => <li key={category.id}><Link to={`/products/${category?.id}`}>{category?.categoryName}</Link></li>)}
                                </ul>
                            </li>
                            <li><NavLink to="/news" activeClassName="selected">
                                Tin tức
                            </NavLink></li>
                            <li><NavLink to="/contacts" activeClassName="selected">
                                Liên hệ
                            </NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menus;
