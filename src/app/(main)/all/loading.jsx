import React from 'react'

const Loading = () => {
  const skeletonCards = Array.from({ length: 8 })

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 animate-pulse">
      <div className="bg-linear-to-b from-orange-50/30 to-transparent pt-12 pb-8 border-b border-slate-100">
        <div className="w-5/6 mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <div className="h-5 w-28 bg-slate-200 rounded-full"></div>
            <div className="h-9 w-64 md:w-80 bg-slate-200 rounded-xl"></div>
            <div className="h-4 w-full max-w-md bg-slate-200 rounded-lg"></div>
          </div>

          <div className="h-9 w-40 bg-white border border-slate-100 rounded-xl shadow-sm self-start md:self-auto"></div>
        </div>
      </div>

      <main className="w-5/6 mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
            >
              <div className="aspect-4/3 bg-slate-200 w-full relative">
                <div className="absolute top-3 left-3 h-5 w-14 bg-slate-300/60 rounded-full"></div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-1/3 bg-slate-200 rounded-lg"></div>
                  
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-slate-100 rounded"></div>
                    <div className="h-3 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="h-9 bg-slate-100 rounded-xl border border-slate-200"></div>
                  <div className="h-9 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Loading