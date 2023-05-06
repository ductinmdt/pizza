import React, { useState, useEffect } from 'react';
import './productModal.scss';
import { Rate, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadCommentStart,
  } from "../../../Redux/actions/commentAction";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


const ProductModal = ({ product, onAdd }) => {
    const [size, setSize] = useState('S');
    const { comments } = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentStart());
      }, [product]);

    const onClick = (product) => {
        onAdd(product);
    }

    const onChange = (e) => {
        setSize(e.target.value);
    };

    const commentProduct = comments?.filter(
        (item) => item?.product_id === product?.id
      );
    const rate = commentProduct?.reduce(((sum, item) => sum + item.rate), 0) / commentProduct?.length;
    return (
        <div className="container">
            <div className="row productModal">
                <div className=" col-md-5 col-12 productModal__img">
                    <img src={product.url} />
                </div>
                <div className="col-md-6 col-12 productModal__content">
                    <p className="productModal__content--name">{product.productName}</p>
                    <p className="productModal__content--price">
                        {Number(product.priceNew).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className="productModal__content--des">{product.description}</p>
                    <div className>
                        <Rate allowHalf disabled value={Math.round(rate * 2) / 2} />
                    </div>
                    <button className="btn btn-success mt-4" onClick={() => onClick({ ...product, size: size })}>Thêm giỏ hàng</button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;