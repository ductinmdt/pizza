import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProductById } from "../../../apis/productApi";
import BreadCrumb from "../Main/BreadCrumb";
import { Rate } from "antd";
import "./detailproduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { buyProduct } from "../../../Redux/actions/cartActions";
import { Avatar, Image, Form, Input, Radio } from "antd";
import {
  createCommentStart,
  loadCommentStart,
} from "../../../Redux/actions/commentAction";
import { loadProductStart } from "../../../Redux/actions/productAction";
import Slider from "react-slick";
import ProductRelated from "./ProductRelated";
import moment from "moment";

const desc = ["Tệ", "Bình thường", "Ngon", "Rất ngon", "Tuyệt cú mèo!!"];

const initialState = {
  productName: "",
  description: "",
  priceNew: "",
  priceOld: "",
  category: "",
  url: "",
  id: "",
  productId: "",
  category_id: null,
};
const randNumberId = () => {
  return 1100000000 + Math.trunc(Math.random() * 9000000);
};

const DetailProduct = () => {
  const [form] = Form.useForm();
  const [detailProduct, setDetailProduct] = useState(initialState);
  const { id } = useParams();
  // let history = useHistory();
  const [value, setValue] = useState(5);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.authUser);
  const { comments } = useSelector((state) => state.comments);
  const { isLoggIn } = useSelector((state) => state.authUser);
  const { products } = useSelector((state) => state.products);
  const [size, setSize] = useState("S");
  const [rerender, setRerender] = useState(false);

  const onChange = (e) => {
    setSize(e.target.value);
  };

  //hien thi cac comment mơi nhat
  var commentReverse = comments.reduceRight(function (previous, current) {
    previous.push(current);
    return previous;
  }, []);

  const settings = {
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  };

  useEffect(() => {
    dispatch(loadCommentStart());
    dispatch(loadProductStart());
  }, [rerender]);

  useEffect(() => {
    getDataProduct(id);
  }, [id]);

  const getDataProduct = async (id) => {
    try {
      const data = await getProductById(id);
      data && setDetailProduct({ ...data?.data?.elements });
    } catch (error) {
      console.log(error);
    }
  };
  const onAdd = (product) => {
    dispatch(buyProduct(product));
  };

  const onFinish = (values) => {
    const newComment = {
      ...values,
      rate: value,
      product_id: id,
      user_id: profile.id,
    };
    setTimeout(() => {
      dispatch(createCommentStart(newComment));
      form.resetFields();
      setRerender(!rerender)
    }, 500);
  };

  const commentProduct = comments?.filter(
    (item) => item?.product_id === detailProduct?.id
  );
  const categoryProduct = products.filter(
    (item) => item.category_id === detailProduct?.category_id
  );

  const rate = commentProduct?.reduce(((sum, item) => sum + item.rate), 0) / commentProduct?.length;
  return (
    <div className="detaiProduct-container">
      <div className="container">
        <BreadCrumb title="Chi tiết sản phẩm" />

        <div className="row detail-row">
          <div className="col-md-5 col-12 detai-img mb-4">
            <img src={detailProduct.url} alt="" />
          </div>
          <div className="col-md-6 col-12 detail-info">
            <h4 className="text-uppercase">{detailProduct.productName}</h4>
            <p className="price">
              Giá:{" "}
              <span>
                {Number(detailProduct.priceNew).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </p>
            <p className="description">
              Mô tả: <span>{detailProduct.description}</span>
            </p>
            {/* {detailProduct.category?.categoryName === "Pizza" &&
                            <div className="d-flex">
                                <p className="mr-3">Size:</p>
                                <Radio.Group onChange={onChange} value={size}>
                                    <Radio value="S">S</Radio>
                                    <Radio value="L">L</Radio>
                                </Radio.Group>
                            </div>
                        } */}

            <div className="detail-rate">
              <Rate disabled allowHalf  value={Math.round(rate * 2) / 2} />
            </div>
            <div className="detail-btn">
              <button onClick={() => onAdd({ ...detailProduct, size: size })}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="row detail-comment">
          <h5 className="pl-3">Bình luận:</h5>
          <div className="col-md-6">
            <div className="form-comment">
              <div className="my-4">
                <span className="mr-4">Mức độ yêu thích: </span>
                <span>
                  <Rate tooltips={desc} onChange={setValue} value={value} />
                  {value ? (
                    <span className="ant-rate-text">{desc[value - 1]}</span>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <Form
                name="basic"
                wrapperCol={{
                  span: 24,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your comment!",
                    },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={1000}
                    placeholder="Đánh giá sản phẩm tại đây!! *"
                  />
                </Form.Item>

                <Form.Item>
                  {isLoggIn ? (
                    <button className="form-button" htmltype="submit">
                      Bình luận
                    </button>
                  ) : (
                    <div>
                      <span>(Vui lòng đăng nhập để gửi bình luận)</span>
                      <span className="mx-3">
                        <Link to="/login">(Đăng nhập tại đây!)</Link>
                      </span>
                      <span>
                        <Link to="/register">(Đăng ký tại đây!)</Link>
                      </span>
                    </div>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-md-12">
              <div className="content-comment">
                {commentProduct &&
                  commentProduct.map((item) => {
                    return (
                      <div className="comment" key={item.commentId}>
                        <div className="comment-img">
                          <Avatar
                            style={{ width: 60, height: 60 }}
                            src={
                              <Image
                                src={item?.user?.avatar}
                                style={{ width: 50, height: 50 }}
                              />
                            }
                          />
                        </div>
                        <div className="comment-infor">
                          <div className="comment-user">
                            <p className="mr-3">{item?.user?.fullname}</p>
                            <span>
                              <Rate disabled defaultValue={item.rate} />
                            </span>
                          </div>
                          <p>{item.description}</p>
                          <span className="timeAt">
                            {moment(item?.createdAt).format("hh:mm DD-MM-YYYY")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="row related-products">
          <h4 className="text-center text-uppercase">Sản phẩm tương tự</h4>
          <div className="col-md-12">
            <Slider {...settings}>
              {categoryProduct &&
                categoryProduct.map((item) => {
                  return (
                    <h6 key={item.id}>
                      <ProductRelated product={item} onAdd={onAdd} />
                    </h6>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailProduct;
