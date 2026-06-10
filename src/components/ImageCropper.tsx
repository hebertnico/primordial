import Cropper from "react-easy-crop";
import { useState } from "react";
import { getCroppedImg } from "../utils/cropImage";

type Props = {
  file: File;
  onCropDone: (file: Blob | null) => void;
};

function ImageCropper({ file, onCropDone }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  function onCropComplete(_: any, croppedAreaPixels: any) {
    setCroppedAreaPixels(croppedAreaPixels);
  }

  async function handleDone() {
    if (!croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(file, croppedAreaPixels);
    onCropDone(croppedImage);
  }

  return (
    <div className="w-75 h-auto mx-auto flex flex-col justify-center items-center gap-5">
      <div className="relative size-75 overflow-hidden">
        <Cropper
          image={URL.createObjectURL(file)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <button
        type="button"
        className=" w-50 h-10 z-50 bg-red-600 hover:bg-red-700 text-white font-semibold py-1 rounded-lg transition disabled:opacity-50 cursor-pointer"
        onClick={handleDone}
      >
        Upload
      </button>
    </div>
  );
}

export default ImageCropper;
