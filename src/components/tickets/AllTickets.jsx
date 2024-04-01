import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketsServices"
import { Ticket } from "./Ticket"
import { Link } from "react-router-dom"
import { getAssignedEmployeeTickets } from "../../services/employeeService"
import { Form, InputGroup, Table } from "react-bootstrap"
import  "./tickets.css"

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
        <>
        
        <h4>View All Tickets</h4><div className="divAllTickets">
        <div className="divSearch">
        
        <Form.Control
            placeholder="Search Ticket"
            id="txtSearch"
            onChange={(event)=>{
                setSearchTicket(event.target.value)
            }}/>
     
      </div>
      </div>
      
    <Table striped hover >
        <thead className="custom-thead">
            <tr key={1}>
                <td className="custom-thead">CreatedBy</td>
                <td className="user-info">Ticket</td>
                <td className="user-info">Status</td>
                <td className="user-info">Priority</td>
                <td className="user-info">AssignedTo</td>
                <td className="user-info">Description</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            
            {
            filteredTickets.map(ticket=>{   
                let assignedTo=assignedEmployeeInfo[ticket.id]
                
                return (
                    <Ticket ticket={ticket} assignedTo={assignedTo}/>
                      )             
            }
                
            )
            }
        </tbody>
    </Table>
          
        </>
    )
}