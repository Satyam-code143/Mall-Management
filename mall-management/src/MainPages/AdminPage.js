import React,{Component} from 'react';
import './Common.css';
import {NavLink, useHistory} from 'react-router-dom';
import Alogo from '../Images/user1.png';


function AdminPage() {
    let history=useHistory();
    function Logout(e){
        e.preventDefault();
        history.push('/');

    }
    
        return(
            <div className='main'>
                <div className='nav'>
                    <h2>Manage Mart</h2>
                    <h2>Mr./Ms. Admin</h2>
                    {/* <img src={Alogo} alt="User"></img> */}
                </div>
                <div className='menu'>
                <div className="list"><NavLink to='/AdminPage/'><i className="fas fa-store-alt"></i> ShowRoom</NavLink></div>
                <div className="list"><NavLink to='/AdminPage/Users'><i className="fas fa-users"></i> Users</NavLink></div>
                <div className="list"><NavLink to='/AdminPage/Employees'><i className="fas fa-briefcase"></i> Employees</NavLink></div>
                <div className='list logout'><NavLink to='/' onClick={Logout}><i className="fas fa-sign-out-alt"></i> Logout</NavLink></div>
                </div>
            </div>
        );
    
}
export default AdminPage;