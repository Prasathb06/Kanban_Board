import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import TaskForm from './component/TaskForm';
import Home from './component/Home';
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/task' element={<TaskForm/>}/>
      </Routes>
    </Router>

        <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
    </>
  )
}

export default App