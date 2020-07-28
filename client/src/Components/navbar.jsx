import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
const myStyle = {
    marginLeft: '5vh',
    color: 'black',
    fontSize:'1.5em',
    textDecoration:"none"
  

}
export default class navbar extends Component {
    
    render() {
        return (
    
             <Navbar  style={{}} expand="sm">
             <Navbar.Brand > <img style={{height:"8vh",float:"left"}}  src="https://i.ibb.co/ZJgXXVT/8ec93e8f-96ba-44a5-ab3b-871b9d400a9c-200x200.png" alt="pic"></img></Navbar.Brand>
            
                 <Nav style={{height:"8vh",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                     <NavLink  style={myStyle} activeStyle={{ fontWeight: 'bold'}} exact to="/">Home</NavLink>
                     <NavLink  style={myStyle} activeStyle={{ fontWeight: 'bold' }} to="/map">Map</NavLink>
                     <NavLink  style={myStyle} activeStyle={{ fontWeight: 'bold' }} to={"/graph"}>Graph</NavLink>
 
                   
 
 
                 </Nav>
 
     
         </Navbar>
        )
    }
}

