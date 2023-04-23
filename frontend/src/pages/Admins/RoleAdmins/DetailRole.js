import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRoleById } from '../../../apis/roleApi';
import TopPage from '../../../layouts/AdminLayout/Toppage/TopPage';
import '../UserAdmin/detailsUserAdmin.scss'
import "./detailRole.scss";

const initialState = {
    name: "",
    cd: "",
}

const DetailRole = () => {
    let history = useHistory();
    const [detailsRole, setDetailsRole] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        getDataRoleId(id);
    }, [id])

    const getDataRoleId = async (id) => {
        try {
            const data = await getRoleById(id);
            data && setDetailsRole({
                id: data?.data?.elements?.id,
                name: data?.data?.elements?.name,
                cd: data?.data?.elements?.cd,

            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <TopPage title="Quản lý quyền" title1="Chi tiết quyền" />
            <span className="back-admin-user " onClick={() => { history.push('/admin/roles') }}>
                <i className="fas fa-arrow-left"></i>&nbsp;
                Quay lại
            </span>
            <h5 className="text-uppercase text-center mb-2">Chi tiết quyền</h5>
            <div className="detail-container">
                <div className="detailUser px-3 pt-1">
                    <div className="detailRole ">
                        <img style={{marginRight: "20px", width: "400px"}} src={detailsRole.url} alt="" />
                    </div>
                    <div className="detailUser__info">
                        <h3>{detailsRole.name}</h3>
                        <p><span>ID:</span> {detailsRole.id}</p>
                        <p><span>Mã quyền:</span> {detailsRole.cd}</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailRole;