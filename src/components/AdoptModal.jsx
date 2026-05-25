import React from 'react'

const AdoptModal = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Adopt {pet.name}</h3>
          
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-5 rounded-xl text-center space-y-2">
              <h4 className="font-bold text-lg">🎉 Request Submitted!</h4>
              <p className="text-sm">Your application for {pet.name} is now <strong className="font-semibold">pending</strong> review.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Pet Name</label>
                <input 
                  type="text" 
                  value={pet.name} 
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
                <input 
                  type="date" 
                  required
                  value={formData.pickupDate} 
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  className="p-2.5 rounded-lg border border-slate-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Message to Shelter <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows="4"
                  required
                  placeholder="Tell us about your experience with pets..."
                  value={formData.message} 
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="p-2.5 rounded-lg border border-slate-300 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-y transition-colors font-sans" 
                />
              </div>

              <button 
                type="submit" 
                className="mt-2 bg-[#d65a31] hover:bg-[#be4f29] text-white py-3 px-4 rounded-lg font-semibold text-base transition-colors shadow-sm cursor-pointer"
              >
                Adopt Now
              </button>
            </form>
          )}
        </div>
  )
}

export default AdoptModal
