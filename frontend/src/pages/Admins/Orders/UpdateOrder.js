import { generatePath, useHistory, useParams } from "react-router-dom";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";

import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Space, Table, Select, Image, Radio } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { loadProductStart } from "../../../Redux/actions/productAction";
import { loadCategoryStart } from "../../../Redux/actions/categoryAction";
import { toast } from "react-toastify";
import { getOrderById } from "../../../apis/OrderApi";
import TableUpdateOrder from "./TableUpdateOrder";
import { updateOrderStart } from "../../../Redux/actions/orderAction";
import {
  loadUsersAdminStart,
  deleteUserAdminStart,
} from "../../../Redux/actions/userAdminAction";
import {
  createOrderDetailApi,
  updateOrderDetailApi,
  deleteOrderDetailApi,
} from "../../../apis/orderDetailApi";
import { loadProductApi } from "../../../apis/productApi";
const { Option } = Select;
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
      span: 24,
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

const typePayments = [
  { value: 1, label: "Thanh toán khi nhận hàng" },
  { value: 2, label: "Thanh toán qua VN_Pay" },
];

const UpdateOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [products, setProducts] = useState([]);
  const searchInput = useRef(null);
  const [bottom, setBottom] = useState("bottomCenter");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [cartProducts, setCartProducts] = useState([]);
  const [oldcartProducts, setOldCartProducts] = useState([]);
  const [userOption, setUserOption] = useState();
  const { usersAdmin } = useSelector((state) => state.usersAdmin);
  const [userSelected, setUserSelected] = useState();
  const [isChanged, setIsChanged] = useState(false);

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

  const handleGetProducts = async () => {
    try {
      const res = await loadProductApi();
      if (res?.data?.elements) {
        const addProductId = res.data?.elements?.map((item) => ({
          ...item,
          product_id: item.id,
        }));
        setProducts(addProductId);
      }
    } catch (err) {}
  };

  const getDataById = async (id) => {
    try {
      const data = await getOrderById(id);

      data &&
        form.setFieldsValue({
          user_id: data?.data?.elements?.user_id,
          phoneNumber: data?.data?.elements?.phoneNumber,
          address: data?.data?.elements?.address,
          status: data?.data?.elements?.status,
          note: data?.data?.elements?.note,
          cd: data?.data?.elements?.cd,
          type_payment: data?.data?.elements?.type_payment,
        });
      data && setCartProducts(data?.data?.elements?.cartProducts);
      data && setOldCartProducts(data?.data?.elements?.cartProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserOption(selectOptions(usersAdmin));
  }, [usersAdmin]);

  //load data product
  useEffect(() => {
    handleGetProducts();
    dispatch(loadCategoryStart());
    dispatch(loadUsersAdminStart());
    getDataById(id);
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
    await createOrderDetailApi(data);
  };
  const handleUpdateOrderDetail = async (id, data) => {
    await updateOrderDetailApi(id, data);
  };
  const handleDeleteOrderDetail = async (id) => {
    await deleteOrderDetailApi(id);
  };

  const onFinish = (data) => {
    const dataValue = {
      ...data,
      totalPrice,
    };
    if (!data) return;
    dispatch(updateOrderStart({ id, dataValue }));
    if (!isChanged) {
      history.push("/admin/orders");
      return;
    }
    let oldcartProductsDelete = oldcartProducts;
    for (let i = 0; i < cartProducts.length; i++) {
      let action = "create";
      for (let j = 0; j < oldcartProducts.length; j++) {
        if (cartProducts[i].product_id === oldcartProducts[j].product_id) {
          action = "update";
          oldcartProductsDelete.splice(j, 1);
          break;
        } else {
        }
      }
      //   console.log('action :>> ', action);
      if (action === "update") {
        handleUpdateOrderDetail(cartProducts[i]?.id, {
          quantity: cartProducts[i]?.quantity,
        });
      } else if (action === "create") {
        const newOrderDetail = {
          order_id: id,
          product_id: cartProducts[i].product_id,
          quantity: cartProducts[i].quantity,
        };
        handleCreateOrderDetail(newOrderDetail);
      } else {
      }
    }
    oldcartProductsDelete.forEach((item) => {
      handleDeleteOrderDetail(item.id);
    });

    history.push("/admin/orders");
  };

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

  const totalPrice =
    cartProducts &&
    cartProducts.reduce((a, c) => a + c.quantity * c.priceNew, 0);

  const handleAddCart = (product) => {
    setIsChanged(true);
    const listProducts = cartProducts.find(
      (item) => item.product_id === product.product_id //
    );
    if (!listProducts) {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    } else {
      let newcart = cartProducts;
      const objIndex = newcart.findIndex(
        (obj) => obj.product_id === product.product_id // && obj.size === product.size
      );
      newcart[objIndex].quantity = newcart[objIndex].quantity + 1;
      setCartProducts([...newcart]);
    }
  };

  const onDecrease = (product) => {
    setIsChanged(true);
    const listProducts = cartProducts.find(
      (item) => item.product_id === product.product_id
    );
    if (listProducts.quantity === 1) {
      let newcart = cartProducts;
      const objIndex = newcart.findIndex(
        (obj) =>
          obj.product_id === product.product_id && obj.size === product.size
      );
      newcart[objIndex].quantity = newcart[objIndex].quantity - 1;
      newcart = newcart.filter((item) => item.quantity !== 0);
      setCartProducts([...newcart]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.product_id === product.product_id
            ? { ...listProducts, quantity: listProducts.quantity - 1 }
            : item
        )
      );
    }
  };
  const onDeleteProduct = (product) => {
    setIsChanged(true);
    const listProducts = cartProducts.find((item) => item.id === product.id);
    const newListProducts = cartProducts.filter(
      (item) => item !== listProducts
    );
    setCartProducts(newListProducts);
  };

  const [size, setSize] = useState("");

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
              <Image style={{ width: "50px" }} src={item.url} />
              <span className="ml-2">{item.productName}</span>
            </div>
            {/* {item.category === "pizza" && (
              <Radio.Group onChange={onChange}>
                <Radio value="S">S</Radio>
                <Radio value="L">L</Radio>
              </Radio.Group>
            )} */}
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
    //   sorter: (a, b) => a.category.length - b.category.length,
    // },
    {
      title: "Giá tiền",
      dataIndex: "",
      key: "",
      width: "20%",
      sorter: (a, b) => a.priceNew.length - b.priceNew.length,
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
      <TopPage title="Quản lý đơn hàng" title1="Cập nhật đơn hàng" />
      <span
        className="back-admin-user "
        onClick={() => {
          history.push("/admin/orders");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
      </span>
      <h5 className="text-uppercase text-center mb-2">Cập nhật đơn hàng</h5>
      <div className="row order-container mt-5">
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
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item label="Mã đơn hàng" name="cd">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Họ tên" name="user_id">
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
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số địa ch!",
                },
              ]}
            >
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
                  message: "Số điện thoại phải 10 số.",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Ghi chú" name="note">
              <Input />
            </Form.Item>
            <Form.Item label="Thanh toán" name="type_payment">
              <Select options={typePayments}></Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  type: "text",
                },
              ]}
            >
              <Select>
                <Option value="Chờ xác nhận">Chờ xác nhận</Option>
                <Option value="Đang chuẩn bị">Đang chuẩn bị</Option>
                <Option value="Đang vận chuyển">Đang vận chuyển</Option>
                <Option value="Giao thành công">Giao thành công</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Form.Item>
            <TableUpdateOrder
              onAdd={handleAddCart}
              onDecrease={onDecrease}
              onDeleteProduct={onDeleteProduct}
              totalPrice={totalPrice}
              cartProducts={cartProducts}
            />
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
