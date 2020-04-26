import React, {Component} from 'react';
import './HomePage.css'
import MLogo from  '../Images/Manager.png';
import ALogo from  '../Images/Admin.png';
import Login from '../Login/Login';


class HomePage extends Component{
constructor(props){
  super(props);
  this.state={
    isLogin:'',
    showPatti:true,
  }
}


RenderPage=(e)=>{
  this.setState({isLogin:true});
}


  render(){
    return(
      <div className='HomePage'>

{this.state.showPatti?<div className='nav'>
          <h2>Manage Mart</h2>
        </div>:''}
        
      {this.state.isLogin?<Login/>:
      <div className='OptionBox'>
      <div className='Managers'>
          <img  src={MLogo} alt=''></img>
          <h2>Manager Login</h2>
          <p>Managers Can Login Here!!</p>
          <br/>
          <a onClick={this.RenderPage}>Login</a>
      </div>
      <div className='vl'>

      </div>
      <div className='Admin'>
          <img src={ALogo} alt=''></img>
          <h2>Admin Login</h2>
          <p>Only Admins Can Login Here!!</p>
          <br/>
          <a onClick={this.RenderPage}>Login</a>
      </div>
    </div>}
        


        <div className='footer'>
          {/* <h2> 	&copy; 2020 Satyam</h2> */}
          <div className="icons">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-github"></i>
          </div>
        </div>


      </div>
    );
  }
}
export default HomePage;
