import { useEffect, useState } from "react"
import { createAssignedEmployeeTicket, getAllEmployees } from "../../services/employeeService"
import { getPriorities, getStatus } from "../../services/statusService"
import { createTicket } from "../../services/ticketsServices"
import { useNavigate } from "react-router-dom"
import "./newTicket.css"

export const NewTicket=({currentUser})=>{
    const[allEmployees,setAllEmployees]=useState([])
    const[assignedEmployee,setAssignedEmployee]=useState(0)
    const[statuses,setStatuses]=useState([])
    const[priorities,setPriorities]=useState([])
    const[ticket,setTicket]=useState({
        ticket:"",
        description:"",
        employeeId:currentUser?.id,
        createdDate:new Date,
        statusId:0,
        priorityId:0
    })
    const[assignTicket,setAssignTicket]=useState({
        ticketId:0,
        employeeId:0,
        assignedDate:new Date,
        resolvedDate:""
    })

    const navigate=useNavigate()


    useEffect(()=>{   
        
        getAllEmployees().then(allEmployeesArray=>
            setAllEmployees(allEmployeesArray)
        )
        getStatus().then(statusOptions=>{
            setStatuses(statusOptions)
        })
        getPriorities().then(priorityOptions=>{
            setPriorities(priorityOptions)
        })

    },[])

    const handleInputChanges=(event)=>{
        const ticketCopy={...ticket}
        if(event.target.name==="employeeId")
        {
            setAssignedEmployee(parseInt(event.target.value))
        }
        else if(event.target.name==="statusId"||event.target.name==="priorityId"){
            ticketCopy[event.target.name]=parseInt(event.target.value)
        }
        else
        {
            ticketCopy[event.target.name]=event.target.value
        }
        
        setTicket(ticketCopy)
    }

    const handleSave=(event)=>{
        event.preventDefault()
                
        createTicket(ticket).then(response=>{
            const assignTicketCopy={...assignTicket}
            assignTicketCopy.ticketId=response.id
            assignTicketCopy.employeeId=assignedEmployee
            assignTicketCopy.assignedDate=new Date
            assignTicketCopy.resolvedDate=""

            createAssignedEmployeeTicket(assignTicketCopy).then(
                navigate(`/tickets`)
            )
        })
    }

    return <>
    <form key={currentUser.id} className="form-container">
        <h2>New Ticket</h2>
        <fieldset className="form-group">
            <label>Ticket:</label>
            <input type="text" name="ticket" placeholder="Enter Ticket" onChange={handleInputChanges}/>
        </fieldset>
        <fieldset className="form-group">
            <label>Description:</label>
            <textarea name="description" placeholder="Brief description about the ticket" onChange={handleInputChanges}/>
        </fieldset>
        <fieldset className="form-group">
            <label>Assign To:</label>
            <select name="employeeId" onChange={handleInputChanges}>
                <option value="0">Select Employee</option>
                {
                    allEmployees.map((employee)=>{
                       return <option value={employee.id} key={employee.id}>{employee.fullName}</option>
                    })
                }
            </select>
        </fieldset>
        <fieldset className="form-group">
            <label>Status:</label>
            <select name="statusId" onChange={handleInputChanges}>
                <option value="0">Select Status</option>
                {
                    statuses.map((status)=>{
                       return <option value={status.id} key={status.id}>{status.name}</option>
                    })
                }
            </select>
        </fieldset>
        <fieldset className="form-group radio-group">
            <label>Priority:</label>
            {priorities.map((priority)=>{
              return <div key={priority.id}><input type="radio" name="priorityId" onChange={handleInputChanges} value={priority.id}/>{priority.name}</div>
            })}            
        </fieldset>
       
        <footer className="saveButton">
            <button id="btnSave" onClick={handleSave}>Save</button>
        </footer> 
    </form>
    </>
}