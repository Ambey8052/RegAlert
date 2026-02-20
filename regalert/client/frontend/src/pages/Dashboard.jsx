
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import API from "../utils/api";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    date: "",
    emailUsed: "",
    passwordUsed: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data } = await API.get("/events");
    setEvents(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/events", formData);
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await API.delete(`/events/${id}`);
    fetchEvents();
  };

  const now = new Date();

  const upcoming = events.filter(e => new Date(e.date) > now).length;
  const completed = events.filter(e => new Date(e.date) < now).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Navbar */}
      {/* <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">🚀 RegAlert Dashboard</h1>
        <div>
          <span className="mr-4">Welcome, {userInfo?.name}</span>
          <button
            onClick={() => {
              localStorage.removeItem("userInfo");
              window.location.href = "/";
            }}
            className="bg-white text-indigo-600 px-4 py-1 rounded-lg font-semibold hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div> */}

      <div className="p-6">

        {/* Stats Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-500">Total Registrations</h2>
            <p className="text-3xl font-bold text-indigo-600">{events.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-500">Upcoming Events</h2>
            <p className="text-3xl font-bold text-green-500">{upcoming}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-500">Completed Events</h2>
            <p className="text-3xl font-bold text-red-500">{completed}</p>
          </div>

        </div>

        {/* Add Event Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-indigo-600">➕ Add New Registration</h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
            <input
              type="url"
              name="link"
              placeholder="Registration Link"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="date"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="emailUsed"
              placeholder="Email Used"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="passwordUsed"
              placeholder="Password Used"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Registration
            </button>
          </form>
        </div>

        {/* Events Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-600">📅 Your Registrations</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-lg font-bold text-indigo-600 mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  📅 {new Date(event.date).toLocaleString()}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  📧 {event.emailUsed}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  🔒 {event.passwordUsed ? "••••••••" : "Not Stored"}
                </p>

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 underline text-sm"
                >
                  🔗 Open Registration
                </a>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;