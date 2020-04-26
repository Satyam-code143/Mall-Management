import React, { Component } from 'react';
import axios from 'axios';
import './CommonStyle.css';



var Resp=[];

class Customers extends Component {
  state={
    Customer:null,
    Designation:null,
    Gender:null,
    Mobile:null,
    Email:null,
    Address:null,
    Customers:[],
    isopened:false,

}
onAddHandle=(e)=>{
     this.setState({
        [e.target.id]:e.target.value,

    })
}
onSubmit=(e)=>{
  //  e.preventDefault();
  console.log(this.state);
    axios.post('http://localhost:8080/backend-mall-management/AdminPage/Customer/Customer.php',this.state)
    .then(res => console.log(res.data));

    this.setState({
        Customer:'',
        Designation:'',
        Gender:'',
        Mobile:'',
        Email:'',
        Address:''
    })

    
}

setInputBox(i){
 var Customer=document.getElementById('Customer');
 var Designation=document.getElementById('Designation');
 var Gender=document.getElementById('Gender');
 var Mobile=document.getElementById('Mobile');
 var Email=document.getElementById('Email');
 var Address=document.getElementById('Address');
 var Customer_Id=document.getElementById('Customer_Id');

  Customer.value=i.Customer;
  Designation.value=i.Designation;
  Gender.value=i.Gender;
  Mobile.value=i.Mobile;
  Email.value=i.Email;
  Address.value=i.Address;
  Customer_Id.value=i.Customer_Id;

}

onDelete=(e)=>{
  //  e.preventDefault();
  var Customer_Id=document.getElementById('Customer_Id');
  var Customer1=Customer_Id.value
  axios.get('http://localhost:8080/backend-mall-management/AdminPage/MallCustomer/DeleteCustomer.php?Customer1='+Customer1)
  .then(result=>console.log(result))
  .catch(function(error){
    console.log(error);
  })
  this.setState({
    Customer:'',
    Designation:'',
    Gender:'',
    Mobile:'',
    Email:'',
    Address:''
})
}

onUpdate=(e)=>{
  // e.preventDefault();
 var Customer=document.getElementById('Customer');
 var Designation=document.getElementById('Designation');
 var Gender=document.getElementById('Gender');
 var Mobile=document.getElementById('Mobile');
 var Email=document.getElementById('Email');
 var Address=document.getElementById('Address');
 var Customer_Id=document.getElementById('Customer_Id');
  var Jform=
    {
      Customer:Customer.value,
      Designation:Designation.value,
      Gender:Gender.value,
      Mobile:Mobile.value,
      Email:Email.value,
      Address:Address.value,
      Customer_Id:Customer_Id.value
    };
    axios.post('http://localhost:8080/backend-mall-management/AdminPage/MallCustomer/UpdateCustomer.php',Jform)
    .then(res => console.log(res.data));

}


componentDidMount=()=>{

  this.setState({isopened:true});

  
}


componentDidUpdate(){
let myArray=[];
  axios.get('http://localhost:8080/backend-mall-management/AdminPage/MallCustomer/CustomerList.php')
  .then(response=>{
    
     Resp=response.data;
  for(let i=0;i<Resp.length;i+=1){
    myArray.push(<tr key={i} onClick={()=> this.setInputBox(Resp[i]) }>
      <td >{Resp[i].Customer}</td>
      <td >{Resp[i].Designation}</td>
      <td>{Resp[i].Gender}</td>
      <td>{Resp[i].Mobile}</td>
      <td>{Resp[i].Email}</td>
      <td>{Resp[i].Address}</td>
      <td style={{visibility:'hidden'}}>{Resp[i].Customer_Id}</td>
    </tr>)
  
  }

  this.setState({Customers:myArray});
  })
  .catch(function(error){
    console.log(error);
  })
}
    render(){
      return (
        <div className="main">
            <div className="container1">
                <form>
                     <div className="row">
              <div className="col-25">
                <label htmlFor="Customer">Name:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Customer" name="CustomerName" placeholder="Customer" onChange={this.onAddHandle} value={this.state.Customer}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Designation">Designation:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Designation" name="Designation" placeholder="Designation" onChange={this.onAddHandle} value={this.state.Designation}/>
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
                <input type="text" id="Mobile" name="MobNum" placeholder="Mobile Num.." onChange={this.onAddHandle} value={this.state.Mobile}/>
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
            <div className="row">
              <div className="col-25">
                <label htmlFor="Address">Address:</label>
              </div>
              <div className="col-75">
                <textarea id="Address" name="Address" placeholder="Address.." style={{height:150}} onChange={this.onAddHandle} value={this.state.Address}></textarea>
              </div>
            </div>
            <div className="row" style={{visibility:'hidden'}}>
              <div className="col-25" >
                <label htmlFor="Customer_Id">Customer_Id</label>
              </div>
              <div className="col-75">
             <input type='text' id="Customer_Id" name="Customer_Id" placeholder="AdCustomer_Id"  onChange={this.onAddHandle} value={this.state.Customer_Id}/>
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
         
              <div className="list">
                <table id="customers">
                <thead>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Shop Email</th>
                    <th>Address</th>
                    <th style={{visibility:'hidden'}}>Employer_Id</th>
                  </thead>
                  <tbody>
                  {this.state.Customers}
                  </tbody>
        
                </table>
              </div>
            </div>

    
      )
    }
}

export default Customers;