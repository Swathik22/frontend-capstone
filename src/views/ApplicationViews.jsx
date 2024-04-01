import {Routes,Route, Outlet} from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { Welcome } from "../components/welcome/Welcome"
import { useEffect, useState } from "react"
import { AllTickets } from "../components/tickets/AllTickets"
import { ViewTicket } from "../components/tickets/ViewTicket"
import { NewTicket } from "../components/tickets/NewTicket"
import { MyTickets } from "../components/tickets/MyTickets"
import { Profile } from "../components/profile/Profile"
import { TicketCreatedEmployeeProfile } from "../components/profile/TicketCreatedEmployeeProfile"
import { Col, Container, Row } from "react-bootstrap"

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
      <Container fluid>  
      {/* <Row style={{backgroundColor:"black",height:'50px'}}>
        <div style={{display:"flex",justifyContent:"center",color:"white",paddingTop:"10px",fontSize:"20px"}}><span>Ticketing System</span>  </div>
        </Row> */}
      <Row>
        <Col xs={2} style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <span style={{ paddingLeft: '5px' }}></span>
          <NavBar/>
          </Col>
        <Col xs={10} style={{ padding: "20px" }}>
          <Outlet/>
          </Col>
      </Row>
      </Container>
        </>
      }
    >
      <Route index element={<Welcome/>}/>
      <Route path="tickets">
        <Route index element={<AllTickets/>}/>
        <Route path=":ticketId" element={<ViewTicket/>}/>
      </Route>
      <Route path="newTicket" element={<NewTicket currentUser={currentUser}/>}></Route>

      <Route path="myTicket" element={<MyTickets currentUser={currentUser}/>}></Route>

      <Route path="profile" element={<Profile currentUser={currentUser}/>}></Route>
      
      <Route path="employeeInfo/:ticketId" element={<TicketCreatedEmployeeProfile/>}/>
    </Route>
    </Routes>
  </>
}
