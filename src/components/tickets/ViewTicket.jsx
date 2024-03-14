import { useEffect, useState } from "react"
import { getPriorities, getStatus } from "../../services/statusService"
import { useNavigate, useParams } from "react-router-dom"
import { getAllTickets, updateTicket } from "../../services/ticketsServices"
import { getAllEmployees } from "../../services/employeeService"


export const ViewTicket=()=>{    
    const[statusOptions,setStatusOptions]=useState([])    
    const[priorityOptions,setPriorityOptions]=useState([])
    const[ticket,setTicket]=useState({})
    const[allEmployees,setAllEmployees]=useState([])
    const[deleteBtnEnable,setDeleteBtnEnable]=useState(false)

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

    const handleEditEvent=(event)=>{
        event.preventDefault()

        const ticketToUpdate={
            id:ticket.id,
            ticket:ticket.ticket,
            description:ticket.description,
            createdDate:ticket.createdDate,
            employeeId:ticket.employeeId,
            statusId:ticket.statusId,
            priorityId:ticket.priorityId
        }

        updateTicket(ticketToUpdate).then(
           navigate(`/tickets`)
        )
    }

    const handleDeleteEvent=(event)=>{
        //code for delete event need to implement
    }

    return (
    <>
        <form>
            <fieldset>
                <label>Ticket</label>
                <input type="text" name="ticket" disabled value={ticket.ticket?ticket.ticket:""}/>
            </fieldset>
            <fieldset>
                <label>Description</label>
                <textarea name="description" value={ticket.description?ticket.description:""}/>
            </fieldset>
            <fieldset>
                <label>Status</label>
                <select value={ticket.statusId} name="statusId" onChange={handleInputChangesForForm}>
                    <option value="0">select Status</option>
                    {statusOptions.map((status)=>{
                        return <option value={status.id}>{status.name}</option>
                    })}
                </select>                    
            </fieldset>
            <fieldset>
                <label>Priority</label>
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
            <fieldset>
                <label>AssignedTo</label>
                <select value={ticket.employeeId} name="employeeId" 
                    onChange={handleInputChangesForForm}
                >
                    <option value="0">select Employee</option>
                    {allEmployees.map((employee)=>{
                        return <option value={employee.id}>{employee.fullName}</option>
                    })}
                </select>    
            </fieldset>
            <footer>
                <div>
                    <div>
                        <button id="btnEdit" onClick={handleEditEvent}>Edit</button>
                    </div>  
                    <div>                 
                        <button id="btnDelete" disabled={!deleteBtnEnable} onClick={handleDeleteEvent}>Delete</button>
                    </div> 
                </div>
            </footer>
        </form>
    </>
    )
}