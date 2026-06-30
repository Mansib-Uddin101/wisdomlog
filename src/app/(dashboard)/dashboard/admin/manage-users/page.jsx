'use client';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Shield, Trash2, Loader2 } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null });

  // 1. Fetch Users on Component Mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: tokenData } = await authClient.token()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${tokenData?.token}`
            },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch users data');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        toast.error(error.message || 'Error loading users.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 2. Promote User to Admin
  const handlePromote = async (userId) => {
    try {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      if (!res.ok) throw new Error('Failed to update user role');

      // Update UI Optimistically
      setUsers(users.map(u => u._id === userId ? { ...u, role: 'admin' } : u));
      toast.success('User promoted to Admin successfully!');
    } catch (error) {
      toast.error(error.message || 'Could not promote user.');
    }
  };

  // 3. Delete User Permanently
  const confirmDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${deleteModal.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`
        },
      });

      if (!res.ok) throw new Error('Failed to delete user account');

      // Update UI Optimistically
      setUsers(users.filter(u => u._id !== deleteModal.userId));
      toast.success('User account deleted.');
    } catch (error) {
      toast.error(error.message || 'Could not delete user.');
    } finally {
      setDeleteModal({ isOpen: false, userId: null });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      <h1 className="text-3xl font-bold text-[#1E293B]">Manage Users</h1>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600">
              <th className="p-4 font-medium">User Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Total Lessons</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#0F766E]" /> Loading users...
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-slate-500">
                  No users found on the platform.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-[#1E293B]">{user.name || 'Unknown User'}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                        ? 'bg-[#0F766E]/10 text-[#0F766E]'
                        : 'bg-slate-100 text-slate-600'
                      }`}>
                      {user.role === 'admin' ? 'admin' : 'user  '}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{user.totalLessons || 0}</td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handlePromote(user._id)}
                        className="p-2 text-[#0F766E] hover:bg-[#0F766E]/10 rounded-lg transition-colors"
                        title="Promote to Admin"
                      >
                        <Shield className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, userId: user._id })}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-bold text-[#1E293B] mb-2">Delete User?</h3>
            <p className="text-slate-500 mb-6 text-sm">Are you sure you want to permanently delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, userId: null })}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}