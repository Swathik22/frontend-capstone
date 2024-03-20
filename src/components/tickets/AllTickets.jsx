import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketsServices"
import { Ticket } from "./Ticket"
import { Link } from "react-router-dom"
import { getAssignedEmployeeTickets } from "../../services/employeeService"
// import { Ticket } from "./Ticket"

export const AllTickets=()=>{
    const[allTicketsList,setAllTicketsList]=useState([])
    const[searchTicket,setSearchTicket]=useState("")
    const[filteredTickets,setFilteredTickets]=useState([])
    const [assignedEmployeeInfo, setAssignedEmployeeInfo] = useState({})
    
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

    useEffect(() => {
        const fetchAssignedEmployeeInfo = async () => {
            const assignedInfoPromises = filteredTickets.map(async ticket => {
                const info = await getAssignedEmployeeTickets(ticket.id);               
                return { id: ticket.id, employeeName: info[0].employee?.fullName };
            });
    
            const assignedInfo = await Promise.all(assignedInfoPromises);
            const newAssignedEmployeeInfo = assignedInfo.reduce((acc, curr) => {
                acc[curr.id] = curr.employeeName;
                return acc;
            }, {});
    
            setAssignedEmployeeInfo(newAssignedEmployeeInfo);
        };
    
        fetchAssignedEmployeeInfo();
    }, [filteredTickets]);
    
    return (
        <><div className="divAllTickets">
        <div className="divSearch">
        <input type="text" className="txtSearch"
            placeholder="Search Ticket"
            id="txtSearch"
            onChange={(event)=>{
                setSearchTicket(event.target.value)
            }}
        />
      </div>
      <div className="allTicketsHeader" key={1}>
        <div className="user-info">CreatedBy</div>
        <div className="user-info">Ticket</div>
        <div className="user-info">Status</div>
        <div className="user-info">Priority</div>
        <div className="user-info">AssignedTo</div>
        <div className="user-info">Description</div>
    </div>
    <div>
            {
            filteredTickets.map(ticket=>{   
                let assignedTo=assignedEmployeeInfo[ticket.id]
                
                return (
                    <Link to={`/tickets/${ticket.id}`} className="ticketLink" key={ticket.id}>
                    <Ticket ticket={ticket} assignedTo={assignedTo}/>
                    </Link>
                      )             
            }
                
            )
            }
            </div>
            </div>
        </>
    )
}