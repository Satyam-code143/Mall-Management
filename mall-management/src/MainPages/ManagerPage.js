import React,{Component} from 'react';
import { connect } from 'react-redux';
import './Common.css';
import {NavLink, withRouter} from 'react-router-dom';
import Alogo from '../Images/user1.png';


class Manager extends Component{

     Logout=(e)=>{
         e.preventDefault();
        this.props.history.push('/');
        
    }
componentDidUpdate(){
    window.location.reload();

}
    render(){
        return(
            <div className='main'>
                <div className='nav'>
                    <h2>Manage Mart</h2>
        <h2 style={{textTransform:'uppercase'}}>{this.props.Name}</h2>
                    {/* <img src={Alogo} alt="User"></img> */}
                </div>
                <div className='menu'>
                <div className="list"><NavLink to='/ManagerPage/'><i className='fas fa-paste'></i> Category</NavLink></div>
                <div className="list"><NavLink to='/ManagerPage/Product'><i className="fas fa-boxes"></i> Product</NavLink></div>
                <div className="list"><NavLink to='/ManagerPage/Employees'><i className="fas fa-briefcase"></i> Employees</NavLink></div>
                <div className="list"><NavLink to='/ManagerPage/Customers'><i className="fas fa-users"></i> Customers</NavLink></div>
                <div className="list"><NavLink to='/ManagerPage/Sale'><i className="fab fa-salesforce"></i> Sale</NavLink></div>
                <div className='list logout'><NavLink to='/' onClick={this.Logout}><i className="fas fa-sign-out-alt"></i> Logout</NavLink></div>
                </div>
            </div>
        );
        }
        
}

const mapStateToProps = (state) => {
    return{
    Name: state.storeValue
    }
  }

export default connect(mapStateToProps)(withRouter(Manager));