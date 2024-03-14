import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketsServices"
import { Ticket } from "./Ticket"
import { Link } from "react-router-dom"
// import { Ticket } from "./Ticket"

export const AllTickets=()=>{
    const[allTicketsList,setAllTicketsList]=useState([])
    const[searchTicket,setSearchTicket]=useState("")
    const[filteredTickets,setFilteredTickets]=useState([])

    useEffect(()=>{
        getAllTickets().then((allTicketsArray)=>{
            setAllTicketsList(allTicketsArray)
            setFilteredTickets(allTicketsArray)           
        })
    },[])

    useEffect(()=>{
        setFilteredTickets(allTicketsList.filter(ticket=>
            ticket.ticket.toLowerCase().includes(searchTicket.toLowerCase())))       
    },[searchTicket,allTicketsList])
    
    return (
        <>
        <input type="text"
            placeholder="Search Ticket"
            id="txtSearch"
            onChange={(event)=>{
                setSearchTicket(event.target.value)
            }}
        />

            {
            filteredTickets.map(ticket=>{
                return (
                    <Link to={`/tickets/${ticket.id}`}>
                    <Ticket ticket={ticket}/>
                    </Link>
                      )             
            }
                
            )
            }
        </>
    )
}