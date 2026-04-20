import { motion } from "framer-motion";
import { useState } from "react";
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

function PersonForm() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [tubu, setTubu] = useState("");
  const [monding, setMonding] = useState("");
  const [spouse, setSpouse] = useState("");
  const [parentId, setParentId] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // manual URL

  const [file, setFile] = useState<File | null>(null); // upload file

  const [loading, setLoading] = useState(false);

  // 🔥 Upload to Cloudinary
  async function uploadImage(file: File) {
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
    return data.secure_url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const checkId = await getDoc(doc(db, "person", id));

      if (checkId.exists()) {
        alert("Person ID already exists");
        setLoading(false);
        return;
      }
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
      if (file) {
        finalImageUrl = await uploadImage(file);
      } else if (imageUrl) {
        finalImageUrl = imageUrl;
      }

      const tubuValue = tubu ? Timestamp.fromDate(new Date(tubu)) : null;

      const mondingValue = monding
        ? Timestamp.fromDate(new Date(monding))
        : null;

      const spouseArray = spouse
        ? spouse.split(",").map((t) => t.trim())
        : null;

      const data = {
        name: modifiedName,
        sex,
        tubu: tubuValue,
        monding: mondingValue,
        spouse: spouseArray,
        parentId: parentId || null,
        image: finalImageUrl,
      };

      console.log("Saving person:", data);
      await setDoc(doc(db, "person", id), data);

      alert("Person added!");

      // reset
      setId("");
      setName("");
      setSex("");
      setTubu("");
      setMonding("");
      setSpouse("");
      setParentId("");
      setImageUrl("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error adding node");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-neutral-900 border border-red-600/30 rounded-2xl shadow-2xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
          Add Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input style reusable */}
          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="ID (e.g. RSRP)"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="text-sm text-gray-400 block mb-2">Sex</label>

            <div className="flex justify-center gap-4">
              {/* Male */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  value="M"
                  checked={sex === "M"}
                  onChange={(e) => setSex(e.target.value)}
                  className="accent-red-600"
                  required
                />
                <span className="text-white">Male</span>
              </label>

              {/* Female */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sex"
                  value="F"
                  checked={sex === "F"}
                  onChange={(e) => setSex(e.target.value)}
                  className="accent-red-600"
                  required
                />
                <span className="text-white">Female</span>
              </label>
            </div>
          </div>

          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={tubu}
            onChange={(e) => setTubu(e.target.value)}
          />

          <input
            type="date"
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            value={monding}
            onChange={(e) => setMonding(e.target.value)}
          />

          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Spouse (comma separated)"
            value={spouse}
            onChange={(e) => setSpouse(e.target.value)}
          />

          <input
            className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition"
            placeholder="Parent ID (optional)"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
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
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm text-gray-400">
              Or Image URL (optional)
            </label>
            <input
              className="w-full bg-black border border-neutral-700 focus:border-red-500 text-white rounded-lg px-3 py-2 outline-none transition mt-1"
              placeholder="https://..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

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

export default PersonForm;
