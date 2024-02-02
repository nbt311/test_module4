import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form} from "react-bootstrap";
import axios from "axios";

function Edit() {
    const [product, setProduct] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                console.log(res.data)
            setProduct(res.data)
        }).catch(err => console.error(err))
    }, []);
    const handleEdit = (evt) =>{
        evt.preventDefault();
        axios.put(`http://localhost:3000/products/${id}`, product)
            .then(res => {
                navigate("/")
        }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-auto border bg-white border shadow p-5'>
                <form onSubmit={handleEdit}>
                    <h3>Sửa sản phẩm</h3>
                    <div>
                        <label htmlFor="title">Tên sản phẩm</label>
                        <input type="text" name='title' className='form-control'
                               value={product.title}
                               onChange={event =>
                                   setProduct({...product, [event.target.name]: event.target.value})
                               }
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá</label>
                        <input type="text" name='price' className='form-control'
                               value={product.price}
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
                            value={product.description}
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

export default Edit;
