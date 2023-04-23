import React from "react";
import "./HomePageMenus.scss";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../../components/UserHomePage/Product/Product";
import { buyProduct } from "../../../Redux/actions/cartActions";
import { toast } from "react-toastify";

const { TabPane } = Tabs;
const HomePageMenus = () => {
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const coffees = products.filter((item) => item.category === "Cà phê");
  const milkteas = products.filter((item) => item.category === "Trà sữa");
  const fuitteas = products.filter((item) => item.category === "Trà hoa quả");
  const smoothies = products.filter((item) => item.category === "Smoothies");
  const cakes = products.filter((item) => item.category === "Bánh ngọt");
  const dispatch = useDispatch();
  //add productItem
  const onAdd = (product) => {
    dispatch(buyProduct(product));
    // toast.success("Thêm giỏ hàng thành công");
  };


  return (
    <>
      <div className="home-page-menus">
        <div className="container">
          <div className="row">
            <div className="menu-title">
              <h1 className="mb-5">SẢN PHẨM MỚI</h1>
            </div>

            <Tabs defaultActiveKey="0" centered className="col-md-12">
              {categories.map((item, index) => {
                return <TabPane
                  tab={item?.categoryName}
                  key={index}
                  className="mt-4"
                >
                  {item.products &&
                    item.products.slice(0, 8).map((product, i) => {
                      return (
                        <Product onAdd={onAdd} key={i} product={product} />
                      );
                    })}
                </TabPane>;
              })}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageMenus;
