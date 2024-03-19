import "./tickets.css"
export const Ticket=({ticket})=>{
    return (
<>
    
        <div className="grid-container" key={ticket.id}>        
                      
            <div className="grid-item">{ticket.employee?.fullName}</div>
            <div className="grid-item">{ticket.ticket}</div>                     
            <div className="grid-item">{ticket.status.name}</div>                    
            <div className="grid-item">{ticket.priority.name}</div>                     
            <div className="grid-item">{ticket.description}</div>
      
    </div>
</>
       
    )
}