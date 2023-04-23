import React from "react";
import { NavLink } from "react-router-dom";
import "./siderBarAdmin.scss";

const SiderBarAdmin = () => {
  return (
    <>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin" exact activeClassName="active">
            <i className="fas fa-home"></i>
            Trang chủ
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/admins" activeClassName="active">
            <i className="fas fa-users"></i>
            Người dùng
          </NavLink>
        </li>
        {/* <li className="nav-item">
                    <NavLink to="/admin/userUI" activeClassName="active">
                        <i className="fas fa-user-shield"></i>
                        khách hàng
                    </NavLink>
                </li> */}

        <li className="nav-item">
          <NavLink to="/admin/products" activeClassName="active">
            <i className="fas fa-carrot"></i>
            Sản phẩm
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/categories" activeClassName="active">
            <i className="fas fa-list-ul"></i>
            Danh mục
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/orders" activeClassName="active">
            <i className="fas fa-check"></i>
            Đơn hàng
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/banners" activeClassName="active">
            <i className="far fa-image"></i>
            Banner
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink to="/admin/sliders" activeClassName="active">
            <i className="far fa-images"></i>
            Slider
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink to="/admin/comments" activeClassName="active">
            <i className="far fa-comments"></i>
            Bình luận
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/contacts" activeClassName="active">
          <i className="fas fa-comment-dots"></i>
            Phiếu Phản hồi
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/roles" activeClassName="active">
            <i className="fas fa-user-shield"></i>
            Phân quyền
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default SiderBarAdmin;
