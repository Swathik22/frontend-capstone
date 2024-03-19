import { useEffect, useState } from "react"
import { getPriorities, getStatus } from "../../services/statusService"
import { useNavigate, useParams } from "react-router-dom"
import { deleteTicket, getAllTickets, updateTicket } from "../../services/ticketsServices"
import { deleteAssignedEmployeeTicket, 
    getAllEmployees, 
    getAssignedEmployeeTickets, 
    updateAssignedEmployeeTicket } from "../../services/employeeService"

import "./newTicket.css"
export const ViewTicket=()=>{    
    const[statusOptions,setStatusOptions]=useState([])    
    const[priorityOptions,setPriorityOptions]=useState([])
    const[ticket,setTicket]=useState({})
    const[allEmployees,setAllEmployees]=useState([])
    const[deleteBtnEnable,setDeleteBtnEnable]=useState(false)
    const[assignedEmployeeTickets,setAssignedEmployeeTickets]=useState({})

    const {ticketId}=useParams()
    const navigate=useNavigate()
    
    useEffect(()=>{
        getStatus().then((statusArray)=>{
            setStatusOptions(statusArray)
        })
        getPriorities().then((priorityArray)=>{
            setPriorityOptions(priorityArray)
        })
        getAllEmployees().then((employeeArray)=>{
            setAllEmployees(employeeArray)
        })
        
    },[])

    useEffect(()=>{
        getAllTickets().then((allTicketsArray)=>{
            const ticketObj=allTicketsArray.find((eachTicket)=>eachTicket.id===parseInt(ticketId))            
            setTicket(ticketObj)

            getAssignedEmployeeTickets(ticketObj.id).then((assignedTickets)=>{
                setAssignedEmployeeTickets(assignedTickets[0])})

            if(ticketObj.statusId==4){
                setDeleteBtnEnable(true)
            }
        })
    },[])

    const handleInputChangesForForm=(event)=>{
        const ticketCopy={...ticket}
        if(event.target.name==="statusId" && event.target.value==4)
        {
            setDeleteBtnEnable(true)
        }
        else{
            setDeleteBtnEnable(false)
        }
        ticketCopy[event.target.name]=event.target.value
        setTicket(ticketCopy)
    }

    const handleAssigneeTicketEvent=(event)=>{
        const assignedTicketCopy={...assignedEmployeeTickets}
        assignedTicketCopy.employeeId=parseInt(event.target.value)
        assignedTicketCopy.assignedDate=new Date
        setAssignedEmployeeTickets(assignedTicketCopy)
        
        
    }

    const handleEditEvent=(event)=>{
        event.preventDefault()

        const ticketToUpdate={
            id:ticket.id,
            ticket:ticket.ticket,
            description:ticket.description,
            createdDate:ticket.createdDate,
            employeeId:parseInt(ticket.employeeId),
            statusId:parseInt(ticket.statusId),
            priorityId:parseInt(ticket.priorityId)
        }

        if(ticket.statusId==4){
            assignedEmployeeTickets.resolvedDate=new Date
        }
        else{
            assignedEmployeeTickets.resolvedDate=null
        }
        updateTicket(ticketToUpdate?ticketToUpdate:'').then(
            updateAssignedEmployeeTicket(assignedEmployeeTickets).then(
                navigate(`/tickets`))           
        )        
    }
    
    const handleDeleteEvent=(event)=>{
        event.preventDefault()
        deleteTicket(ticket.id).then(
            deleteAssignedEmployeeTicket(assignedEmployeeTickets.id).then(
                navigate(`/tickets`))
            
        )
    }

    return (
    <>
        <form className="form-container" key={ticket.id}>
            <h2>Edit Ticket</h2>
            <fieldset className="form-group">
                <label>CreatedBy: </label><label>{ticket.employee?.fullName}</label>
            </fieldset>
            <fieldset className="form-group">
                <label>Ticket: </label>
                <input type="text" name="ticket" disabled  defaultValue={ticket.ticket?ticket.ticket:""}/>
            </fieldset>
            <fieldset className="form-group">
                <label></label>
            </fieldset>
            <fieldset className="form-group">
                <label>Description:</label>
                <textarea name="description" value={ticket.description?ticket.description:""} onChange={handleInputChangesForForm}/>
            </fieldset>
            <fieldset className="form-group">
                <label>Status:</label>
                <select value={ticket.statusId} name="statusId" onChange={handleInputChangesForForm}>
                    <option value="0">select Status</option>
                    {statusOptions.map((status)=>{
                        return <option value={status.id} key={status.id}>{status.name}</option>
                    })}
                </select>                    
            </fieldset>
            <fieldset className="form-group radio-group">
                <label>Priority:</label>
                {priorityOptions.map(priorityObj => (
                    <label key={priorityObj.id}>
                        <input
                            type="radio"
                            name="priorityId"                           
                            value={priorityObj.id}
                            
                            checked={parseInt(ticket.priorityId) === priorityObj.id}
                                onChange={handleInputChangesForForm}
                        />
                        {priorityObj.name}
                    </label>
                ))}     
            </fieldset>
            <fieldset className="form-group">
                <label>AssignedTo:</label>
                <select value={assignedEmployeeTickets?.employeeId} name="employeeId" 
                    onChange={handleAssigneeTicketEvent}
                >
                    <option value="0">select Employee</option>
                    {allEmployees.map((employee)=>{
                        return <option value={employee.id} key={employee.id}>{employee.fullName}</option>
                    })}
                </select>    
            </fieldset>
            <footer >
                <div className="divUpdateDelete">
                    <div>
                        <button id="btnEdit" className="updateBtn" onClick={handleEditEvent}>Update</button>
                    </div>  
                    <div>                 
                        <button id="btnDelete" className="deleteBtn" disabled={!deleteBtnEnable} onClick={handleDeleteEvent}>Delete</button>
                    </div> 
                </div>
            </footer>
        </form>
    </>
    )
}