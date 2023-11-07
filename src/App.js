import "./css/App.css";
import Login from "./components/Login.js";
import Missing from "./components/Missing.js";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}
