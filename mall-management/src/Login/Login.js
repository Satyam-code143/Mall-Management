import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Login.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SendData from '../Actions/SendData';
import SendId from '../Actions/SendId';




class Login extends Component{
      
     stat={
           Username:'',
           Password:''
     }

     onAddHandle=(e)=>{
           
      this.setState({
         [e.target.id]:e.target.value

     })
 }


    validateUser=(e)=> {
                    
      const { dispatch } = this.props; 
      
          e.preventDefault();
                if(this.state.Username != null && this.state.Password!= null){  
                  axios.post('http://localhost/backend-mall-management/Login/Validate.php',this.state)
                  .then(res => {
                  if(res.data){
                        var json={
                              Username:res.data.Username,
                              User_Id:res.data.User_Id,
                              Name:res.data.Name,
                              Email:res.data.Email
                        }
                        console.log(json)
                  if(json.Username ==='admin' || json.Username ==='admin1' || json.Username ==='admin2'){
                  
                        this.props.history.push('/AdminPage');
                        dispatch(SendData(json.Name));
                        
                        
                  }
                  else{
                        
                        this.props.history.push('/ManagerPage');
                        dispatch(SendData(json.Name));
                        dispatch(SendId(json.User_Id));
                       
                        
                  }
                  }else{
                  alert("Invaild Username or Password!!");
                     this.setState({
                           Username:'',
                           Password:''
                     })
                  }
            });
      }
      
      else{
            alert('Please fill both the fields');
      }

    

    }
render(){
return(
<div className='login'>
      <div className="box">
            <h2>Login</h2>
                  <form>
                        <div className="inputBox">
   
                              <input type="text" name="username" id='Username'  onChange={this.onAddHandle}  />
                              <label>Username</label>
                        </div>
                        <div className="inputBox">
                              <input type="password" name="password" id='Password' onChange={this.onAddHandle}  />
                              <label>Password</label>
                        </div>
                        <input type="submit" name="sign-in" value="Sign In" onClick={this.validateUser}/>
                        </form>
      </div>
</div>

);

}

}

export default connect()(withRouter(Login));