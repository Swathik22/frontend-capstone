import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTicketByTicketId } from "../../services/ticketsServices"
import "./createdEmployee.css"

export const TicketCreatedEmployeeProfile=()=>{
    const {ticketId}=useParams()
    const[ticket,setTicket]=useState({})

    useEffect(()=>{
        getTicketByTicketId(parseInt(ticketId)).then(
            ticketInfo=>{
                setTicket(ticketInfo)
            }
        )
    },[ticketId])

    const navigate=useNavigate()
    const handleCancelEvent=()=>{
        navigate(`/tickets/${ticket.id}`)
    }

    return (<>        
        <section className="divContainer">
            <header className="header"> Employee Profile</header>
            <div>
                <span className="employee-info">FullName: </span>               
                 {ticket.employee?.fullName}
            </div>
            <div>
                <span className="employee-info">Email Id: </span> 
                {ticket.employee?.email}
            </div>
            <div>
                <span className="employee-info">PhoneNumber: </span> 
                {ticket.employee?.phoneNumber}
            </div>
            <div>
                <span className="employee-info">Address: </span> 
                {ticket.employee?.address}
            </div>
            <div>
                <span className="employee-info">Role: </span> 
                {ticket.employee?.role}
            </div>
        <div className="btnCancel">
            <button id="btnCancel" onClick={handleCancelEvent}>Cancel</button>
        </div>
        
    </section>
    </>)
}