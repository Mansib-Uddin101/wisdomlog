
import AdoptForm from "@/components/AdoptForm";
import Image from "next/image";

const PetDetailsPage = async ({ params }) => {
  
  
  const { id } = await params
  const res = await fetch(`http://localhost:8000/pets/${id}`)  
  const singlePetData = await res.json()  
  const petName =singlePetData.name;
  const ownerId = singlePetData.ownerId
  
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

  return (
    <div className="max-w-5/6 mx-auto px-5 py-10 font-sans text-slate-800">

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        <div className="lg:col-span-3 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">

          <div className="relative w-full md:w-5/6 mx-auto h-100 md:pt-4">
            <Image
              src={singlePetData.imageUrl}
              alt={singlePetData.name}
              width={400}
              height={400}
              className="w-full h-100 object-cover md:rounded-2xl shadow-xl"
            />
            
          </div>

          <div className="m-8 pt-2 mx-auto w-5/6">
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-[36px] font-bold text-slate-900">{singlePetData.name}</h1>
              <span className="text-xl font-bold text-[#315579]">
                Fee: ৳{singlePetData.adoptionFee}
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-2 mb-6 text-slate-600">
              <div><strong className="text-slate-800">Species:</strong> {singlePetData.species}</div>
              <div><strong className="text-slate-800">Breed:</strong> {singlePetData.breed}</div>
              <div><strong className="text-slate-800">Age:</strong> {singlePetData.age}</div>
              <div><strong className="text-slate-800">Location:</strong> {singlePetData.location}</div>
              <div><strong className="text-slate-800">Vaccination Status:</strong> {singlePetData.vaccinationStatus}</div>
            </div>

            <hr className="border-t border-slate-200 my-6" />

            <h3 className="text-lg font-semibold text-slate-900 mb-3">About {singlePetData.name}</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">{singlePetData.description}</p>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200 sticky top-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Adopt {singlePetData.name}</h3>

          <AdoptForm petName={petName} ownerId={ownerId}/>

        </div>

      </div>
    </div>
  );
};

export default PetDetailsPage;