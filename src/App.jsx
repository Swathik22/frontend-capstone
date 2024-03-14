import "./App.css"
import {Routes,Route} from "react-router-dom"
import { Login } from "./components/auth/Login"
import{Register} from "./components/auth/Register"
import { ApplicationViews } from "./views/ApplicationViews"
import{Authorized} from "./views/Authorized"


export const App=()=>{
  return (
  <Routes>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Register" element={<Register/>}/>

    <Route
      path="*"
      element={
        //with in Authorized component ,verifies if the user is authorized or not
        <Authorized>
          {/* ApplicationViews is the child component of Authorized */}
          <ApplicationViews/>
        </Authorized>
      }
    />
  </Routes>)
}

