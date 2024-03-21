export const getAllEmployees=async ()=>{
    const res = await fetch("http://localhost:8088/employees")
    return await res.json()
}

export const getAssignedEmployeeTickets=async (ticketId)=>{
    const res = await fetch(`http://localhost:8088/assignedEmployeeTickets?ticketId=${ticketId}&_expand=employee`)
    return await res.json()

}

export const updateAssignedEmployeeTicket=async (assignedTicket)=>{
    const res = await fetch(`http://localhost:8088/assignedEmployeeTickets/${assignedTicket.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignedTicket)
    })
    return await res.json()
}

export const deleteAssignedEmployeeTicket=async (assignedTicketId)=>{
    const res = await fetch(`http://localhost:8088/assignedEmployeeTickets/${assignedTicketId}`, {
        method: "DELETE"
    })
    return await res.json()
}

export const createAssignedEmployeeTicket=async (assignTicket)=>{
    const res = await fetch(`http://localhost:8088/assignedEmployeeTickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignTicket)
    })
    return await res.json()
}

export const getAssignedTicketsByEmployeeId=async (employeeId)=>{
    const res = await fetch(`http://localhost:8088/assignedEmployeeTickets?employeeId=${employeeId}&_expand=ticket&_expand=employee`)
    return await res.json()
}

export const getEmployeeProfileById=async (employeeId)=>{
    const res = await fetch(`http://localhost:8088/employees/${employeeId}`)
    return await res.json()
}

export const updateEmployeeProfile=(employeeProfile)=>{
    return fetch(`http://localhost:8088/employees/${employeeProfile.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"            
        },
        body:JSON.stringify(employeeProfile)
    })

}

