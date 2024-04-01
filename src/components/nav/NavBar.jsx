import { Link,useNavigate } from "react-router-dom"

import "./NavBar.css"
import { Container, Nav, Navbar } from "react-bootstrap"


export const NavBar=()=>{
    const navigate=useNavigate()

    // return <ul className="navbar">
    //     <li className="navbar-item">
    //         <Link to="/tickets" className="navbar-a">All Tickets</Link>
    //     </li>
    //     <li className="navbar-item">
    //         <Link to="/newTicket" className="navbar-a">NewTicket</Link>
    //     </li>            
    //     <li className="navbar-item">
    //         <Link to="/myTicket" className="navbar-a">MyTicket</Link>
    //     </li>
    //     <li className="navbar-item">
    //         <Link to="/profile" className="navbar-a">Profile</Link>
    //     </li>
    //     {localStorage.getItem("employee_ticket") ? (
    //         <li className="navbar-item navbar-logout">
    //             <Link
    //             className="navbar-link"
    //             to=""
    //             onClick={() => {
    //                 localStorage.removeItem("employee_ticket")
    //                 navigate("/", { replace: true })
    //             }}
    //             >
    //             Logout
    //             </Link>
    //         </li>
    //         ) : (
    //         ""
    //     )}
    // </ul>

    return (
    <Navbar bg="black" data-bs-theme="dark">
        <Container>        
        <Nav className="flex-column">
            <div style={{display:"flex",justifyContent:"center"}}><img src="images/ticket.png" style={{ width: '8rem', height: '50px', paddingLeft:'20px' }}/></div>
        {/* <div style={{display:"flex",justifyContent:"center",color:"white",paddingTop:"10px",fontSize:"20px"}}><span>Ticketing System</span>  </div> */}
            <Nav.Link as={Link} to="/tickets"><i className="fa-solid fa-list"></i><span style={{ paddingLeft: '10px' }}>All Tickets</span></Nav.Link>
            <Nav.Link as={Link} to="/newTicket"><i className="fa-solid fa-plus"></i><span style={{ paddingLeft: '10px' }}>New Ticket</span></Nav.Link>
            <Nav.Link as={Link} to="/myTicket"><i className="fa-solid fa-bars"></i><span style={{ paddingLeft: '10px' }}>My Tickets</span></Nav.Link>
            <Nav.Link as={Link} to="/profile"><i className="fa-solid fa-user"></i><span style={{ paddingLeft: '10px' }}>Profile</span></Nav.Link>
            {localStorage.getItem("employee_ticket") ? (
                <Nav.Link as={Link} to="" onClick={() => {
                    localStorage.removeItem("employee_ticket")
                    navigate("/", { replace: true })
                }}><i class="fa-solid fa-right-from-bracket"></i><span style={{ paddingLeft: '10px' }}>Logout</span></Nav.Link>)
                :("")
            }           
            
        </Nav>
        </Container>
    </Navbar>
    )
}