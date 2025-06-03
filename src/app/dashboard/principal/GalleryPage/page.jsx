import Galleryuploader from "@/components/Galleryuploader";
import GalleryList from "@/components/GalleryList";

export default function GalleryPage() {
  return (
    <div className="p-6 space-y-6">
      <Galleryuploader />
      <GalleryList />
    </div>
  );
}
