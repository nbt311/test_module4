import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

function Detail(){
    const [product, setProduct] = useState({})
    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`).then(res => {
            console.log(product)
            setProduct(res.data)
        })
    }, [id]);
    return (
        <div className='d-flex flex-column  align-items-lg-center bg-light vh-100'>
            <div className=' w-auto rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-start bg-body-secondary '>
                    <h5>Chi tiết sản phẩm</h5>
                </div>
                <div className='d-flex justify-content-start'>
                    <h2>Tên sản phẩm: {product.title}</h2>
                </div>
                <div className='d-flex justify-content-start'>
                    <h5>Mô tả: {product.description}</h5>
                </div>
                <div className='d-flex justify-content-start'>
                    <h5>Giá: {product.price} VND</h5>
                </div>
                <div className='d-flex justify-content-start mb-3'>
                    <Link to="/" className='btn btn-sm btn-primary'>Trở lại</Link>
                </div>
            </div>
        </div>
    );
};

export default Detail;
