import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import Logo from '../assets/img/event-logo.jpg'; // Replace with actual org logo
import { FiCalendar, FiUsers, FiLogOut, FiPlus, FiSearch,FiFilter } from 'react-icons/fi'; // Using Feather Icons for elegance

// Sample event data (replace with actual API calls)
const sampleEvents = [
  { id: 1, title: 'Tech Conference 2025', date: '2025-05-15', location: 'Convention Center, Mumbai' },
  { id: 2, title: 'Summer Music Festival', date: '2025-06-20', location: 'Beach Resort, Goa' },
  { id: 3, title: 'Art Exhibition Opening', date: '2025-07-10', location: 'City Art Gallery, Delhi' },
];

// Sample guest data (replace with actual API calls)
const sampleGuests = [
  { id: 101, name: 'Priya Sharma', email: 'priya.sharma@example.com', event: 'Tech Conference 2025' },
  { id: 102, name: 'Rahul Verma', email: 'rahul.verma@example.com', event: 'Summer Music Festival' },
  { id: 103, name: 'Sneha Patel', email: 'sneha.patel@example.com', event: 'Tech Conference 2025' },
  { id: 104, name: 'Amit Singh', email: 'amit.singh@example.com', event: 'Art Exhibition Opening' },
];


function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(sampleEvents);
  const [activeTab, setActiveTab] = useState('events'); 
  const [guests, setGuests] = useState(sampleGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // You can expand filter options

  const organizationName = 'Innovate Events Corp'; // Replace with actual org name

  const handleLogout = () => {
    // Implement your logout logic (e.g., clearing tokens, local storage)
    navigate('/login'); // Redirect to login page after logout
  };

  const handleDeleteEvent = (eventId) => {
    // Implement delete event logic (API call)
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSearch=()=>{
    console.log("Search handled");
    
  }
  const handleFilterChange=()=>{
    console.log("Filter handled")
  }
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="bg-indigo-700 text-white w-64 flex flex-col shadow-md">
        <div className="p-4 flex flex-col items-center">
          <img src={Logo} alt="Organization Logo" className="h-16 w-16 rounded-full object-cover mb-2" />
          <h2 className="text-lg font-semibold">{organizationName}</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/dashboard/events" // Define your route for events
            onClick={() => setActiveTab('events')}
            className={`flex items-center py-3 px-4 hover:bg-indigo-600 transition-colors ${activeTab === 'events' ? 'bg-indigo-600' : ''}`}
          >
            <FiCalendar className="mr-2" />
            Events
          </Link>
          <Link
            to="/dashboard/guests" // Define your route for guests
            onClick={() => setActiveTab('guests')}
            className={`flex items-center py-3 px-4 hover:bg-indigo-600 transition-colors ${activeTab === 'guests' ? 'bg-indigo-600' : ''}`}
          >
            <FiUsers className="mr-2" />
            Guests
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center py-3 px-4 hover:bg-indigo-600 transition-colors mt-auto"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeTab === 'events' ? 'Your Events' : 'Registered Guests'}
          </h1>

          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative mr-2">
                    <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Events..."
                      className="pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  {/* Add Filter Dropdown if needed */}
                  <div className="relative">
                    <FiFilter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={filterOption}
                      onChange={handleFilterChange}
                    >
                      <option value="all">All Events</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>
                <Link
                  to="/events/add" // Define your add event route
                  className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <FiPlus className="inline mr-1" /> Add Event
                </Link>
              </div>

              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-1">Date: {event.date}</p>
                      <p className="text-gray-600 mb-2">Location: {event.location}</p>
                      <div className="flex space-x-2">
                        <Link
                          to={`/events/edit/${event.id}`} // Define your edit event route
                          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events created yet.</p>
              )}
            </div>
          )}

          {activeTab === 'guests' && (
            <div>
              {guests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map(guest => (
                        <tr key={guest.id}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {guest.name}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {guest.email}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {guest.event}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {/* Add guest management actions here - can also use Link if navigating to a specific guest profile */}
                            <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none mr-2">View</button>
                            <button className="text-red-600 hover:text-red-800 focus:outline-none">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No guests registered yet.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default OrganizerDashboard;