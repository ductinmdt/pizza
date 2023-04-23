import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProductById } from "../../../apis/productApi";
import TopPage from "../../../layouts/AdminLayout/Toppage/TopPage";
import { Tabs } from "antd";
import "./detailProduct.scss";

const { TabPane } = Tabs;

const initialState = {
  productName: "",
  description: "",
  priceNew: "",
  priceOld: "",
  category: "",
  url: "",
  id: "",
  productId: "",
};

const onChange = (key) => {};

const DetailProduct = () => {
  const [detailProduct, setDetailProduct] = useState(initialState);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    getDataProduct(id);
  }, [id]);

  const getDataProduct = async (id) => {
    try {
      const data = await getProductById(id);
      if (data) {
        setDetailProduct({
          id: data.id,
          productName: data?.data?.elements?.productName,
          description: data?.data?.elements?.description,
          priceNew: data?.data?.elements?.priceNew,
          priceOld: data?.data?.elements?.priceOld,
          category: data?.data?.elements?.category,
          cd: data?.data?.elements?.cd,
          stock: data?.data?.elements?.stock,
          category_id: data?.data?.elements?.category_id,
          url: data?.data?.elements?.url,
        });
        // setFileList([
        //     {
        //       name: data?.data?.elements?.url,
        //       status: "done",
        //       url: data?.data?.elements?.url,
        //     },
        //   ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TopPage title="quản lý sản phẩm" />
      <span
        className="back-admin-user "
        onClick={() => {
          history.push("/admin/products");
        }}
      >
        <i className="fas fa-arrow-left"></i>&nbsp; Quay lại
      </span>
      <h5 className="text-uppercase text-center mb-2">chi tiết sản phẩm</h5>
      <div className=" row detailProduct mt-5">
        <div className="detailProduct__images col-md-4">
          <img src={detailProduct.url} />
        </div>
        <div className="detailProduct__info col-md-6">
          <h5 className="text-uppercase mb-2">{detailProduct.productName}</h5>
          
          <p className="detailProduct__info--price">
            Giá:{" "}
            <span>
              {Number(detailProduct.priceNew).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </span>
          </p>
          <p className="detailProduct__info--price">
            Mã sản phẩm: {detailProduct.cd}
          </p>
          <p className="detailProduct__info--price">
            Số lượng: {detailProduct.stock}
          </p>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Mô tả về sản phẩm" key="1">
              {detailProduct.description}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
