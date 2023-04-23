import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopPage from '../../../layouts/AdminLayout/Toppage/TopPage';
// import { deleteCategoryStart, loadCategoryStart } from '../../../Redux/actions/categoryAction';
import { Popconfirm, Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {loadRoleApi,
    createRoleApi,
    deleteRoleApi,
    getRoleById,
    updateRoleApi,} from '../../../apis/roleApi';



const Roles = () => {
    // const { roles, loading } = useSelector(state => state.roles);
    // const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [bottom, setBottom] = useState('bottomCenter');
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [roles, setRoles] = useState();

    const handleGetRole = async () => {
        try {
            const res = await loadRoleApi()
            if(res.status === 200){
                setRoles(res?.data?.elements);
                // toast.success(res?.data?.message);
            }
        }catch(e){
            toast.error(e.response?.data?.message);
        }
    }

    useEffect(() => {
        handleGetRole()
    }, [])

    const deleteRole = async (id) => {
        try{
            const res = await deleteRoleApi(id)
            if(res.status === 200){
                // console.log('res :>> ', res);
                // setRoles(res?.data?.elements);
                toast.success(res?.data?.message);
                handleGetRole()
            }

        }catch(e){
            toast.error(e.response?.data?.message);
        }
        // toast.success("Xóa tài khoản thành công")
    };

    //search data
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            width: '7%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Mã vai trò',
            dataIndex: 'cd',
            key: 'cd',
            width: '30%',
            ...getColumnSearchProps('cd'),
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
        },
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.categoryName.length - b.categoryName.length,
        },
        // {
        //     title: 'Mô tả',
        //     dataIndex: 'description',
        //     key: 'description',
        //     width: '30%',
        //     sorter: (a, b) => a.description.length - b.description.length,
        // },
        // {
        //     title: 'Hình ảnh',
        //     dataIndex: 'url',
        //     key: 'url',
        //     width: '20%',
        //     render: (url) => {
        //         return (
        //             <Image
        //                 width={70}
        //                 src={url}
        //             />
        //         )
        //     },

        // },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (item) => {
                return (
                    <>
                        <Link to={`/admin/roles/edit/${item.id}`}>
                            <button className="btn btn-sm bg-primary text-white mr-2">
                                <i className="fas fa-edit"></i>
                            </button>
                        </Link>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa?"
                            onConfirm={() => deleteRole(item.id)}
                            okText="Xóa"
                            cancelText="Không"
                        >
                            <button
                                className="btn btn-sm bg-danger text-white  mr-2"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </Popconfirm>
                        <Link to={`/admin/roles/detail/${item.id}`}>
                            <button className="btn btn-sm bg-info text-white px-2">
                                <i className="fas fa-info-circle"></i>
                            </button>
                        </Link>
                    </>
                )
            },

        },
    ];

    return (
        <>
            <TopPage title="Quản lý danh mục sản phẩm" />
            <div className="my-3">
                <Link to="/admin/roles/create">
                    <button className="btn btn-primary">Thêm mới</button>
                </Link>
            </div>
            <h5 className="text-uppercase text-center mb-2">bảng danh mục sản phẩm</h5>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={roles}
                    rowKey='id'
                    pagination={{
                        position: [bottom],

                    }}
                    onChange={handleChange}
                    scroll={{
                        x: 800,
                    }}
                />
            </div>
        </>
    );
};

export default Roles;
