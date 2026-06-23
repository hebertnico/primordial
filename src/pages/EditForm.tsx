import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import ImageCropper from "../components/ImageCropper";
import { useNavigate, useParams } from "react-router-dom";
import { useNodeStore } from "../store/nodeStore";
import LoadingCircle from "../components/LoadingCircle";
import { CircleArrowLeft } from "lucide-react";

function EditForm() {
  let { id = "" } = useParams();

  const nodes = useNodeStore((s) => s.nodes);
  const person = nodes[id];
  // const [person, setPerson] = useState<Record<string, any>>({});
  const [name, setName] = useState("");
  const [sibOrder, setSibOrder] = useState(0);
  const [tubu, setTubu] = useState("");
  const [monding, setMonding] = useState("");

  const [rawFile, setRawFile] = useState<File | null>(null);
  const [croppedFile, setCroppedFile] = useState<Blob | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateNode = useNodeStore((s) => s.updateNode);

  useEffect(() => {
    setName(person?.name);
    setSibOrder(person?.sibOrder);
    if (person?.tubu != null) {
      // const dateTubu = new Date(person.tubu.seconds * 1000);
      setTubu(person.tubu.split("T")[0]);
    }
    if (person?.monding != null) {
      // const dateMonding = new Date(person.monding.seconds * 1000);
      setMonding(person.monding.split("T")[0]);
    }
  }, [id]);

  function transformImage(url: string) {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_300,h_300,c_fill/");
  }
  // 🔥 Upload to Cloudinary
  async function uploadImage(file: Blob) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // 👈 change this

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxpili9cr/image/upload", // 👈 change this
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    const finalUrl = transformImage(data.secure_url);
    return finalUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const modifiedName = name
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
      // console.log(modifiedName);
      const checkName = await getDocs(
        query(collection(db, "person"), where("name", "==", modifiedName)),
      );
      const bufferPerson: any = [];
      checkName.forEach((doc) => {
        bufferPerson.push({ id: doc.id, ...doc.data() });
      });

      if (!checkName.empty && bufferPerson[0].id != id) {
        alert("Name already exists");
        console.log(bufferPerson[0].id);
        setLoading(false);
        return;
      }

      let finalImageUrl: string | null = null;

      // 🔹 Priority: uploaded file > manual URL > null
      if (croppedFile) {
        finalImageUrl = await uploadImage(croppedFile);
      } else {
        finalImageUrl = person.image;
      }

      const tubuValue = tubu ? Timestamp.fromDate(new Date(tubu)) : null;

      const mondingValue = monding
        ? Timestamp.fromDate(new Date(monding))
        : null;

      const data = {
        name: modifiedName,
        sibOrder: sibOrder,
        sex: person.sex,
        tubu: tubuValue,
        monding: mondingValue,
        spouse: person.spouse,
        parentId: person.parentId || null,
        image: finalImageUrl,
      };

      console.log("Saving person:", data);
      updateNode(id, {
        name: modifiedName,
        sibOrder: sibOrder,
        tubu: tubu ?? null,
        monding: monding ?? null,
        image: finalImageUrl,
      });
      await setDoc(doc(db, "person", id), data);

      alert("Data berhasil diubah");
    } catch (err) {
      console.error(err);
      alert("Error adding node");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div //back button
        className="absolute flex items-center justify-center left-5 top-5 bg-my-cream size-15 cursor-pointer rounded-full shadow-2xl/80 z-50"
        onClick={() => {
          navigate(-1);
        }}
        whileTap={{ scale: 0.8 }}
      >
        <CircleArrowLeft size={45} color="var(--color-my-black)" />
      </motion.div>
      <motion.div className="w-full max-w-md bg-neutral-900 border border-red-600/30 rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
          Ubah Data
        </h2>
        <div className="relative size-40 mx-auto flex flex-col mb-4 items-center border-4 border-my-red rounded-full shadow-2xl/80">
          <div //img container
            className="absolute left-1/2 flex size-full rounded-full bg-my-black -translate-x-1/2 items-center justify-center overflow-hidden"
          >
            {loading ? (
              <LoadingCircle
                size={48}
                strokeWidth={4}
                color="var(--color-my-cream)"
              />
            ) : (
              <img
                src={
                  croppedFile
                    ? URL.createObjectURL(croppedFile)
                    : (person.image ??
                      (person.sex === "F"
                        ? "/images/def_F.webp"
                        : "/images/def_M.webp"))
                }
                alt={person.name}
                className="size-full object-cover"
              />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input style reusable */}
          <label className="text-sm text-my-white align-self-start">Name</label>
          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Name"
            value={name ?? ""}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-sm text-my-white align-self-start">
            Anak ke-
          </label>
          <input
            type="number"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Sibling Order"
            value={sibOrder ?? 0}
            onChange={(e) => setSibOrder(parseInt(e.target.value))}
          />

          <label className="text-sm text-my-white align-self-start">Tubu</label>
          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={tubu}
            onChange={(e) => setTubu(e.target.value)}
          />

          <label className="text-sm text-my-white align-self-start">
            Monding
          </label>
          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={monding}
            onChange={(e) => setMonding(e.target.value)}
          />

          {/* Upload */}
          <div>
            <label className="text-sm text-white" htmlFor="fotoHu">
              Upload Photo
            </label>
            <input
              id="fotoHu"
              type="file"
              accept="image/*"
              className="w-full mt-1 text-sm text-gray-300 file:bg-red-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-md file:cursor-pointer hover:file:bg-red-700"
              onChange={(e) => setRawFile(e.target.files?.[0] || null)}
            />
          </div>

          {rawFile && (
            <ImageCropper
              file={rawFile}
              onCropDone={(file) => {
                setCroppedFile(file);
                setRawFile(null);
              }}
            />
          )}

          {/* Button */}
          <span
            onClick={() => {
              console.log(croppedFile);
              rawFile != null &&
                alert(
                  `Upload gambarnya dulu, ${person.sex === "M" ? "amang" : "inang"}`,
                );
            }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              disabled={loading || rawFile != null}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 cursor-pointer disabled:pointer-events-none"
            >
              {loading ? "Uploading..." : "Submit"}
            </motion.button>
          </span>
        </form>
      </motion.div>
    </div>
  );
}

export default EditForm;
