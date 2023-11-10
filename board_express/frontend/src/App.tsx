import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/log-in";
import Detail from "./pages/detail";
import Signup from "./pages/sign-up";
import Create from "./pages/create";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:postId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
