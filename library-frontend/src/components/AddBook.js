import React, { useState, useEffect } from "react";
import BookService from "../Services/BookService";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
const imageMimeType = /image\/(png|jpg|jpeg)/i;
const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [typeBook, setTypeBook] = useState("");
  const [dateRelease, setDateRelease] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [bookIMG, setBookIMG] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [btnEdit, setBtnEdit] = useState(true)
  const navigate = useNavigate();
  const { id } = useParams();
  var data = new FormData();
  const saveBook = (e) => {
    e.preventDefault();
    data.append("title",title)
    data.append("author",author)
    data.append("typeBook",typeBook)
    data.append("description",description)
    data.append("dateRelease",dateRelease)
    data.append("totalPage",totalPage)
    data.append("file",file)
    // const booktmp = {title,author,typeBook,description,dateRelease,totalPage}
    // console.log(booktmp)
    // console.log(data.get("title"))
    if (id) {
      BookService.updateBook(id, data)
        .then((response) => {
          navigate("/books");
        })
        .catch((error) => {
          data.delete("title")
          data.delete("author")
          data.delete("typeBook")
          data.delete("description")
          data.delete("dateRelease")
          data.delete("totalPage")
          data.delete("file")
          console.log(error);
        });
    } else {
      BookService.createBook(data)
        .then((response) => {
          navigate("/books");
        })
        .catch((error) => {
          data.delete("title")
          data.delete("author")
          data.delete("typeBook")
          data.delete("description")
          data.delete("dateRelease")
          data.delete("totalPage")
          data.delete("file")
          console.log(error);
        });
    }
  };
  useEffect(() => {
    BookService.getBookById(id)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setTypeBook(response.data.typeBook);
        setDescription(response.data.description);
        setDateRelease(response.data.dateRelease);
        setTotalPage(response.data.totalPage);
        setBookIMG(response.data.base64Img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleTitle = () => {
    if (id) {
      return <h2 className="text-center">Sửa sách</h2>;
    } else {
      return <h2 className="text-center">Thêm sách</h2>;
    }
  };

  const handleEventButton = (e) => {
      // 
      // setBtnEdit(true)
      // e.target.innerHTML = "Save"
      // if(e.target.innerHTML==="Save"){
        saveBook(e)
      // }
  }

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }
  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);
  return (
    <div className="add_book">
      <div className="containet">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {handleTitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề"
                    name="title"
                    className="form-control"
                    value={title}
                    required
                    disabled = {!btnEdit}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Tác giả</label>
                  <input
                    type="text"
                    placeholder="Nhập tác giả"
                    name="author"
                    className="form-control"
                    value={author}
                    required
                    disabled = {!btnEdit}
                    onChange={(e) => setAuthor(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Thể loại</label>
                  <select
                    name="typeBook"
                    className="form-control"
                    value={typeBook}
                    required
                    disabled = {!btnEdit}
                    onChange={(e) => setTypeBook(e.target.value)}
                  >
                    <option value="Chính trị - pháp luật">Chính trị - pháp luật</option>
                    <option value="Khoa học công nghệ - Kinh tế">Khoa học công nghệ - Kinh tế</option>
                    <option value="Văn học nghệ thuật">Văn học nghệ thuật</option>
                    <option value="Văn hóa xã hội - Lịch sử">Văn hóa xã hội - Lịch sử</option>
                    <option value="Giáo trình">Giáo trình</option>
                    <option value="Truyện, tiểu thuyết">Truyện, tiểu thuyết</option>
                    <option value="Tâm lý, tâm linh, tôn giáo">Tâm lý, tâm linh, tôn giáo</option>
                    <option value="Sách thiếu nhi">Sách thiếu nhi</option>
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Mô tả</label>
                  <input
                    type="text"
                    placeholder="Nhập mô tả"
                    name="author"
                    className="form-control"
                    value={description}
                    required
                    disabled = {!btnEdit}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Ngày xuất bản</label>
                  <input
                    type="date"
                    placeholder="Nhập ngày xuất bản"
                    name="dateRelease"
                    className="form-control"
                    value={dateRelease}
                    required pattern="\d{4}-\d{2}-\d{2}"
                    disabled = {!btnEdit}
                    onChange={(e) => setDateRelease(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Số trang</label>
                  <input
                    type="number"
                    placeholder="Nhập số trang"
                    name="totalPage"
                    className="form-control"
                    value={totalPage}
                    required
                    disabled = {!btnEdit}
                    onChange={(e) => setTotalPage(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Ảnh bìa</label>
                  <input
                    type="file"
                    name="fileImage"
                    className="form-control"
                    accept=".jpg, .jpeg, .png"
                    required
                    disabled = {!btnEdit}
                    onChange={e => changeHandler(e)}
                  />
                  <br/>
                    {fileDataURL ?
                    <p className="img-preview-wrapper">
                      {
                        <img src={fileDataURL} alt="preview" style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}}/>
                      }
                    </p> :
                    <p className="img-preview-wrapper">
                    {
                      <img src={`data:image;base64,${bookIMG}`} alt="preview" style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}}/>
                    }
                    </p>
                    }
                </div>
                <div className="button-add" style={{display:"flex"}}>
                  <Button style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}} id='save' className="btn btn-success" onClick={(e) => handleEventButton(e)} value={id}>{id ? "Sửa sách" : "Thêm sách"} </Button>
                  <Link style={{display:"block",marginLeft: "auto", marginRight:"auto",width: "50%"}} to="/" id="cancel" className="btn btn-danger">
                    Hủy
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
