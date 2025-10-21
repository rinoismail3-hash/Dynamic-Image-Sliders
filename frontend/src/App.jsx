import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./components/ImageUpload";
import ImageSlider from "./components/ImageSlider";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUpload = () => setRefresh(!refresh);

  const showToast = (type, message) => {
    if (type === "success") toast.success(message);
    else toast.error(message);
  };

  return (
    <div className="App">
      <h1>Dynamic Image Slider</h1>
      <ImageUpload onUpload={handleUpload} showToast={showToast} />
      <ImageSlider refresh={refresh} showToast={showToast} />
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;
