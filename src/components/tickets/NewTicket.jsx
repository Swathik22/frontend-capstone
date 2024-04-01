import { useEffect, useState } from "react"
import { createAssignedEmployeeTicket, getAllEmployees } from "../../services/employeeService"
import { getPriorities, getStatus } from "../../services/statusService"
import { createTicket } from "../../services/ticketsServices"
import { useNavigate } from "react-router-dom"
import "./newTicket.css"
import { Button, Form } from "react-bootstrap"

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
    <h4>New Ticket</h4>
    <Form key={currentUser.id} >
        {/* <h2>New Ticket</h2> */}
        <Form.Group >
            <Form.Label>Ticket:</Form.Label>
            <Form.Control name="ticket" placeholder="Enter Ticket" onChange={handleInputChanges}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" placeholder="Brief description about the ticket" onChange={handleInputChanges}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Assign To:</Form.Label>
            <Form.Select name="employeeId" onChange={handleInputChanges}>
                <option value="0">Select Employee</option>
                {
                    allEmployees.map((employee)=>{
                       return <option value={employee.id} key={employee.id}>{employee.fullName}</option>
                    })
                }
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Status:</Form.Label>
            <Form.Select name="statusId" onChange={handleInputChanges}>
                <option value="0">Select Status</option>
                {
                    statuses.map((status)=>{
                       return <option value={status.id} key={status.id}>{status.name}</option>
                    })
                }
            </Form.Select>
        </Form.Group>
        <Form.Group className="form-group radio-group">
            <Form.Label>Priority:</Form.Label>
            {priorities.map((priority)=>{               
              return <Form.Check type="radio" key={priority.id} name="priorityId" label={priority.name} onChange={handleInputChanges} value={priority.id}/>
            })}            
        </Form.Group>
       
        <div className="saveButton">
            <Button id="btnSave" onClick={handleSave}>Save</Button>
        </div> 
    </Form>
    </>
}