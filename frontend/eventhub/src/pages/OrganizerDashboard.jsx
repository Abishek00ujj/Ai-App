import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/img/event-logo.jpg';
import { FiCalendar, FiUsers, FiLogOut, FiPlus, FiSearch, FiFilter, FiMenu, FiX } from 'react-icons/fi';

const sampleEvents = [
  { id: 1, title: 'Tech Conference 2025', date: '2025-05-15', location: 'Convention Center, Mumbai' },
  { id: 2, title: 'Summer Music Festival', date: '2025-06-20', location: 'Beach Resort, Goa' },
  { id: 3, title: 'Art Exhibition Opening', date: '2025-07-10', location: 'City Art Gallery, Delhi' },
];

const sampleGuests = [
  { id: 101, name: 'Priya Sharma', email: 'priya.sharma@example.com', event: 'Tech Conference 2025' },
  { id: 102, name: 'Rahul Verma', email: 'rahul.verma@example.com', event: 'Summer Music Festival' },
  { id: 103, name: 'Sneha Patel', email: 'sneha.patel@example.com', event: 'Tech Conference 2025' },
  { id: 104, name: 'Amit Singh', email: 'amit.singh@example.com', event: 'Art Exhibition Opening' },
  { id: 105, name: 'Lakshmi Nair', email: 'lakshmi.nair.long.email.example@reallylongdomainname.com', event: 'Art Exhibition Opening' }, // Example of long email
];

function OrganizerDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState(sampleEvents);
  const [activeTab, setActiveTab] = useState('events');
  const [guests, setGuests] = useState(sampleGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const organizationName = 'Innovate Events Corp';

  const handleLogout = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
    // Implement actual filter logic based on the selected option
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Navigation Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 bg-indigo-600 text-white p-2 rounded-md shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-indigo-700 text-white w-64 flex-shrink-0 shadow-md fixed top-0 left-0 h-full z-20 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col items-center">
          <img src={Logo} alt="Organization Logo" className="h-16 w-16 rounded-full object-cover mb-2" />
          <h2 className="text-lg font-semibold text-center">{organizationName}</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/dashboard/events"
            onClick={() => {
              setActiveTab('events');
              closeMobileMenu();
            }}
            className={`flex items-center py-3 px-4 hover:bg-indigo-600 transition-colors ${
              activeTab === 'events' ? 'bg-indigo-600' : ''
            }`}
          >
            <FiCalendar className="mr-2" />
            Events
          </Link>
          <Link
            to="/dashboard/guests"
            onClick={() => {
              setActiveTab('guests');
              closeMobileMenu();
            }}
            className={`flex items-center py-3 px-4 hover:bg-indigo-600 transition-colors ${
              activeTab === 'guests' ? 'bg-indigo-600' : ''
            }`}
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
      <div className="flex-1 p-6 md:ml-64">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {activeTab === 'events' ? 'Your Events' : 'Registered Guests'}
          </h1>

          {activeTab === 'events' && (
            <div>
              <div className="sm:flex items-center justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="relative mr-2 w-full sm:w-auto">
                    <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search Events..."
                      className="pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="relative ml-2 w-full sm:w-auto">
                    <FiFilter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      className="pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
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
                  to="/events/add"
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
                          to={`/events/edit/${event.id}`}
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
                        <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map(guest => (
                        <tr key={guest.id} className="sm:table-row flex-col sm:flex-row">
                          <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:table-cell">
                            <div className="font-medium">{guest.name}</div>
                          </td>
                          <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:table-cell">
                            <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-40">{guest.email}</div>
                          </td>
                          <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:table-cell">
                            {guest.event}
                          </td>
                          <td className="px-2 py-4 border-b border-gray-200 bg-white text-sm sm:table-cell flex sm:block">
                            <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none mr-2 mb-1 sm:mb-0 text-xs">View</button>
                            <button className="text-red-600 hover:text-red-800 focus:outline-none text-xs">Remove</button>
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
      </div>
    </div>
  );
}

export default OrganizerDashboard;