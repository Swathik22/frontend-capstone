import "./tickets.css"
export const Ticket=({ticket})=>{
    return (
        <div className="tickets" key={ticket.id}>
                    <div>
                        <div className="user-info">Ticket</div>
                        <div>{ticket.ticket}</div>
                    </div>
                    <div>
                        <div className="user-info">Status</div>
                        <div>{ticket.status.name}</div>
                    </div>
                    <div>
                        <div className="user-info">Priority</div>
                        <div>{ticket.priority.name}</div>
                    </div>
                    <div>
                        <div className="user-info">Description</div>
                        <div>{ticket.description}</div>
                    </div>
        </div>
    )
}