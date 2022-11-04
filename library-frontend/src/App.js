import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import AddBook from "./components/AddBook";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<ListBooks />} />
            <Route path="/books" element={<ListBooks />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/book-details/:id" element={<AddBook />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
