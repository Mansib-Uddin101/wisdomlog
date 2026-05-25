

const PetDetailsPage = async ({ params }) => {
  const { id } = await params
  const res = await fetch(`http://localhost:8000/pets/${id}`)  
  const singlePetData = await res.json()  

  const currentUser = {
    name: "John Doe",
    email: "johndoe@example.com"
  };

  const pet = {
    id: 2,
    name: "Whiskers",
    category: "Cat",
    breed: "Siamese",
    age: "1 year",
    adoptionFee: 500,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600",
    description: "Whiskers is an affectionate, energetic, and incredibly vocal Siamese companion looking for a loving home. She loves chasing laser pointers and cuddling on your lap during cold evenings. She gets along great with other friendly pets!",
    location: "Dhaka, Bangladesh"
  };

  
  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // const adoptionApplication = {
    //   petName: pet.name,
    //   userName: currentUser.name,
    //   userEmail: currentUser.email,
    //   pickupDate: formData.pickupDate,
    //   message: formData.message,
    // };

  };

  return (
    <div className="max-w-300 mx-auto px-5 py-10 font-sans text-slate-800">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Pet Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">

          <div className="relative w-full h-100 bg-slate-100">
            <img
              src={singlePetData.imageUrl}
              alt={singlePetData.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-amber-50 text-amber-800 border border-amber-200/50 font-bold text-xs px-3.5 py-1 rounded-full">
              {singlePetData.species}
            </span>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-3xl font-bold text-slate-900">{singlePetData.name}</h1>
              <span className="text-xl font-bold text-[#315579]">
                Fee: ৳{singlePetData.adoptionFee}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-slate-600">
              <div><strong className="text-slate-800">Breed:</strong> {singlePetData.breed}</div>
              <div><strong className="text-slate-800">Age:</strong> {singlePetData.age}</div>
              <div><strong className="text-slate-800">Location:</strong> {singlePetData.location}</div>
            </div>

            <hr className="border-t border-slate-200 my-6" />

            <h3 className="text-lg font-semibold text-slate-900 mb-3">About {singlePetData.name}</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">{singlePetData.description}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Adopt {singlePetData.name}</h3>

          <form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Pet Name</label>
              <input
                type="text"
                value={singlePetData.name}
                readOnly
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                value={currentUser.name}
                readOnly
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Your Email</label>
              <input
                type="email"
                value={currentUser.email}
                readOnly
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Target Pickup Date <span className="text-red-500">*</span>
              </label>
              {/* <input
                type="date"
                required
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="p-2.5 rounded-lg border border-slate-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
              /> */}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Message to Shelter <span className="text-red-500">*</span>
              </label>
              {/* <textarea
                rows="4"
                required
                placeholder="Tell us about your experience with pets..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="p-2.5 rounded-lg border border-slate-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-y transition-colors font-sans"
              /> */}
            </div>

            <button
              type="submit"
              className="mt-2 bg-[#d65a31] hover:bg-[#be4f29] text-white py-3 px-4 rounded-lg font-semibold text-base transition-colors shadow-sm cursor-pointer"
            >
              Adopt Now
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};

export default PetDetailsPage;