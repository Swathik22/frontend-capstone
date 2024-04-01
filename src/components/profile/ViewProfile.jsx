import { Button,Form } from "react-bootstrap"

export const ViewProfile=({employeeProfile,handleInputChange,handleEditEvent})=>{
    return (<>
    <h4>Employee Profile</h4>
    <Form>
            <Form.Group >
                <img src={employeeProfile.image?employeeProfile.image:""} alt="employeeImage" className="imgTag"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>FullName</Form.Label>
                <Form.Control name="fullName" onChange={handleInputChange} value={employeeProfile.fullName?employeeProfile.fullName:""}/>                
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" value={employeeProfile.email?employeeProfile.email:""} onChange={handleInputChange}/>                
            </Form.Group>
            <Form.Group>
                <Form.Label>PhoneNumber</Form.Label>
                <Form.Control name="phoneNumber" value={employeeProfile.phoneNumber?employeeProfile.phoneNumber:""} onChange={handleInputChange}/>                
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Control value={employeeProfile.role?employeeProfile.role:""} disabled/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={employeeProfile.address?employeeProfile.address:""} onChange={handleInputChange}/>                
            </Form.Group>
        <div className="divUpdate">
                <Button name="btnEdit" onClick={handleEditEvent}>Update</Button>
                </div>
        </Form>
    </>)
}