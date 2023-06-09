import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { Button, Form, Input, Space, Table, Image, Radio, Select } from "antd";
import {
  loadUsersAdminStart,
  deleteUserAdminStart,
} from "../../../Redux/actions/userAdminAction";
import {orderStatus} from '../../../common';
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { loadProductStart } from "../../../Redux/actions/productAction";
import { loadCategoryStart } from "../../../Redux/actions/categoryAction";
import CartOrder from "./CartOrder";
import { createOrderStart } from "../../../Redux/actions/orderAction";
import { toast } from "react-toastify";
import { loadOrderApi, createOrderApi, updateOrderApi, deleteOrderApi } from "../../../apis/OrderApi";
import { createOrderDetailApi } from "../../../apis/orderDetailApi";
import moment from "moment";

const typePayments = [
  {value: 1, label: 'Thanh toán khi nhận hàng'},
  {value: 2, label: 'Thanh toán qua VN_Pay'}
]


const CreateOrder = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [bottom, setBottom] = useState("bottomCenter");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const { usersAdmin } = useSelector((state) => state.usersAdmin);
  const [cartProducts, setCartProducts] = useState([]);
  const [size, setSize] = useState("");
  const [userOption, setUserOption] = useState();
  const [userSelected, setUserSelected] = useState();

  const selectOptions = (array) => {
    const list = [];
    for (let item of array) {
      list.push({
        ...item,
        value: item.id,
        label: item.fullname,
      });
    }
    return list;
  };

  useEffect(() => {
    setUserOption(selectOptions(usersAdmin));
  }, [usersAdmin]);

  //load data product
  useEffect(() => {
    dispatch(loadProductStart());
    dispatch(loadCategoryStart());
    dispatch(loadUsersAdminStart());
  }, []);
  useEffect(() => {
    if (userSelected) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        phoneNumber: userSelected?.phone,
        address: userSelected?.address,
      });
    }
  }, [userSelected]);

  const handleCreateOrderDetail = async (data) => {
    await createOrderDetailApi(data)
  }

  const onFinish = async (data) => {
    try{
      const date = new Date();
      const cd = moment(date).format("DDHHmmss");
      const order = {
        ...data,
        // cartProducts,
        totalPrice,
        cd
      };
      const newOrder = await createOrderApi(order)
      
      cartProducts.forEach((cartDetail) => {
        const newOrderDetail = {
          order_id: newOrder?.data?.elements?.id,
          product_id: cartDetail.id,
          quantity: cartDetail.quantity,
        }
        handleCreateOrderDetail(newOrderDetail)
      })
  
      // dispatch(createOrderStart(order));
      // setTimeout(() => history.push("/admin/orders"), 500);
      history.push("/admin/orders")
      // toast.success("Đơn hàng được thêm thành công!!");
    }catch{
      console.log('error :>> undefined');
    }
  }

  //search data
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const totalPrice = cartProducts.reduce(
    (a, c) => a + c.quantity * c.priceNew,
    0
  );

  const handleAddCart = (product) => {
    const listProducts = cartProducts.find(
      (item) => item.id === product.id && item.size === product.size
    );
    if (!listProducts) {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    } else {
      let newcart = cartProducts;
      const objIndex = newcart.findIndex(
        (obj) => obj.id === product.id && obj.size === product.size
      );
      newcart[objIndex].quantity = newcart[objIndex].quantity + 1;
      setCartProducts([...newcart]);
    }
  };

  const onDecrease = (product) => {
    const listProducts = cartProducts.find(
      (item) => item.id === product.id && item.size === product.size
    );
    if (listProducts.quantity === 1) {
      let newcart = cartProducts;
      const objIndex = newcart.findIndex(
        (obj) => obj.id === product.id && obj.size === product.size
      );
      newcart[objIndex].quantity = newcart[objIndex].quantity - 1;
      newcart = newcart.filter((item) => item.quantity !== 0);
      setCartProducts([...newcart]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...listProducts, quantity: listProducts.quantity - 1 }
            : item
        )
      );
    }
    
  };
  console.log("cartProducts: ", cartProducts)

  const onDeleteProduct = (product) => {
    const listProducts = cartProducts.find(
      (item) => item.id === product.id && item.size === product.size
    );
    const newListProducts = cartProducts.filter(
      (item) => item !== listProducts
    );
    setCartProducts(newListProducts);
  };

  const onChange = (e) => {
    setSize(e.target.value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "",
      key: "",
      width: "70%",
      ...getColumnSearchProps("productName"),
      sorter: (a, b) => a.category.length - b.category.length,
      render: (item) => {
        return (
          <>
            <div className="d-flex align-items-center">
              <Image style={{width: "50px", paddingRight: "5px"}} src={item.url} />
              <span>{item.productName}</span>
            </div>
            {item.category === "Trà sữa" && (
              <Radio.Group onChange={onChange}>
                <Radio value="S">S</Radio>
                <Radio value="L">L</Radio>
              </Radio.Group>
            )}
          </>
        );
      },
    },
    // {
    //   title: "Danh mục",
    //   dataIndex: "category",
    //   key: "category",
    //   width: "20%",
    //   filters: categories.map((item, index) => ({
    //     key: index,
    //     text: item.categoryName,
    //     value: item.categoryName,
    //   })),
    //   onFilter: (value, record) => record.category.includes(value),
    //   sorter: (a, b) => (a.category).localeCompare(b.category),
    // },
    {
      title: "Giá tiền",
      dataIndex: "",
      key: "",
      width: "20%",
      sorter: (a, b) => a.priceNew - b.priceNew,
      ...getColumnSearchProps("priceNew"),
      render: (item) => {
        return Number(item.priceNew).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (item) => {
        return (
          <span className="add-cart">
            <i
              className="fas fa-cart-plus"
              onClick={() => handleAddCart({ ...item, size: size })}
            ></i>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <TopPage title="Quản lý đơn hàng" title1="Thêm mới đơn hàng" />
      <div className="backa-admin mb-2">
        <span
          className="back-admin-user"
          onClick={() => {
            history.push("/admin/orders");
          }}
        >
          <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
        </span>
      </div>
      <h5 className="text-uppercase text-center mb-4">thêm mới đơn hàng</h5>
      <div className="row order-container my-5">
        <div className="col-md-5 p-3">
          <h5>Danh sách sản phẩm ({products.length} sản phẩm)</h5>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{
              position: [bottom],
            }}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7 p-3">
          <h5 className="mb-3">Thông tin khách hàng</h5>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
              status: "Chờ xác nhận",
              type_payment: 1
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Họ tên"
              name="user_id"
              // rules={[
              //     {
              //         required: true,
              //         message: 'Vui lòng nhập họ tên!',
              //     },
              //     {
              //         min: 2,
              //         message: 'Tên phải lớn hơn 2 ký tự!',
              //     },
              // ]}
            >
              <Select
                placeholder="Chọn khách hàng"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={userOption}
                onChange={(event, option) => {
                  setUserSelected(option);
                }}
              />
            </Form.Item>
            {/* <Form.Item
                            label="E-mail"
                            name="email"
                        >
                            <Input />
                        </Form.Item> */}
            <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item>
            <Form.Item
              label="SDT"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
                  len: 10,
                  message: "Số điện thoại phải 10 số!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input />
            </Form.Item>
            <Form.Item
              label="Thanh toán"
              name="type_payment"
              
            >
              <Select
                // defaultValue="Chờ xác nhận"
                options={typePayments}
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="status"
              
            >
              <Select
                placeholder=""
                // defaultValue="Chờ xác nhận"
                options={orderStatus}
              />
            </Form.Item>
            

            <CartOrder
              cartProducts={cartProducts}
              onAdd={handleAddCart}
              onDecrease={onDecrease}
              onDeleteProduct={onDeleteProduct}
              totalPrice={totalPrice}
            />

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Thêm đơn hàng
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
