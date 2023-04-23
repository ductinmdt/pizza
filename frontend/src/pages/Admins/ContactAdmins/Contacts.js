import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TopPage from '../../../layouts/AdminLayout/Toppage/TopPage';
import { deleteCategoryStart, loadCategoryStart } from '../../../Redux/actions/categoryAction';
import { Popconfirm, Button, Input, Space, Table, Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {loadContactApi,
    createContactApi,
    deleteContactApi,
    getContactById,
    updateContactApi,} from '../../../apis/contactApi';


const Contacts = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [bottom, setBottom] = useState('bottomCenter');
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [contacts, setContacts] = useState()

    const handleGetContact = async () => {
        try {
            const res = await loadContactApi()
            if(res.status === 200){
                setContacts(res?.data?.elements);
                // toast.success(res?.data?.message);
            }
        }catch(e){
            toast.error(e.response?.data?.message);
        }
    }

    useEffect(() => {
        handleGetContact()
    }, [])

    const deleteContact = async (id) => {
        try{
            const res = await deleteContactApi(id)
            if(res.status === 200){
                toast.success(res?.data?.message);
                handleGetContact()
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
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            width: '20%',
            ...getColumnSearchProps('fullname'),
            sorter: (a, b) => (a.fullname).localeCompare(b.fullname),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            sorter: (a, b) => (a.email).localeCompare(b.email),
        },
        {
            title: 'Nội dung phản hồi',
            dataIndex: 'description',
            key: 'description',
            width: '40%',
            sorter: (a, b) => (a.description).localeCompare(b.description),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: '',
            render: (item) => {
                return (
                    <>
                        {/* <Link to={`/admin/categories/edit/${item.id}`}>
                            <button className="btn btn-sm bg-primary text-white mr-2">
                                <i className="fas fa-edit"></i>
                            </button>
                        </Link> */}
                        <Popconfirm
                            title="Bạn có chắc muốn xóa?"
                            onConfirm={() => deleteContact(item.id)}
                            okText="Xóa"
                            cancelText="Không"
                        >
                            <button
                                className="btn btn-sm bg-danger text-white  mr-2"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </Popconfirm>
                        {/* <Link to={`/admin/categories/detail/${item.id}`}>
                            <button className="btn btn-sm bg-info text-white px-2">
                                <i className="fas fa-info-circle"></i>
                            </button>
                        </Link> */}
                    </>
                )
            },

        },
    ];

    return (
        <>
            <TopPage title="Quản lý phiếu phản hồi" />
            <div className="my-3">
                <Link to="/admin/categories/create">
                    <button className="btn btn-primary">Thêm mới</button>
                </Link>
            </div>
            <h5 className="text-uppercase text-center mb-2">bảng phiếu phản hồi</h5>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={contacts}
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

export default Contacts;
