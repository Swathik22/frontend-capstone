import { useEffect, useState } from "react"
import { getEmployeeProfileById, updateEmployeeProfile } from "../../services/employeeService"
import { useNavigate } from "react-router-dom"
import "./profile.css"
import { ViewProfile } from "./ViewProfile"

export const Profile=({currentUser})=>{
    const[employeeProfile,setEmployeeProfile]=useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "", 
        address: "",
        image:""})
    const navigate=useNavigate()
    
    useEffect(()=>{
        getEmployeeProfileById(currentUser?.id).then(empProfile=>
            setEmployeeProfile(empProfile)
        )
    },[currentUser])

    const handleInputChange=(event)=>{
        const empProfileCopy={...employeeProfile}
        empProfileCopy[event.target.name]=event.target.value
        setEmployeeProfile(empProfileCopy)
    }

    const handleEditEvent=(event)=>{
        event.preventDefault()
        updateEmployeeProfile(employeeProfile).then(res=>{
            if(res.id>0){
                navigate(`/profile`)
            }
        }
        )
    }
    return (
    <>
      <ViewProfile employeeProfile={employeeProfile} handleInputChange={handleInputChange} handleEditEvent={handleEditEvent}/>
    </>
    )
}