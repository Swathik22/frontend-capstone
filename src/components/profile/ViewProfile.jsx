export const ViewProfile=({employeeProfile,handleInputChange,handleEditEvent})=>{
    return (<>
    <form className="form-container">
            <fieldset className="form-fieldSet" >
                <img src={employeeProfile.image?employeeProfile.image:""} alt="employeeImage" className="imgTag"/>
            </fieldset>
            <fieldset>
                <label>FullName</label>
                <input type="text" name="fullName" onChange={handleInputChange} value={employeeProfile.fullName?employeeProfile.fullName:""}/>                
            </fieldset>
            <fieldset>
                <label>Email</label>
                <input type="text" name="email" value={employeeProfile.email?employeeProfile.email:""} onChange={handleInputChange}/>                
            </fieldset>
            <fieldset>
                <label>PhoneNumber</label>
                <input type="text" name="phoneNumber" value={employeeProfile.phoneNumber?employeeProfile.phoneNumber:""} onChange={handleInputChange}/>                
            </fieldset>
            <fieldset>
                <label>Role</label>
                <input type="text" value={employeeProfile.role?employeeProfile.role:""} disabled/>
            </fieldset>
            <fieldset>
                <label>Address</label>
                <input type="text" name="address" value={employeeProfile.address?employeeProfile.address:""} onChange={handleInputChange}/>                
            </fieldset>
            <footer>
                <button name="btnEdit" onClick={handleEditEvent}>Update</button>
            </footer>
        </form>
    </>)
}