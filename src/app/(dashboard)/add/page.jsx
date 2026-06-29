"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const AddPetForm = () => {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        // Helper function to capitalize select dropdown values nicely
        const formatString = (str) => {
            if (!str) return "";
            return str
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        // Construct the payload to match your exact format
        const finalPayload = {
            name: formValues.name,
            species: formatString(formValues.species),
            breed: formValues.breed,
            age: formValues.age,
            gender: formatString(formValues.gender),
            imageUrl: formValues.imageUrl,
            healthStatus: formValues.healthStatus,
            vaccinationStatus: formatString(formValues.vaccinationStatus),
            location: formValues.location,
            adoptionFee: Number(formValues.adoptionFee) || 0, // Enforce number type
            description: formValues.description,
            ownerEmail: user?.email || "",
            status: "available", // Default constant
            createdAt: new Date().toISOString(), // Standard UTC timestamp
            ownerId: user?.id || "12345678988" // dynamically pull user ID or fallback
        };

        const {data:tokenData} = await authClient.token()
        const res = await fetch('http://localhost:8000/pets', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(finalPayload)
        });

        if(!res.ok){
            toast.error("Error! Please log in")
        }
        else{
            toast.success("Pet added successfully! 🐾")
        }
        ;
        

    };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-4 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Add New Pet</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Share details to list a pet for adoption.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name <span className="text-red-500">*</span></label>
                            {/* Changed name from "petName" to "name" */}
                            <input name="name" type="text" required placeholder="e.g., Luna" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Species <span className="text-red-500">*</span></label>
                            <select name="species" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition bg-white">
                                <option value="">Select Species</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="bird">Bird</option>
                                <option value="rabbit">Rabbit</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Breed <span className="text-red-500">*</span></label>
                            <input name="breed" type="text" required placeholder="e.g., Persian / Golden Retriever" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-red-500">*</span></label>
                                <input name="age" type="text" required placeholder="e.g., 2 years / 3 months" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                                <select name="gender" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition bg-white">
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Health Status <span className="text-red-500">*</span></label>
                            <input name="healthStatus" type="text" required placeholder="e.g., Healthy, energetic" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vaccination Status <span className="text-red-500">*</span></label>
                            <select name="vaccinationStatus" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition bg-white">
                                <option value="">Select Status</option>
                                <option value="fully-vaccinated">Fully Vaccinated</option>
                                <option value="partially-vaccinated">Partially Vaccinated</option>
                                <option value="not-vaccinated">Not Vaccinated</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                            <input name="location" type="text" required placeholder="e.g., Dhaka, Bangladesh" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adoption Fee (৳) <span className="text-red-500">*</span></label>
                            <input name="adoptionFee" type="number" required min="0" placeholder="Enter 0 if free" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                            <input name="imageUrl" type="url" required placeholder="https://imgbb.com/your-hosted-image-link" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition" />
                            <p className="text-xs text-gray-400 mt-1">Please upload your image to ImgBB or PostImage and paste the direct link here.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                            <textarea name="description" required rows="4" placeholder="Tell potential adopters about your pet's personality, habits, and requirements..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D0623A] focus:border-transparent transition resize-none"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Owner Email (Read-Only)</label>
                            {!user ? (
                                <div className="w-full h-9 bg-gray-100 animate-pulse rounded-lg" />
                            ) : (
                                <input name="ownerEmail" type="email" readOnly value={user.email} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full md:w-auto px-6 py-3 bg-[#D0623A] hover:bg-[#b8532f] text-white font-medium rounded-lg transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D0623A]">
                        Publish Pet Listing
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPetForm;