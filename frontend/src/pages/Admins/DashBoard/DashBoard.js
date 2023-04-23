import { Tabs, Calendar, DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { loadCommentStart } from "../../../Redux/actions/commentAction";
import { loadOrderStart } from "../../../Redux/actions/orderAction";
import { loadProductStart } from "../../../Redux/actions/productAction";
import { loadUsersAdminStart } from "../../../Redux/actions/userAdminAction";
import CommentTable from "./CommentTable/CommentTable";
import "./dashboard.scss";
import LineChartJS from "./LineChart/LineChart";
import PieChartJS from "./PieChart/PieChart";
import TableOrder from "./TableOrders/TableOrder";
// import { dataYear, dataMonth } from "./Data";
import Bestseller from "./Bestseller/Bestseller";
import moment from "moment";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { toast } from "react-toastify";

import {
  getRevenueByDayApi,
  getRevenueByYearApi,
} from "../../../apis/OrderApi";

dayjs.extend(weekday);
dayjs.extend(localeData);

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const yearFormat = "YYYY";

const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];

const DashBoard = () => {
  const { usersAdmin } = useSelector((state) => state.usersAdmin);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.orders);
  const { comments } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const [startDay, setStartDay] = useState(dayjs().add(-7, "d"));
  const [endDay, setEndDay] = useState(dayjs());
  const [yearSelect, setYearSelect] = useState("2023");
  const [yearData, setYearData] = useState([]);
  const [dayData, setDayData] = useState([]);

  useEffect(() => {
    dispatch(loadUsersAdminStart());
    dispatch(loadProductStart());
    dispatch(loadOrderStart());
    dispatch(loadCommentStart());
  }, []);

  const orderNew = orders.filter(
    (item) => item.status === "Chờ xác nhận"
  ).length;

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDay(dateStrings[0]);
      setEndDay(dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const onChangeYear = (date, dateString) => {
    setYearSelect(dateString);
  };

  /* GET DATA FOR CHART */
  const handleGetRevenueByDayApi = async (data) => {
    try {
      const res = await getRevenueByDayApi(data);
      if (res?.data?.status === 200) {
        setDayData(res?.data?.elements);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  const handleGetRevenueByYearApi = async (data) => {
    try {
      const res = await getRevenueByYearApi(data);
      if (res?.data?.status === 200) {
        setYearData(res?.data?.elements);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  useEffect(() => {
    handleGetRevenueByYearApi({
      yearSelect: yearSelect,
    });
  }, [yearSelect]);

  useEffect(() => {
    handleGetRevenueByDayApi({
      startDay: startDay,
      endDay: endDay,
    });
  }, [startDay, endDay]);
  /* END GET DATA FOR CHART */

  return (
    <div className="container-fluid">
      <TopPage title="Dashboard" />
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="p-3 list-box">
            <div className="small-box d-sm-6 ">
              <div className="icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="inner">
                <h4 className="text-primary">{usersAdmin.length}</h4>
                <p>Thành viên </p>
              </div>

              <div className="box-footer">
                <Link to="/admin/admins">
                  {" "}
                  More info <i className="fas fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
            <div className=" small-box">
              <div className="icon">
                <i className="fas fa-cart-plus"></i>
              </div>
              <div className="inner">
                <h4 className="text-danger">{orderNew}</h4>
                <p>Đơn hàng mới</p>
              </div>
              <Link to="/admin/orders">
                {" "}
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
            <div className=" small-box">
              <div className="icon">
                <i className="fas fa-carrot"></i>
              </div>
              <div className="inner">
                <h4 className="text-success">{products.length}</h4>
                <p>Tống số sản phẩm</p>
              </div>

              <div className="box-footer">
                <Link to="/admin/products">
                  {" "}
                  More info <i className="fas fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
            <div className=" small-box">
              <div className="icon">
                <i className="fas fa-comments"></i>
              </div>
              <div className="inner">
                <h4 className="text-info">{comments.length}</h4>
                <p>Bình luận</p>
              </div>

              <div className="box-footer">
                <Link to="/admin/comments">
                  {" "}
                  More info <i className="fas fa-arrow-circle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 px-0">
          <div className="calendar p-3">
            <Calendar fullscreen={false} />
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-8 col-12 pl-0">
          <div className="linechart p-3">
            <h5>Đồ thị doanh thu</h5>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Doanh thu theo ngày" key="1">
                <RangePicker
                  defaultValue={[startDay, endDay]}
                  presets={rangePresets}
                  onChange={onRangeChange}
                  className="mb-3"
                />
                <LineChartJS data={dayData} />
              </TabPane>
              <TabPane tab="Doanh thu theo năm" key="2">
                <DatePicker
                  onChange={onChangeYear}
                  picker="year"
                  className="mb-3"
                  defaultValue={dayjs("2023", yearFormat)}
                />
                <LineChartJS data={yearData} />
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="col-md-4 col-12 piechart p-4">
          <h5>Đồ thị trạng thái đơn hàng</h5>
          <PieChartJS orders={orders} />
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4 col-12 p-4 product-store">
          <h5 className="mb-4">Top sản phẩm bán chạy</h5>
          {products &&
            products.slice(0, 6).map((product, index) => {
              return (
                <Bestseller orders={orders} product={product} key={index} />
              );
            })}
        </div>
        <div className="col-md-8 col-12 pr-0">
          <div className="user-comment p-3">
            <h4>Bình luận khách hàng</h4>
            <CommentTable comments={comments} />
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-12 col-12 info-user p-4">
          <h4>Bảng thông tin Order</h4>
          <TableOrder />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
