import React, { Component } from 'react';
import axios from 'axios';
import './CommonStyle.css'

var Resp=[];
class ShowRoom extends Component {
  state={
    Showroom:null,
    Manager:null,
    Gender:null,
    Mobile:null,
    Email:null,
    Address:null,
    Showrooms:[],
    isopened:false,

}
onAddHandle=(e)=>{
     this.setState({
        [e.target.id]:e.target.value,

    })
}
onSubmit=(e)=>{
   // e.preventDefault();
  // console.log(this.state);
    axios.post('http://localhost/backend-mall-management/AdminPage/Showroom/Showroom.php',this.state)
    .then(res => console.log(res.data));

    this.setState({
        Showroom:'',
        Manager:'',
        Gender:'',
        Mobile:'',
        Email:'',
        Address:''
    })

    
}

setInputBox(i){
 var Showroom=document.getElementById('Showroom');
 var Manager=document.getElementById('Manager');
 var Gender=document.getElementById('Gender');
 var Mobile=document.getElementById('Mobile');
 var Email=document.getElementById('Email');
 var Address=document.getElementById('Address');
 var Showroom_Id=document.getElementById('Showroom_Id');

  Showroom.value=i.Showroom;
  Manager.value=i.Manager;
  Gender.value=i.Gender;
  Mobile.value=i.Mobile;
  Email.value=i.Email;
  Address.value=i.Address;
  Showroom_Id.value=i.Showroom_Id;

}

onDelete=(e)=>{
   // e.preventDefault();
  var Showroom_Id=document.getElementById('Showroom_Id');
  var Showroom1=Showroom_Id.value
  axios.get('http://localhost/backend-mall-management/AdminPage/Showroom/DeleteShowroom.php?Showroom1='+Showroom1)
  .then(result=>console.log(result))
  .catch(function(error){
    console.log(error);
  })
  this.setState({
    Showroom:'',
    Manager:'',
    Gender:'',
    Mobile:'',
    Email:'',
    Address:''
})
}

onUpdate=(e)=>{
  // e.preventDefault();
 var Showroom=document.getElementById('Showroom');
 var Manager=document.getElementById('Manager');
 var Gender=document.getElementById('Gender');
 var Mobile=document.getElementById('Mobile');
 var Email=document.getElementById('Email');
 var Address=document.getElementById('Address');
 var Showroom_Id=document.getElementById('Showroom_Id');

  var Jform=
    {
      Showroom:Showroom.value,
      Manager:Manager.value,
      Gender:Gender.value,
      Mobile:Mobile.value,
      Email:Email.value,
      Address:Address.value,
      Showroom_Id:Showroom_Id.value

    };
    axios.post('http://localhost/backend-mall-management/AdminPage/Showroom/UpdateShowroom.php',Jform)
    .then(res => console.log(res.data));

}


componentDidMount=()=>{

  this.setState({isopened:true});

  
}


componentDidUpdate(){
let myArray=[];
  axios.get('http://localhost/backend-mall-management/AdminPage/Showroom/ShowroomList.php')
  .then(response=>{
    
     Resp=response.data;
  for(let i=0;i<Resp.length;i+=1){
    myArray.push(<tr key={i} onClick={()=> this.setInputBox(Resp[i]) }>
      <td>{Resp[i].Showroom}</td>
      <td>{Resp[i].Manager}</td>
      <td>{Resp[i].Gender}</td>
      <td>{Resp[i].Mobile}</td>
      <td>{Resp[i].Email}</td>
      <td>{Resp[i].Address}</td>
      <td style={{visibility:'hidden'}}>{Resp[i].Showroom_Id}</td>
    </tr>)
  
  }

  this.setState({Showrooms:myArray});
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
                <label htmlFor="Showroom">Shop Name:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Showroom" name="Showroom" placeholder="Showroom" onChange={this.onAddHandle} value={this.state.Showroom}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Manager">Manager Name:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Manager" name="ManagerName" placeholder="Manager Name" onChange={this.onAddHandle} value={this.state.Manager}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Gender">Gender:</label>
              </div>
              <div className="col-75">
                <input list='gender' type="text" id="Gender" name="Gender" placeholder="Gender" onChange={this.onAddHandle} value={this.state.Gender}/>
                <datalist id='gender'>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </datalist>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Mobile">Mobile Number:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Mobile" name="MobNum" placeholder="+91..." onChange={this.onAddHandle} value={this.state.Mobile}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Email">Shop Email:</label>
              </div>
              <div className="col-75">
                <input type="email" id="Email" name="Email" placeholder="ex: john@xyzmail.com" onChange={this.onAddHandle} value={this.state.Email}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Address">Manager Address:</label>
              </div>
              <div className="col-75">
                <textarea id="Address" name="Address" placeholder="Address.." style={{height:150}} onChange={this.onAddHandle} value={this.state.Address}></textarea>
              </div>
            </div>
            <div className="row" style={{visibility:'hidden'}}>
              <div className="col-25" >
                <label htmlFor="Showroom_Id">Showroom_Id</label>
              </div>
              <div className="col-75">
             <input type='text' id="Showroom_Id" name="Showroom_Id" placeholder="AdShowroom_Id"  onChange={this.onAddHandle} />
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
                    <th>Showroom Name</th>
                    <th>Manager Name</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Shop Email</th>
                    <th>Address</th>
                    <th style={{visibility:'hidden'}}>Showroom_Id</th>
                  </thead>
                  <tbody>
                  {this.state.Showrooms}
                  </tbody>
        
                </table>
              </div>
            </div>

    
      )
    }
}

export default ShowRoom;