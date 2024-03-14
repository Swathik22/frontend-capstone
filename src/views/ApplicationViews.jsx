import {Routes,Route, Outlet} from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Welcome } from "../components/welcome/Welcome"
import { useEffect, useState } from "react"
import { AllTickets } from "../components/tickets/AllTickets"
import { ViewTicket } from "../components/tickets/ViewTicket"

export const ApplicationViews = () => {
const [currentUser,setCurrentUser]=useState({})

useEffect(()=>{
  const localHoneyUser=localStorage.getItem("employee_ticket")
  const honeyUserObject=JSON.parse(localHoneyUser)
  setCurrentUser(honeyUserObject)
},[])

  return <>
  <Routes>
  <Route 
      path="/" 
      element={
        <>
          <NavBar/>
          <Outlet/>
        </>
      }
    >
      <Route index element={<Welcome/>}/>
      <Route path="tickets">
        <Route index element={<AllTickets/>}/>
        <Route path=":ticketId" element={<ViewTicket/>}/>
      </Route>
      
    </Route>
    </Routes>
  </>
}
