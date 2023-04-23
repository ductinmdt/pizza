import React, { useState, useEffect } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";
import "./createRole.scss"

import {loadRoleApi,
  createRoleApi,
  deleteRoleApi,
  getRoleById,
  updateRoleApi,} from '../../../apis/roleApi';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CreateNewRole = () => {
  const [form] = Form.useForm();
  let history = useHistory();


  const onFinish = async (data) => {
    try{
      const res = await createRoleApi(data)
      if(res?.data?.status === 201){
        toast.success(res?.data?.message)
        history.push("/admin/roles");
      }
    }catch(err){
      toast.error(err?.response?.data?.message)
    }
  };
  return (
    <>
      <TopPage
        title="Quản lý quyền"
        title1="Thêm quyền"
      />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/roles");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Back
      </span>
      <h5 className="text-uppercase text-center mt-3">thêm mới quyền</h5>
      <div className="container my-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-12">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="cd"
                label="Mã quyền"
                rules={[
                  {
                    required: true,
                    message: "Vùi lòng nhập mã quyền!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên quyền"
                rules={[
                  {
                    required: true,
                    message: "Vùi lòng tên quyền!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="submit-create">
                <button htmlType="submit">Tạo mới</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewRole;
