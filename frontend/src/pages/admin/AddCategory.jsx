import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      toast.error("Category name and image are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/category/add",
        formData,
        {
          withCredentials: true, // 🔥 REQUIRED FOR AUTH
        }
      );

      if (data.success) {
        toast.success(data.message || "Category added");
        navigate("/admin/categories");
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5 bg-white p-6 rounded-lg shadow"
      >
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-1/2 mx-auto rounded"
          />
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter category name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Category Image *
          </label>

          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-sm text-gray-600">
              {image ? image.name : "Click to upload image"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
