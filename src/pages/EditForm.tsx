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
import { useParams } from "react-router-dom";

function EditForm() {
  let { id = "" } = useParams();
  const [person, setPerson] = useState<Record<string, any>>({});
  const [name, setName] = useState("");
  const [sibOrder, setSibOrder] = useState("");
  const [tubu, setTubu] = useState("");
  const [monding, setMonding] = useState("");

  const [rawFile, setRawFile] = useState<File | null>(null);
  const [croppedFile, setCroppedFile] = useState<Blob | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const headSnapshot = await getDoc(doc(db, "person", id));
        setPerson({
          id: id,
          ...headSnapshot.data(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    load();
    setLoading(false);
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
      console.log(modifiedName);
      const checkName = await getDocs(
        query(collection(db, "person"), where("name", "==", modifiedName)),
      );

      if (!checkName.empty) {
        alert("Name already exists");
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
        sibOrder: parseInt(sibOrder),
        sex: person.sex,
        tubu: tubuValue,
        monding: mondingValue,
        spouse: person.spouse,
        parentId: person.parentId || null,
        image: finalImageUrl,
      };

      console.log("Saving person:", data);
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
      <motion.div className="w-full max-w-md bg-neutral-900 border border-red-600/30 rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
          Ubah Data
        </h2>
        {!loading && (
          <div //circular card, scale up container
            className="relative size-40 mx-auto flex flex-col mb-4 items-center bg-red-500 border-red-500 rounded-full shadow-2xl/80"
          >
            <div //img container
              className="absolute left-1/2 flex size-full rounded-full bg-black -translate-x-1/2 items-center justify-center overflow-hidden"
            >
              <img
                src={
                  person.image
                    ? person.image
                    : person.sex === "F"
                      ? "/images/def_F.webp"
                      : "/images/def_M.webp"
                }
                alt={person.name}
                className="size-full object-cover"
              />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input style reusable */}

          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Name"
            value={person.name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Sibling Order"
            value={person.sibOrder}
            onChange={(e) => setSibOrder(e.target.value)}
          />

          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={person.tubu}
            onChange={(e) => setTubu(e.target.value)}
          />

          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={person.monding}
            onChange={(e) => setMonding(e.target.value)}
          />

          {/* Upload */}
          <div>
            <label className="text-sm text-gray-400">
              Upload Image (optional)
            </label>
            <input
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Uploading..." : "Add Member"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default EditForm;
