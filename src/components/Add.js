import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function Add() {
    const [product, setProduct] = useState({})
    const navigate = useNavigate();
    const handleAdd = (evt) => {
            evt.preventDefault();
            axios.post(`http://localhost:3000/products`, product)
                .then(res => {
                    navigate("/")
                }).catch(err => console.log(err))
    }


    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-auto border bg-white border shadow p-5'>
                <form onSubmit={handleAdd}>
                    <h3>Thêm sản phẩm</h3>
                    <div>
                        <label htmlFor="title">Tên sản phẩm</label>
                        <input type="text" name='title' className='form-control'
                               onChange={event =>
                                   setProduct({...product, [event.target.name]: event.target.value})
                               }
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá</label>
                        <input type="text" name='price' className='form-control'
                               onChange={event =>
                                   setProduct({...product, [event.target.name]: event.target.value})
                               }
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Mô tả</label>
                        <textarea
                            name='description'
                            className='form-control'
                            onChange={event =>
                                setProduct({ ...product, [event.target.name]: event.target.value })
                            }
                        />
                    </div>
                    <br/>
                    <button className='btn btn-info'>Submit</button>
                    <Link to='/' className='btn btn-success'>Back</Link>
                </form>
            </div>
        </div>
    );
};

export default Add;
