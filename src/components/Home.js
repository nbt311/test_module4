import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";

function Home() {
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/products').then(res => {
            setProducts(res.data)
        })
    }, []);
    const handleShowDeleteModal = (productId) => {
        setSelectedProductId(productId);
        setShowDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };
    const handleDelete = () => {
        if (selectedProductId) {
            axios.delete(`http://localhost:3000/products/${selectedProductId}`)
                .then(res => {
                    // Cập nhật danh sách sản phẩm sau khi xóa
                    setProducts(prevProducts => prevProducts.filter(product => product.id !== selectedProductId));
                    handleCloseDeleteModal();
                })
                .catch(err => {
                    console.error(err);
                    handleCloseDeleteModal();
                });
        } else {
            console.error("selectedProductId is undefined");
            handleCloseDeleteModal();
        }};
    return (
        <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-start mb-3 bg-body-secondary'>
                    <h3>Danh sách sản phẩm</h3>
                </div>
                <div className='d-flex justify-content-start mb-3'>
                    <Link to='/create' className='btn btn-success'>Thêm mới</Link>
                </div>
                <table className='table '>
                    <thead className='bg-dark-subtle'>
                    <tr className="text-start">
                        <th className='bg-secondary text-light'>#</th>
                        <th className='bg-secondary text-light'>Tên sản phẩm</th>
                        <th className='bg-secondary text-light'>Mô tả</th>
                        <th className='bg-secondary text-light'>Giá</th>
                        <th className='bg-secondary text-light'>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="text-start">
                            <td className='fw-bold'>{index + 1}</td>
                            <td className=''  ><Link to={`/detail/${product.id}`}>{product.title}</Link></td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/edit/${product.id}`} className='btn btn-sm btn-primary me-2'>Sửa</Link>
                                <button
                                    className='btn btn-sm btn-danger'
                                    onClick={() => handleShowDeleteModal(product.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Xóa */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
