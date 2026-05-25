
import Banner from "@/components/Banner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <div className="">
          {children}
        </div>          
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout