import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiTag } from 'react-icons/fi';

// Sample event data (replace with your actual data fetching)
const sampleEvents = [
  { id: 1, title: 'Tech Conference 2025', date: '2025-05-15', time: '09:00', location: 'Convention Center, Mumbai', description: 'Annual tech conference', category: 'Technology' },
  { id: 2, title: 'Summer Music Festival', date: '2025-06-20', time: '18:00', location: 'Beach Resort, Goa', description: 'Live music and fun', category: 'Music' },
  // ... more events
];

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch event data based on the ID from the route params
    const foundEvent = sampleEvents.find((e) => e.id === parseInt(id));
    if (foundEvent) {
      setEvent(foundEvent);
      setTitle(foundEvent.title);
      setDate(foundEvent.date);
      setTime(foundEvent.time);
      setLocation(foundEvent.location);
      setDescription(foundEvent.description);
      setCategory(foundEvent.category);
    } else {
      // Handle case where event is not found (e.g., redirect to events list)
      navigate('/dashboard/events');
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'time':
        setTime(value);
        break;
      case 'location':
        setLocation(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Event title is required';
      isValid = false;
    }

    if (!date.trim()) {
      newErrors.date = 'Event date is required';
      isValid = false;
    }

    if (!time.trim()) {
      newErrors.time = 'Event time is required';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Event location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && event) {
      // In a real application, you would send the updated data to your API
      const updatedEvent = {
        id: event.id,
        title,
        date,
        time,
        location,
        description,
        category,
      };
      console.log('Updated Event Data:', updatedEvent);
      // After successful submission, you might navigate back to the events list
      navigate('/dashboard/events');
    }
  };

  if (!event) {
    return <div>Loading event details...</div>; // Or a more informative loading state
  }

  return (
    <div className="flex-1 p-6 flex justify-center items-start">
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 lg:w-1/2">
        <div className="mb-4">
          <Link to="/dashboard/events" className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <FiArrowLeft className="mr-2" /> Back to Events
          </Link>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">Edit Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-500" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.date ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiClock className="text-gray-500" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={time}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.time ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.time && <p className="text-red-500 text-xs italic">{errors.time}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="text-gray-500" />
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-500" />
              </div>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;