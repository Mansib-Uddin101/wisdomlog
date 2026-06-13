import Navbar from "@/components/Navbar"

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <div className="">
          {children}
        </div>          
      </main>
    </div>
  )
}

export default MainLayout