import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonForm from "./pages/PersonForm";
import Tree from "./pages/Tree";
import MainTree from "./pages/MainTree";
import EditForm from "./pages/EditForm";
import Navbar from "./components/Navbar";
import { useNodeStore } from "./store/nodeStore";
import { useEffect, useRef, useState } from "react";
import { loadTree } from "./utils/loadTree";
import { buildChildrenMap } from "./utils/buildChildrenMap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import SpecialTree from "./pages/SpecialTree";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  const setTree = useNodeStore((s) => s.setTree);

  const musicRef = useRef<{
    play: () => Promise<void>;
    pause: () => void;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async () => {
    await musicRef.current?.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    musicRef.current?.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    async function init() {
      const state = useNodeStore.getState();
      const metaCache = await getDoc(doc(db, "metadata", "cache"));

      if (metaCache.data()?.version === state.treeVersion) {
        console.log("using cached tree");
        return;
      }

      const nodes = await loadTree();

      const childrenMap = buildChildrenMap(nodes);

      setTree(nodes, childrenMap, metaCache.data()?.version);

      console.log("Tree loaded:", Object.keys(nodes).length);
    }

    init();
  }, [setTree]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar isPlaying={isPlaying} onPlay={playMusic} onPause={pauseMusic} />
      <main className="">
        <MusicPlayer ref={musicRef} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isPlaying={isPlaying}
                onPlay={playMusic}
                onPause={pauseMusic}
              />
            }
          />
          {/* <Route path="/upload" element={<UploadImage />} /> */}
          <Route path="/form" element={<PersonForm />} />
          <Route path="/RSRP" element={<MainTree />} />
          <Route path="/tree/:head" element={<Tree />} />
          <Route path="/tree2/:head" element={<SpecialTree />} />
          <Route path="/edit/:id" element={<EditForm />} />
          {/* <Route path=":head" element={<TreeG1 />}></Route> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
