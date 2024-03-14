export const getAllTickets=()=>{
    return fetch("http://localhost:8088/tickets?_expand=priority&_expand=status").then(res=>res.json())
}

export const updateTicket=(ticket)=>{
    const putOptions={
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ticket)
    }
    return fetch(`http://localhost:8088/tickets/${ticket.id}`,putOptions).then(res=>res.json())
}

