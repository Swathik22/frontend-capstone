import { Link } from "react-router-dom"
import "./tickets.css"
import { Badge, Image } from "react-bootstrap";

export const Ticket=({ticket,assignedTo})=>{
    let statusColor = '';
    switch (ticket.status.name) {
      case 'Pending':
        statusColor = 'warning';
        break;
      case 'Closed':
        statusColor = 'success';
        break;
      case 'In Progress':
        statusColor = 'primary';
        break;
      default:
      statusColor = 'secondary';
  }
  
    return (
<>
    
        <tr key={ticket.id}>        
                      
            <td >
                <Image src={ticket.employee?ticket.employee.image:""} alt="employeeImage" roundedCircle style={{ width: '30px', height: '30px', paddingRight:'2px' }}/>
                {ticket.employee?.fullName}
            </td>
            <td >{ticket.ticket}</td>                     
            <td ><Badge bg={statusColor}>{ticket.status.name}</Badge></td>                    
            <td >{ticket.priority.name}</td> 
            <td >{assignedTo}</td>                    
            <td >{ticket.description}</td>           
            <td><Link to={`/tickets/${ticket.id}`}><i className="fa-solid fa-pen-to-square"></i></Link></td>
    </tr>
</>
       
    )
}