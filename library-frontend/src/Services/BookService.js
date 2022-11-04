import axios from "axios";

const BOOK_BASE_REST_API_URL = "http://localhost:8080/api/v1/book"

class BookService {
    getAllBooks() {
        return axios.get(BOOK_BASE_REST_API_URL+"s", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
        });
    }

    createBook(data){
        return axios.post(BOOK_BASE_REST_API_URL +"/save", data,{
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
        });
    }

    getBookById(bookId){
        return axios.get(BOOK_BASE_REST_API_URL +"/"+ bookId);
    }

    updateBook(bookId, data){
        console.log(data)
        return axios.put(BOOK_BASE_REST_API_URL +"/update/"+ bookId,data,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'multipart/form-data',
          },});
    }

    deleteBook(bookId){
        return axios.delete(BOOK_BASE_REST_API_URL +"/delete/" + bookId);
    }
}

export default new BookService();