import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { UploadOutlined } from "@ant-design/icons";
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
      span: 4,
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

const UpdateRole = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getDataById(id);
  }, [id]);

  const getDataById = async (id) => {
    try {
      const data = await getRoleById(id);
      if (data) {
        console.log('data :>> ', data);
        form.setFieldsValue({
          cd: data?.data?.elements?.cd,
          name: data?.data?.elements?.name,
          //   url: data?.data?.elements?.url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (data) => {
    try{
      console.log('data :>> ', data);
      const res = await updateRoleApi(id,data)
      if(res?.data?.status === 200){
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
        title1="Cập nhật quyền"
      />
      <span
        className="back-admin-user"
        onClick={() => {
          history.push("/admin/roles");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Back
      </span>
      <h5 className="text-uppercase text-center mt-3">Cập nhật quyền</h5>
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
                <button htmlType="submit">Cập nhật</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRole;
