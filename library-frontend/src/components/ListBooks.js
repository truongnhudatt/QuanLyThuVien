import React, {useState, useEffect,useRef} from 'react'
import BookService from '../Services/BookService.js'
import {Link} from 'react-router-dom'
import Header from './Header'
import CTable from "react-bootstrap/Table";
import Dialog from './Dialog.js';
const ListBooks = () => {
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        nameProduct: ""
      });
    const [books, setBooks] = useState([])
    useEffect(() => {
        getAllBooks();
    }, []);

    const getAllBooks = () => {
        BookService.getAllBooks().then((response)=> {
            setBooks(response.data)
        }).catch(error=> {
            console.log(error)
        })
    }

    const deleteBook = (bookId) => {
        console.log(bookId)
        BookService.deleteBook(bookId).then((response)=> {
            getAllBooks();
        }).catch((error) => {
            console.log(error)
        })
    }

    const idProductRef = useRef();
    const handleDialog = (message, isLoading, nameProduct) => {
        setDialog({
          message,
          isLoading,
          nameProduct
        });
      };
      const handleDelete = (id) => {
        handleDialog("Xác nhận xóa bookID", true, id);
        idProductRef.current = id
      };
      const areUSureDelete = (choose) => {
        if (choose) {
          handleDialog("", false);
            deleteBook(idProductRef.current)
        } else {
          handleDialog("", false);
        }
      };
    return (
        <>
        <Header/>
        <div className='container'>
            <h2 className='text-center'>Danh sách Sách có trong Thư Viện</h2>
            {
                localStorage.getItem("user-info") ?
                <>
                    <Link to='/add' className='btn btn-primary mb-2'>Add Book</Link>
                </>
                :
                <>
                </>
            }
            
            <CTable
                    bordered
                    borderColor="primary"
                    hover
                    tableHeadProps={{ color: "dark" }}
                >
                    <thead>
                    <tr>
                        <th className="text-center"></th>
                        <th className="text-center" scope="col">
                        Tiêu đề{" "}
                        </th>
                        <th className="text-center" scope="col">
                        Tác giả
                        </th>
                        <th className="text-center" scope="col">
                        Danh mục
                        </th>
                        <th className="text-center" scope="col">
                        Mô tả
                        </th>
                        <th className="text-center" scope="col">
                        Ngày xuất bản
                        </th>
                        <th className="text-center" scope="col">
                        Số trang
                        </th>
                        <th className="text-center" scope="col">
                        Ảnh bìa
                        </th>
                        {
                            localStorage.getItem("user-info") ?
                            <>
                                <th className="text-center" scope="col">
                                    Hành động
                                </th>
                            </>
                            :
                            <>
                            </>
                        }                        
                    </tr>
                    </thead>
                    <tbody>
                    {books &&
                        books.map(
                        (data, index) => (
                            (
                            <tr className="text-center">
                                {data.id}
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.title}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.author}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.typeBook}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.description}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.dateRelease}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">{data.totalPage}</td>
                                <td style={{ textAlign: "center", justifyContent: "center" }} className="text-center">
                                <img src={`data:image;base64,${data.base64Img}`} alt="" width="100" height="100" />
                                </td>
                                {
                                    localStorage.getItem("user-info") ?
                                    <>
                                        <td className="text-center">
                                            <div className="d-flex p-1">
                                                <Link to={`/book-details/${data.id}`}
                                                style={{ padding: "15px 25px" }}
                                                className="btn btn-primary m-1"
                                                >
                                                View
                                                </Link>
                                                <button onClick={() => handleDelete(data.id)}
                                                style={{ padding: "15px 25px" }}
                                                className="btn btn-primary m-1"
                                                >
                                                Delete
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                            </tr>
                            )
                        )
                        )}
                    </tbody>
                </CTable>
                {dialog.isLoading && (
                    <Dialog
                    nameProduct={dialog.nameProduct}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                    />
                )}
        </div>
        </>
    )
}

export default ListBooks