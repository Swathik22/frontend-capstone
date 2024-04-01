import { useEffect, useState } from "react"
import { getPriorities, getStatus } from "../../services/statusService"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteTicket, getAllTickets, updateTicket } from "../../services/ticketsServices"
import { deleteAssignedEmployeeTicket, 
    getAllEmployees, 
    getAssignedEmployeeTickets, 
    updateAssignedEmployeeTicket } from "../../services/employeeService"

import "./newTicket.css"
import { Profile } from "../profile/Profile"
import { Button, Form } from "react-bootstrap"
export const ViewTicket=()=>{    
    const[statusOptions,setStatusOptions]=useState([])    
    const[priorityOptions,setPriorityOptions]=useState([])
    const[ticket,setTicket]=useState({})
    const[allEmployees,setAllEmployees]=useState([])
    const[deleteBtnEnable,setDeleteBtnEnable]=useState(false)
    const[assignedEmployeeTickets,setAssignedEmployeeTickets]=useState({})
    const[isAssignedTicket,setIsAssignedTicket]=useState(false)

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

        const assignedTicketEntity={
            id:assignedEmployeeTickets.id,
            ticketId:assignedEmployeeTickets.ticketId,
            employeeId:assignedEmployeeTickets.employeeId,
            assignedDate:assignedEmployeeTickets.assignedDate,
            resolvedDate:assignedEmployeeTickets.resolvedDate
        }

        updateTicket(ticketToUpdate?ticketToUpdate:'').then(
            updateAssignedEmployeeTicket(assignedTicketEntity).then(
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
    <h4>Update Ticket</h4>
        <Form  key={ticket.id}>
            {/* <h2>Update Ticket</h2> */}
            <Form.Group className="form-group">
                <Form.Label>CreatedBy: </Form.Label>                
                <Link to={`/employeeInfo/${ticket.id}`}>{ticket.employee?.fullName}</Link>                
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Ticket: </Form.Label>
                <Form.Label>{ticket.ticket?ticket.ticket:""}</Form.Label>               
            </Form.Group>            
            <Form.Group className="form-group">
                <Form.Label>Description:</Form.Label>
                {/* <Form.Control as="textarea" rows={3} name="description" placeholder="Brief description about the ticket" onChange={handleInputChanges}/> */}
                <Form.Control as="textarea" rows={3} name="description" value={ticket.description?ticket.description:""} onChange={handleInputChangesForForm}/>
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>Status:</Form.Label>
                <Form.Select value={ticket.statusId} name="statusId" onChange={handleInputChangesForForm}>
                    <option value="0">select Status</option>
                    {statusOptions.map((status)=>{
                        return <option value={status.id} key={status.id}>{status.name}</option>
                    })}
                </Form.Select>                    
            </Form.Group>
            <Form.Group className="form-group radio-group">
                <Form.Label>Priority:</Form.Label>
                {priorityOptions.map(priorityObj => (
                    <Form.Label key={priorityObj.id}>
                        
                        <Form.Check
                            type="radio"
                            name="priorityId"                           
                            value={priorityObj.id}
                            label={priorityObj.name}
                            checked={parseInt(ticket.priorityId) === priorityObj.id}
                                onChange={handleInputChangesForForm}
                        />
                        
                    </Form.Label>
                ))}     
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label>AssignedTo:</Form.Label>
                <Form.Select value={assignedEmployeeTickets?.employeeId} name="employeeId" 
                    onChange={handleAssigneeTicketEvent}
                >
                    <option value="0">select Employee</option>
                    {allEmployees.map((employee)=>{
                        return <option value={employee.id} key={employee.id}>{employee.fullName}</option>
                    })}
                </Form.Select>    
            </Form.Group>
          
                <div className="divUpdateDelete">
                    <div>
                        <Button id="btnEdit" variant="primary" onClick={handleEditEvent}>Update</Button>
                    </div>  
                    <div>                 
                        <Button id="btnDelete" variant="danger" disabled={!deleteBtnEnable} onClick={handleDeleteEvent}>Delete</Button>
                    </div> 
                </div>
            
        </Form>
    </>
    )
}