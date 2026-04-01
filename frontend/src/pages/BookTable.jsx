import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const BookTable = () => {
  const { axios, navigate, user } = useContext(AppContext);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // Re-check auth from API because user context can still be null on initial load.
      if (!user) {
        const { data: authData } = await axios.get("/api/auth/is-auth");
        if (!authData?.success) {
          toast.error("Please login to book a table");
          navigate("/login");
          return;
        }
      }

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        numberOfPeople: Number(formData.numberOfPeople),
        date: formData.date,
        time: formData.time,
        note: formData.note.trim(),
      };

      const { data } = await axios.post("/api/booking/create", payload);

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Book a Table</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            placeholder="Number of Guests"
            min="1"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
          rows="3"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};
export default BookTable;