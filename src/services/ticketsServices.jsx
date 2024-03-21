export const getAllTickets=async ()=>{
    const res = await fetch("http://localhost:8088/tickets?_expand=priority&_expand=status&_expand=employee")
    return await res.json()    
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

export const deleteTicket=(ticketId)=>{
    return fetch(`http://localhost:8088/tickets/${ticketId}`,{
        method:"DELETE"
    }).then(res=>res.json())
}

export const createTicket=(ticket)=>{
    const postOptions={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(ticket)
    }
    return fetch(`http://localhost:8088/tickets`,postOptions).then(res=>res.json())
}

export const getTicketByTicketId=(ticketId)=>{
    return fetch(`http://localhost:8088/tickets/${ticketId}?_expand=employee`).then(res=>res.json())
}
