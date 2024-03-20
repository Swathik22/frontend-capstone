import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    email: "",
    fullName: "",
    phoneNumber:"",
    address:"",
    role:"",
    image:"images/employee8.png"
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "employee_ticket",
          JSON.stringify({
            id: createdUser.id,
            //staff: createdUser.isStaff,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateCustomer = (evt) => {
    const copy = { ...customer }
    copy[evt.target.id] = evt.target.value
    setCustomer(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Ticketing System for a Software company</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your FullName"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter your Email"
              required             
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="phoneNumber"
              className="form-control"
              placeholder="Enter phone Number"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="address"
              className="form-control"
              placeholder="Enter Address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="role"
              className="form-control"
              placeholder="Enter Role"
              required
            />
          </div>
        </fieldset>
        <fieldset> 
        <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="image"
              className="form-control"
              value="images/employee8.png"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
