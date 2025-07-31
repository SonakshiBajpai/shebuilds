'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock data for admin dashboard
const mockAuditLogs = [
  {
    id: 1,
    userId: 'USR001',
    userName: 'Priya Sharma',
    action: 'Profile Updated',
    timestamp: '2024-01-15 14:30:22',
    details: 'Updated emergency contact information',
    severity: 'low'
  },
  {
    id: 2,
    userId: 'USR045',
    userName: 'Ananya Patel',
    action: 'Room Booking',
    timestamp: '2024-01-15 13:45:10',
    details: 'Booked room R-301 in Koramangala',
    severity: 'medium'
  },
  {
    id: 3,
    userId: 'USR023',
    userName: 'Kavya Reddy',
    action: 'Safety Alert',
    timestamp: '2024-01-15 12:15:33',
    details: 'Triggered SOS alert - False alarm, resolved',
    severity: 'high'
  },
  {
    id: 4,
    userId: 'USR067',
    userName: 'Sneha Gupta',
    action: 'Login Attempt',
    timestamp: '2024-01-15 11:20:45',
    details: 'Failed login attempt from new device',
    severity: 'medium'
  },
  {
    id: 5,
    userId: 'USR012',
    userName: 'Riya Singh',
    action: 'Account Created',
    timestamp: '2024-01-15 10:30:15',
    details: 'New user registration completed',
    severity: 'low'
  }
];

const mockRoomAssignments = [
  {
    id: 1,
    roomNumber: 'R-301',
    building: 'Koramangala Heights',
    tenant1: { name: 'Priya Sharma', id: 'USR001', status: 'active' },
    tenant2: { name: 'Ananya Patel', id: 'USR045', status: 'pending' },
    rent: 25000,
    startDate: '2024-02-01',
    endDate: '2024-08-01',
    status: 'occupied'
  },
  {
    id: 2,
    roomNumber: 'R-205',
    building: 'Indiranagar Plaza',
    tenant1: { name: 'Kavya Reddy', id: 'USR023', status: 'active' },
    tenant2: null,
    rent: 15000,
    startDate: '2024-01-15',
    endDate: '2024-07-15',
    status: 'partially-occupied'
  },
  {
    id: 3,
    roomNumber: 'R-102',
    building: 'HSR Layout Towers',
    tenant1: null,
    tenant2: null,
    rent: 32000,
    startDate: null,
    endDate: null,
    status: 'available'
  }
];

const mockEmergencyAlerts = [
  {
    id: 1,
    userId: 'USR023',
    userName: 'Kavya Reddy',
    type: 'SOS Alert',
    location: 'Koramangala Heights, Room R-301',
    timestamp: '2024-01-15 12:15:33',
    status: 'resolved',
    priority: 'high',
    responseTime: '3 minutes',
    assignedTo: 'Security Team A'
  },
  {
    id: 2,
    userId: 'USR078',
    userName: 'Meera Joshi',
    type: 'Medical Emergency',
    location: 'Indiranagar Plaza, Room R-405',
    timestamp: '2024-01-14 22:30:15',
    status: 'resolved',
    priority: 'critical',
    responseTime: '2 minutes',
    assignedTo: 'Emergency Response Unit'
  },
  {
    id: 3,
    userId: 'USR034',
    userName: 'Pooja Agarwal',
    type: 'Safety Concern',
    location: 'Electronic City Hub, Common Area',
    timestamp: '2024-01-14 18:45:22',
    status: 'investigating',
    priority: 'medium',
    responseTime: 'Ongoing',
    assignedTo: 'Safety Officer'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock authentication check
  useEffect(() => {
    const checkAuth = () => {
      // Mock admin check - in real app, this would verify JWT/session
      const isAdmin = localStorage.getItem('adminAuth') === 'true';
      if (!isAdmin) {
        // For demo purposes, set admin auth
        localStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D3EFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-poppins">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard.</p>
            <Link
              href="/dashboard"
              className="bg-[#7D3EFF] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#6F3CFF] transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const conflictData = [
    { month: 'Jul', conflicts: 12, resolved: 11 },
    { month: 'Aug', conflicts: 8, resolved: 8 },
    { month: 'Sep', conflicts: 15, resolved: 13 },
    { month: 'Oct', conflicts: 6, resolved: 6 },
    { month: 'Nov', conflicts: 10, resolved: 9 },
    { month: 'Dec', conflicts: 4, resolved: 4 },
    { month: 'Jan', conflicts: 7, resolved: 6 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 hidden sm:block">ElleMate Management Console</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block">
                                 <select
                   value={selectedTimeRange}
                   onChange={(e) => setSelectedTimeRange(e.target.value)}
                   className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white"
                 >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
              <div className="w-8 h-8 bg-[#7D3EFF] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'audit', label: 'Audit Logs', icon: '📋' },
              { id: 'rooms', label: 'Room Management', icon: '🏠' },
              { id: 'emergency', label: 'Emergency Alerts', icon: '🚨' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#7D3EFF] text-[#7D3EFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Rooms</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                    <p className="text-xs text-blue-600">85% occupancy</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Safety Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-yellow-600">2 resolved today</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹2.1M</p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent User Activity</h3>
                <div className="space-y-3">
                  {mockAuditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-2 h-2 rounded-full ${
                        log.severity === 'high' ? 'bg-red-500' : 
                        log.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{log.userName}</p>
                        <p className="text-xs text-gray-500">{log.action}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Emergency Alerts Status</h3>
                <div className="space-y-3">
                  {mockEmergencyAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`w-3 h-3 rounded-full ${
                        alert.status === 'resolved' ? 'bg-green-500' : 
                        alert.status === 'investigating' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{alert.type}</p>
                        <p className="text-xs text-gray-500 truncate">{alert.location}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {alert.responseTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">User Audit Log</h2>
                <div className="flex space-x-3">
                                     <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#7D3EFF] focus:border-transparent text-gray-900 bg-white">
                    <option>All Actions</option>
                    <option>Profile Updates</option>
                    <option>Bookings</option>
                    <option>Safety Alerts</option>
                    <option>Login Attempts</option>
                  </select>
                  <button className="bg-[#7D3EFF] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#6F3CFF] transition-colors">
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-sm text-gray-500">{log.userId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{log.details}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.severity === 'high' ? 'bg-red-100 text-red-800' :
                          log.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing 1 to {mockAuditLogs.length} of {mockAuditLogs.length} results
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Room Management Tab */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Room Assignment Manager</h2>
              <button className="bg-[#7D3EFF] text-white px-4 py-2 rounded-lg hover:bg-[#6F3CFF] transition-colors">
                Add New Room
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockRoomAssignments.map((room) => (
                <div key={room.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{room.roomNumber}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      room.status === 'occupied' ? 'bg-green-100 text-green-800' :
                      room.status === 'partially-occupied' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {room.status.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Building</p>
                      <p className="font-medium">{room.building}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Rent</p>
                      <p className="font-bold text-[#7D3EFF]">₹{room.rent.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Tenant 1:</span>
                      {room.tenant1 ? (
                        <span className="text-sm font-medium">{room.tenant1.name}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Vacant</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Tenant 2:</span>
                      {room.tenant2 ? (
                        <span className="text-sm font-medium">{room.tenant2.name}</span>
                      ) : (
                        <span className="text-sm text-gray-400">Vacant</span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-[#7D3EFF] text-white py-2 px-3 rounded-lg text-sm hover:bg-[#6F3CFF] transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Alerts Tab */}
        {activeTab === 'emergency' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Emergency Alert Board</h2>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-red-600 font-medium">Live Monitoring</span>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                    Test Alert System
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockEmergencyAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.priority === 'critical' ? 'bg-red-600' :
                            alert.priority === 'high' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{alert.userName}</div>
                          <div className="text-sm text-gray-500">{alert.userId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{alert.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          alert.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          alert.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.responseTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#7D3EFF] hover:text-[#6F3CFF] mr-3">View</button>
                        <button className="text-red-600 hover:text-red-800">Escalate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Conflict Trend Analysis</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Conflict Resolution</h3>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Total Conflicts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Resolved</span>
                  </div>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="relative h-64">
                <div className="absolute inset-0 flex items-end justify-between space-x-2">
                  {conflictData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                      <div className="w-full flex flex-col space-y-1">
                        <div 
                          className="bg-red-500 w-full rounded-t"
                          style={{ height: `${(data.conflicts / 20) * 200}px` }}
                        ></div>
                        <div 
                          className="bg-green-500 w-full"
                          style={{ height: `${(data.resolved / 20) * 200}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-600">Resolution Rate</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">2.3 days</p>
                  <p className="text-sm text-gray-600">Avg Resolution Time</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">62</p>
                  <p className="text-sm text-gray-600">Total Conflicts (6 months)</p>
                </div>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Conflict Types</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Cleanliness Issues', count: 23, percentage: 37 },
                    { type: 'Noise Complaints', count: 18, percentage: 29 },
                    { type: 'Guest Policy Violations', count: 12, percentage: 19 },
                    { type: 'Kitchen Usage', count: 9, percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.type}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#7D3EFF] h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Methods</h3>
                <div className="space-y-3">
                  {[
                    { method: 'Mediation', count: 35, percentage: 56 },
                    { method: 'Policy Clarification', count: 15, percentage: 24 },
                    { method: 'Room Reassignment', count: 8, percentage: 13 },
                    { method: 'Warning Issued', count: 4, percentage: 7 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.method}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 