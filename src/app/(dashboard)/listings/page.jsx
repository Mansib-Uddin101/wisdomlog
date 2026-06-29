"use client"
import DashboardPetCard from '@/components/DashboardPetCard'
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react'
import { Button, Input, Label, TextArea, TextField } from "@heroui/react";
import toast from "react-hot-toast";
const MyListingsPage = () => {
  const session = authClient.useSession()
  const userId = session?.data?.user?.id;

  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Modal States ---
  // Delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  // Update
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [petToUpdate, setPetToUpdate] = useState(null);

  // Requests
  const [requestsModalOpen, setRequestsModalOpen] = useState(false);
  const [activeRequests, setActiveRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [currentPetRequestsTitle, setCurrentPetRequestsTitle] = useState("");

  const fetchMyPets = async () => {
    try {
      const res = await fetch(`http://localhost:8000/my-listings?ownerId=${userId}`);
      const data = await res.json();
      setPetsData(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchMyPets();
  }, [userId]);

  const openDeleteModal = (pet) => {
    setPetToDelete(pet);
    setDeleteModalOpen(true);
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/pets/${petToDelete._id}`, {
        method: 'DELETE',
      });
      // Update UI after delete
      setPetsData((prev) => prev.filter(p => p._id !== petToDelete._id));
      setDeleteModalOpen(false);
      setPetToDelete(null);
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  }

  // UPDATE HANDLERS
  const openUpdateModal = (pet) => {
    setPetToUpdate(pet);
    setUpdateModalOpen(true);
  }

  // Ensure this state initialization is at the top of MyListingsPage.jsx
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`http://localhost:8000/pets/${petToUpdate._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petToUpdate),
      });

      if (!res.ok) throw new Error('Failed to update pet details.');

      const updatedPet = await res.json();

      setPetsData((prev) => prev.map(p => p._id === updatedPet._id ? updatedPet : p));
      toast.success("Pet listing updated successfully! 🐾");
      setUpdateModalOpen(false);
      setPetToUpdate(null);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // REQUESTS HANDLERS
  const openRequestsModal = async (pet) => {
    setRequestsModalOpen(true);
    setCurrentPetRequestsTitle(pet.name); // Using pet name for title
    setRequestsLoading(true);
    try {
      // Assuming you have an endpoint that fetches requests by pet ID
      const res = await fetch(`http://localhost:8000/pet-requests?petId=${pet._id}`);
      const data = await res.json();
      setActiveRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setRequestsLoading(false);
    }
  }

  const handleRequestAction = async (requestId, newStatus) => {
  try {
    // Normalize status to lowercase to match the backend expectations perfectly
    const normalizedStatus = newStatus.toLowerCase();

    const res = await fetch(`http://localhost:8000/requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: normalizedStatus }),
    });

    if (res.ok) {
      // Update the local state using the normalized lowercase status
      setActiveRequests(prev => prev.map(req =>
        req._id === requestId ? { ...req, status: normalizedStatus } : req
      ));

      // This conditional execution will now work flawlessly
      if (normalizedStatus === 'approved') {
        fetchMyPets();
      }
    } else {
      console.error(`Backend failed to update request to ${normalizedStatus}`);
    }
  } catch (error) {
    console.error(`Failed to ${newStatus} request:`, error);
  }
}

  if (session.isPending || (userId && loading)) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <p className='text-slate-500 font-medium animate-pulse'>Loading your listings...</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <p className='text-slate-500 font-medium'>Please log in to view your listings.</p>
      </div>
    );
  }

  const totalListings = petsData.length;
  const adoptedCount = petsData.filter(pet => pet.status !== 'available').length;
  const availableCount = totalListings - adoptedCount;

  return (
    <div className='min-h-screen bg-slate-50/50 pb-16 relative'>
      <div className='bg-white pt-12 pb-8 border-b border-slate-200 shadow-sm'>
        <div className='w-5/6 mx-auto'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight'>
            My Listings
          </h1>
          <p className='text-slate-500 mt-2 text-sm md:text-base'>
            Manage your pet adoption listings, view requests, and update statuses.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
            <div className='bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col'>
              <span className='text-slate-500 text-sm font-medium'>Total Listings</span>
              <span className='text-3xl font-bold text-slate-800 mt-1'>{totalListings}</span>
            </div>
            <div className='bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col'>
              <span className='text-emerald-600 text-sm font-medium'>Available</span>
              <span className='text-3xl font-bold text-emerald-700 mt-1'>{availableCount}</span>
            </div>
            <div className='bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col'>
              <span className='text-blue-600 text-sm font-medium'>Adopted</span>
              <span className='text-3xl font-bold text-blue-700 mt-1'>{adoptedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <main className='w-5/6 mx-auto mt-10'>
        {petsData.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300'>
            <h3 className='text-lg font-semibold text-slate-700 mb-2'>No listings found</h3>
            <p className='text-slate-400'>You haven't posted any pets for adoption yet.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {petsData.map((pet) => (
              <DashboardPetCard
                key={pet._id}
                petInfo={pet}
                onDelete={() => openDeleteModal(pet)}
                onUpdate={() => openUpdateModal(pet)}
                onViewRequests={() => openRequestsModal(pet)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ================= MODALS ================= */}

      {/* 1. DELETE MODAL */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Listing?</h2>
            <p className="text-slate-500 mb-6">Are you sure you want to delete {petToDelete?.name}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPLETE UPDATE MODAL */}
      {updateModalOpen && petToUpdate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl my-8 max-h-[90vh] flex flex-col">

            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-slate-800">Edit Pet Listing</h2>
              <button
                onClick={() => setUpdateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col gap-4 overflow-y-auto pr-2 grow">

              {/* Row 1: Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField className="w-full" name="name" type="text" isRequired>
                  <Label>Pet Name</Label>
                  <Input
                    value={petToUpdate.name || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, name: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>

                <TextField className="w-full" name="category" type="text" isRequired>
                  <Label>Category / Species (e.g., Dog, Cat)</Label>
                  <Input
                    value={petToUpdate.category || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, category: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>
              </div>

              {/* Row 2: Breed & Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField className="w-full" name="breed" type="text" isRequired>
                  <Label>Breed</Label>
                  <Input
                    value={petToUpdate.breed || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, breed: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>

                <TextField className="w-full" name="age" type="text" isRequired>
                  <Label>Age (e.g., 2 Months, 1 Year)</Label>
                  <Input
                    value={petToUpdate.age || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, age: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>
              </div>

              {/* Row 3: Gender & Adoption Fee */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField className="w-full" name="gender" type="text" isRequired>
                  <Label>Gender (Male/Female)</Label>
                  <Input
                    value={petToUpdate.gender || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, gender: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>

                <TextField className="w-full" name="adoptionFee" type="number" isRequired>
                  <Label>Adoption Fee (৳)</Label>
                  <Input
                    value={petToUpdate.adoptionFee || ""}
                    onChange={(e) => setPetToUpdate({ ...petToUpdate, adoptionFee: e.target.value })}
                    className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                  />
                </TextField>
              </div>

              {/* Row 4: Image URL */}
              <TextField className="w-full" name="imageUrl" type="text" isRequired>
                <Label>Image URL</Label>
                <Input
                  value={petToUpdate.imageUrl || ""}
                  onChange={(e) => setPetToUpdate({ ...petToUpdate, imageUrl: e.target.value })}
                  className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                />
              </TextField>

              {/* Row 5: Full Description */}
              <TextField className="w-full" name="description" isRequired>
                <Label>Pet Description / Medical History</Label>
                <TextArea
                  rows={4}
                  placeholder="Describe the pet's behaviors, vaccination status, habits..."
                  value={petToUpdate.description || ""}
                  onChange={(e) => setPetToUpdate({ ...petToUpdate, description: e.target.value })}
                  className="focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all border"
                />
              </TextField>

              {/* Actions Controls Sticky Footer */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100 shrink-0">
                <Button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="text-[#315579] text-[16px] bg-slate-50 border border-[#315579]"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  className="text-white text-[16px] bg-[#D66237] hover:bg-[#b54f2a] transition-all cursor-pointer px-6"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* 3. REQUESTS MODAL */}
      {requestsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Adoption Requests for {currentPetRequestsTitle}
              </h2>
              <button onClick={() => setRequestsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">&times;</button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-4">
              {requestsLoading ? (
                <p className="text-center text-slate-500 py-8">Loading requests...</p>
              ) : activeRequests.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No requests for this pet yet.</p>
              ) : (
                activeRequests.map((req) => (
                  <div key={req._id} className="border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">{req.requesterName}</h4>
                      <p className="text-sm text-slate-500">{req.message}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        <span className="font-medium">Pickup Date: </span>
                        {new Date(req.pickupDate).toLocaleDateString()}
                      </p>

                      {/* Show current status if not pending */}
                      {req.status !== 'Pending' && (
                        <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      )}
                    </div>

                    {req.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequestAction(req._id, 'approved')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestAction(req._id, 'rejected')}
                          className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-md transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MyListingsPage;