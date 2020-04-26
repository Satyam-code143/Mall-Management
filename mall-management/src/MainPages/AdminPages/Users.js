import React, { Component } from 'react';
import axios from 'axios';
import './CommonStyle.css';




var Resp=[];
class Users extends Component {
    state={
      
        MName:null,
        username:null,
        password:null,
        Email:null,
        Users:[],
        isopened:false,

    }
    onAddHandle=(e)=>{
         this.setState({
            [e.target.id]:e.target.value,

        })
    }
    onSubmit=(e)=>{
        
        console.log(this.state);
        axios.post('http://localhost/backend-mall-management/AdminPage/Users/Users.php',this.state)
        .then(res => console.log(res.data));

        this.setState({
            MName:'',
            username:'',
            password:'',
            Email:''
        })

        
    }

    setInputBox(i){
     var name=document.getElementById('MName');
     var username=document.getElementById('username');
     var password=document.getElementById('password');
     var email=document.getElementById('Email');
     var User_Id=document.getElementById('User_Id');

      name.value=i.Name;
      username.value=i.Username;
      password.value=i.Password;
      email.value=i.Email;
      User_Id.value=i.User_Id;


    }

    onDelete=(e)=>{
      var User_Id=document.getElementById('User_Id');
      var User1=User_Id.value
      axios.post('http://localhost/backend-mall-management/AdminPage/Users/DeleteUser.php?Username='+User1)
      .then(result=>console.log(result))
      .catch(function(error){
        console.log(error);
      })
      this.setState({
        MName:'',
        username:'',
        password:'',
        Email:''
    })
    }

    onUpdate=(e)=>{
      var name=document.getElementById('MName');
      var username=document.getElementById('username');
      var password=document.getElementById('password');
      var email=document.getElementById('Email');
      var User_Id=document.getElementById('User_Id');

      var Jform=
        {
          Name:name.value,
          Username:username.value,
          Password:password.value,
          Email:email.value,
          User_Id:User_Id.value

        };
        axios.post('http://localhost/backend-mall-management/AdminPage/Users/UpdateUser.php',Jform)
        .then(res => console.log(res.data));

    }


    componentDidMount=()=>{

      this.setState({isopened:true});

      
    }


  componentDidUpdate(){
    let myArray=[];
      axios.get('http://localhost/backend-mall-management/AdminPage/Users/UsersList.php')
      .then(response=>{
         Resp=response.data;
      for(let i=0;i<Resp.length;i+=1){
        myArray.push(<tr key={i} onClick={()=> this.setInputBox(Resp[i]) }>
          <td>{Resp[i].Name}</td>
          <td >{Resp[i].Username}</td>
          <td>{Resp[i].Password}</td>
          <td>{Resp[i].Email}</td>
          <td style={{visibility:'hidden'}}>{Resp[i].User_Id}</td>
        </tr>)
      
      }

      this.setState({Users:myArray});

      })
      .catch(function(error){
        console.log(error);
      })
  }

    render(){
      return (
        <div className="container">
            <div className="subcontainer1">
                <form>
             
            <div className="row">
              <div className="col-25">
                <label htmlFor="MName">Name:</label>
              </div>
              <div className="col-75">
                <input type="text" id="MName" name="MName" placeholder="Manager Name" onChange={this.onAddHandle} value={this.state.MName}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="username">Username:</label>
              </div>
              <div className="col-75">
                <input type="text" id="username" name="username" placeholder="Username" onChange={this.onAddHandle} value={this.state.username}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="password">Password:</label>
              </div>
              <div className="col-75">
                <input type="password" id="password" name="Password" placeholder="Password" onChange={this.onAddHandle} value={this.state.password}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Email">Email:</label>
              </div>
              <div className="col-75">
                <input type="email" id="Email" name="Email" placeholder="ex: john@xyzmail.com" onChange={this.onAddHandle} value={this.state.Email}/>
              </div>
            </div>
            <div className="row" style={{visibility:'hidden'}}>
              <div className="col-25" >
                <label htmlFor="User_Id">User_Id</label>
              </div>
              <div className="col-75">
             <input type='text' id="User_Id" name="User_Id" placeholder="AdUser_Id"  onChange={this.onAddHandle} />
              </div>
            </div>
            <br></br>
            <div className="actions">
              <div className="row">
                <input type="submit" value="Delete" onClick={this.onDelete}/>
              </div>
              <div className="row">
                <input type="submit" value="Update" onClick={this.onUpdate}/>
              </div>
              <div className="row">
                <input type="submit" value="Submit" onClick={this.onSubmit}/>
              </div>
            </div>
            </form>
           </div>
              <div className="subcontainer2">
              <table id="customers">
                  <thead>
                  <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Email</th>
                      <th style={{visibility:'hidden'}}>User_Id</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.Users}
                  </tbody>

                  </table>
              </div>
        </div>

    
      )
    }
}

export default Users;