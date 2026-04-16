import Person from "./components/Person";
import "./App.css";
import RG1 from "./components/RG1";
import RG2 from "./components/RG2";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Tree from "./components/Tree";
import { Home } from "lucide-react";

function App() {
  const [rg1act, setRg1Act] = useState(false);
  const [rg2act, setRg2Act] = useState(false);
  const [gen1Act, setGen1Act] = useState(false);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // When back button is pressed, check the state
      if (event.state && event.state.page === "rg1") {
        // Going back to /rg1 view
        setRg1Act(true);
        setRg2Act(false);
        setGen1Act(false);
      } else {
        // Going back to initial state
        setRg1Act(false);
        setRg2Act(false);
        setGen1Act(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handle1Gen1Change = (data: boolean) => {
    setGen1Act(data);
    if (data) {
      setRg1Act(true);
      setRg2Act(false);
    }
  };

  const handle2Gen1Change = (data: boolean) => {
    setGen1Act(data);
    if (data) {
      setRg2Act(true);
      setRg1Act(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":head" element={<Tree />} />
    </Routes>
    // <div className="h-screen relative mx-auto overflow-x-hidden overflow-y-hidden">
    //   {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> */}
    //   {/* <div className='relative inset-0'> */}
    //   <RG1
    //     exit={{ opacity: 0 }}
    //     rg1act={rg1act}
    //     rg2act={rg2act}
    //     transition={{ duration: 1, ease: "easeInOut" }}
    //     onSendData={handle1Gen1Change}
    //   />

    //   <Person
    //     person="SS"
    //     classname="absolute top-[50vh] left-85"
    //     size="size-[25vh]"
    //     animate={{ x: rg1act ? 210 : 0 }}
    //     exit={{ opacity: 0, x: -90 }}
    //     isVisible={!rg2act && !gen1Act}
    //     onClick={() => {
    //       setRg1Act(true);
    //       history.pushState({ page: "rg1" }, "", "/rg1");
    //     }}
    //     transition={{ duration: 1, ease: "easeInOut" }}
    //   />
    //   <Person
    //     person="RSRP"
    //     size="size-[30vh]"
    //     classname="absolute top-[50vh] left-[50vw]"
    //     animate={{
    //       x: rg1act ? 90 : rg2act ? -90 : 0,
    //       scale: rg1act ? 0.833 : rg2act ? 0.833 : 1,
    //     }}
    //     exit={{ opacity: 0, x: rg1act ? 180 : rg2act ? -90 : 0 }}
    //     onClick={() => {
    //       setRg1Act(false);
    //       setRg2Act(false);
    //       history.replaceState({}, "", "/");
    //     }}
    //     transition={{ duration: 1, ease: "easeInOut" }}
    //     isVisible={!gen1Act}
    //   />
    //   <Person
    //     person="SN"
    //     size="size-[25vh]"
    //     classname="absolute top-[50vh] right-45"
    //     animate={{ x: rg2act ? -210 : 0 }}
    //     exit={{ opacity: 0, x: 90 }}
    //     isVisible={!rg1act && !gen1Act}
    //     onClick={() => {
    //       setRg2Act(true);
    //       history.pushState({ page: "rg2" }, "", "/rg2");
    //     }}
    //     transition={{ duration: 1, ease: "easeInOut" }}
    //   />

    //   <RG2
    //     exit={{ opacity: 0 }}
    //     rg1act={rg1act}
    //     rg2act={rg2act}
    //     transition={{ duration: 1, ease: "easeInOut" }}
    //     onSendData={handle2Gen1Change}
    //   />
    // </div>
  );
}

export default App;
