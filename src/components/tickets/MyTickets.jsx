import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketsServices"
import { Ticket } from "./Ticket"
import { Link } from "react-router-dom"
import { getAssignedEmployeeTickets, getAssignedTicketsByEmployeeId } from "../../services/employeeService"
import { Form, Table } from "react-bootstrap"
// import { Ticket } from "./Ticket"

export const MyTickets=({currentUser})=>{
    const[allTicketsList,setAllTicketsList]=useState([])    
    const[raisedTickets,setRaisedTickets]=useState([])
    const[assignedTickets,setAssignedTickets]=useState([])
    const[filteredTickets,setFilteredTickets]=useState([])
    const [assignedEmployeeInfo, setAssignedEmployeeInfo] = useState({})

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
                return ticketArray.push(ticket)  
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
        <h4>View My Tickets</h4>
            <div className="divCheckBox">
                
            <input type="Checkbox"  
                   name="AssignedTickets"                    
                   onChange={handleCheckEvent}                 
            />  Assigned Tickets
        
            </div>           
             
     <Table striped hover >
        <thead className="custom-thead">
            <tr key={1}>
                <td className="user-info">CreatedBy</td>
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
                <Ticket ticket={ticket} key={ticket.id} assignedTo={assignedTo}/>
                      )             
            }
                
            )
            }
             </tbody>
    </Table>
        </>
    )
}