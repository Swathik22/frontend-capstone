import { Link,useNavigate } from "react-router-dom"

import "./NavBar.css"


export const NavBar=()=>{
    const navigate=useNavigate()

    return <ul className="navbar">
        <li className="navbar-item">
            <Link to="/tickets" className="navbar-a">All Tickets</Link>
        </li>
        <li className="navbar-item">
            <Link to="/newTicket" className="navbar-a">NewTicket</Link>
        </li>            
        <li className="navbar-item">
            <Link to="/myTicket" className="navbar-a">MyTicket</Link>
        </li>
        <li className="navbar-item">
            <Link to="/profile" className="navbar-a">Profile</Link>
        </li>
        {localStorage.getItem("employee_ticket") ? (
            <li className="navbar-item navbar-logout">
                <Link
                className="navbar-link"
                to=""
                onClick={() => {
                    localStorage.removeItem("employee_ticket")
                    navigate("/", { replace: true })
                }}
                >
                Logout
                </Link>
            </li>
            ) : (
            ""
        )}
    </ul>
}