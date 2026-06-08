import React from 'react';
   import { ToastContainer, toast } from 'react-toastify';


const Toaster = () => {
    toast.success("Task Created Sucessfully", {
                position: "top-center",
                autoClose: 998,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            }
            )
  return (
   <>
   <ToastContainer
                position="top-center"
                autoClose={998}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide} />
   </>
  )
}

export default Toaster