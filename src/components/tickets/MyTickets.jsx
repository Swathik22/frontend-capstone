import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketsServices"
import { Ticket } from "./Ticket"
import { Link } from "react-router-dom"
import { getAssignedTicketsByEmployeeId } from "../../services/employeeService"
// import { Ticket } from "./Ticket"

export const MyTickets=({currentUser})=>{
    const[allTicketsList,setAllTicketsList]=useState([])    
    const[raisedTickets,setRaisedTickets]=useState([])
    const[assignedTickets,setAssignedTickets]=useState([])
    const[filteredTickets,setFilteredTickets]=useState([])

    //two set of tickets, 1)Assigned tickets and 2)Raised tickets
    useEffect(()=>{
        let allTicketsArray=[]
        const functionToGetAllTickets=async()=>{
        allTicketsArray=await getAllTickets()        
        // Filter raised tickets  
            
        const raisedTicketsArray = allTicketsArray.filter(ticket => ticket.employeeId === currentUser.id);            
        setRaisedTickets(raisedTicketsArray)
        }
        functionToGetAllTickets()       

        //filter assigned tickets        
        getAssignedTicketsByEmployeeId(currentUser.id).then((ticketsList)=>{            
            const ticketArray=[]
            ticketsList.map(ticket=>{
                return ticketArray.push(ticket.ticket)  
            })          
            
            const commonElements = allTicketsArray.filter(item1 =>
                ticketArray.some(item2 => item1.id === item2.id))
                setAssignedTickets(commonElements)
            })
    },[currentUser])

    useEffect(()=>{        
        const raisedAndAssignedTicketsList = [...raisedTickets, ...assignedTickets];
            setFilteredTickets(raisedAndAssignedTicketsList);     
            setAllTicketsList(raisedAndAssignedTicketsList)      
    },[raisedTickets,assignedTickets])

    const handleCheckEvent=(event)=>{  
        if(event.target.name==="AssignedTickets"){
            if(assignedTickets.length===0){
            window.alert(`There are no Assigned Tickets`)
            }
            else if(event.target.checked===false)
            {
                setFilteredTickets(allTicketsList)
            }
            else if(event.target.checked){
                setFilteredTickets(assignedTickets)
            }
        }
        
    }

    return (        
        <>
            <div className="divCheckBox">
            <input type="Checkbox"  
                   name="AssignedTickets"                    
                   onChange={handleCheckEvent}
            />Assigned Tickets         
            </div>           
                  
        <div className="allTicketsHeader">
            <div className="user-info">CreatedBy</div>
            <div className="user-info">Ticket</div>
            <div className="user-info">Status</div>
            <div className="user-info">Priority</div>
            <div className="user-info">Description</div>
        </div>
     
            {            
            filteredTickets.map(ticket=>{
                return (                    
                    <Link to={`/tickets/${ticket.id}`} className="ticketLink" key={ticket.id}>
                    <Ticket ticket={ticket} key={ticket.id}/>
                    </Link>
                      )             
            }
                
            )
            }
        </>
    )
}