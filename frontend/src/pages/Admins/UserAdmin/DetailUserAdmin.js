import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserAdminById } from '../../../apis/userApi';
import TopPage from '../../../layouts/AdminLayout/Toppage/TopPage';
import { Image } from 'antd';
import './detailsUserAdmin.scss'
import moment from 'moment';

const initialState = {
    fullname: "",
    email: "",
    passworld: "",
    birthday: "",
    address: "",
    phone: "",
    avatar: "",
    gender: ""
}

const DetailUserAdmin = () => {
    let history = useHistory();
    const [detailsUser, setDetailsUser] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        getDataUserId(id);
    }, [id])

    const getDataUserId = async (id) => {
        try {
            const data = await getUserAdminById(id);
            data && setDetailsUser({
                id: data?.elements?.user?.id,
                fullname: data?.elements?.user?.fullname,
                email: data?.elements?.user?.email,
                password: data?.elements?.user?.password,
                birthday: moment(data?.elements?.user?.birthday)?.format('YYYY-MM-DD'),
                address: data?.elements?.user?.address,
                phone: data?.elements?.user?.phone,
                avatar: data?.elements?.user?.avatar,
                gender: data?.elements?.user?.gender,
                role: data?.elements?.user?.role?.name
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <TopPage title="Quản lý tài khoản" title1="Chi tiết tài khoản" />
            <span className="back-admin-user " onClick={() => { history.push('/admin/admins') }}>
                <i className="fas fa-arrow-left"></i>&nbsp;
                Quay lại
            </span>
            <h5 className="text-uppercase text-center mb-2">chi tiết tài khoản</h5>

            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right pr-3">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <Image
                                width={250}
                                height={200}
                                src={detailsUser.avatar}
                            />
                            <h5 className="font-weight-bold text-uppercase mt-3">{detailsUser.fullname}</h5>
                            <span className="text-black-50">{detailsUser.role}</span>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label className="labels">Họ và tên</label>
                                    <input disabled type="text" className="form-control" placeholder="Họ và tên" value={detailsUser.fullname} />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="labels">Số điện thoại</label>
                                    <input disabled type="text" className="form-control" placeholder="Số điện thoại" value={detailsUser.phone} />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="labels">Địa chỉ</label>
                                    <input disabled type="text" className="form-control" placeholder="Địa chỉ" value={detailsUser.address} />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="labels">E-mail</label>
                                    <input disabled type="text" className="form-control" placeholder="E-mail" value={detailsUser.email} />

                                </div>
                                {/* <div className="col-md-12 mt-3">
                                    <label className="labels">Học vấn</label>
                                    <input disabled type="text" className="form-control" placeholder="Học vấn" value="" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 py-5">
                            <div className="col-md-12 mt-3">
                                <label className="labels">Giới tính</label>
                                <input disabled type="text" className="form-control" placeholder="Giới tính" value={detailsUser.gender} />
                            </div>
                            <div className="col-md-12 mt-3">
                                <label className="labels">Ngày sinh</label>
                                <input disabled type="date" className="form-control" placeholder="Ngày sinh" value={detailsUser.birthday} />
                            </div>
                        </div>
                        <Link to={`/admin/admins/edit/${detailsUser.id}`}>
                            <span className="profile-edit"><i className="fas fa-pencil-alt"></i> Chỉnh sửa</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailUserAdmin;