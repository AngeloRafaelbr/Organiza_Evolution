// /resume
import Footer from "@/components/Footer/Footer"
import Navbar from "@/components/NavBar/NavBar"
import Home from "@/components/resume/Home"

export default function Resume() {
    return (
        
            <div className="cont">
                <Navbar />
                <div className="main">
                    <Home />
                </div>
                <Footer />
            </div>
        
    )
}