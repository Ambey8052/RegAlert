import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    eventDate: "",
    registrationLink: "",
    emailUsed: "",
    passwordUsed: "",
    reminderTime: "",
  });

  // Protect Route + Fetch Events
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    } else {
      fetchEvents();
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get("/events");
      setEvents(data);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/events", formData);
      alert("Event Added Successfully!");
      setFormData({
        title: "",
        organization: "",
        eventDate: "",
        registrationLink: "",
        emailUsed: "",
        passwordUsed: "",
        reminderTime: "",
      });
      fetchEvents();
    } catch (error) {
      alert("Error adding event");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">RegAlert Dashboard</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Add Event Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 grid gap-4"
      >
        <h2 className="text-xl font-semibold mb-2">Add New Event</h2>

        <input
          name="title"
          value={formData.title}
          placeholder="Event Title"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="organization"
          value={formData.organization}
          placeholder="Organization Name"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="datetime-local"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="registrationLink"
          value={formData.registrationLink}
          placeholder="Registration Link"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="emailUsed"
          value={formData.emailUsed}
          placeholder="Email Used"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="passwordUsed"
          value={formData.passwordUsed}
          placeholder="Password Used"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="reminderTime"
          value={formData.reminderTime}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Event
        </button>
      </form>

      {/* Events List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-600">No events added yet.</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-4 rounded shadow"
              >
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p><strong>Organization:</strong> {event.organization}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleString()}
                </p>
                {event.registrationLink && (
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open Link
                    </a>
                  </p>
                )}
                {event.emailUsed && (
                  <p><strong>Email Used:</strong> {event.emailUsed}</p>
                )}
                {event.passwordUsed && (
                  <p><strong>Password Used:</strong> {event.passwordUsed}</p>
                )}
                {event.reminderTime && (
                  <p>
                    <strong>Reminder:</strong>{" "}
                    {new Date(event.reminderTime).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
