import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonForm from "./pages/PersonForm";
import Tree from "./pages/Tree";
import MainTree from "./pages/MainTree";
import EditForm from "./pages/EditForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/upload" element={<UploadImage />} /> */}
          <Route path="/form" element={<PersonForm />} />
          <Route path="/RSRP" element={<MainTree />} />
          <Route path="/tree/:head" element={<Tree />} />
          <Route path="/edit/:id" element={<EditForm />} />
          {/* <Route path=":head" element={<TreeG1 />}></Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
