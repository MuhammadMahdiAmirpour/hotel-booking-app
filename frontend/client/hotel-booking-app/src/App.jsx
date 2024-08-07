import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import EditRoom from './components/room/EditRoom'
import Home from './components/home/Home'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from "./components/room/ExistingRooms"
import NavBar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <main>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
            <Route path="/existing-rooms" element={<ExistingRooms/>}/>
            <Route path="/add-room" element={<AddRoom/>}/>
            {/* Add more routes here as needed */}
          </Routes>
        </div>
        <Footer/>
      </Router>
    </main>

  )
}

export default App
