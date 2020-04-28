import React, { Component } from 'react';
import './CommonStyle.css';
import axios from 'axios';
import { connect } from 'react-redux';




var Resp=[];
class Category extends Component {
 
  
    state={
      
        Category:null,
        Description:null,
        User_Id:'',
        Info:[],
        isopened:false,

    }
    

    onAddHandle=(e)=>{
     
         this.setState({
            [e.target.id]:e.target.value,

        })
    }
    onSubmit=(e)=>{
        // e.preventDefault();
        axios.post('http://localhost/backend-mall-management/ManagerPage/Category/Category.php',this.state)
        .then(res => console.log(res.data));

        this.setState({
            Category:'',
            Description:''
        })
        
        
    }

    setInputBox(i){
     var Category=document.getElementById('Category');
     var Description=document.getElementById('Description');
     var Cat_Id=document.getElementById('Cat_Id');

      Category.value=i.Category;
      Description.value=i.Description;
      Cat_Id.value=i.Cat_Id;


    }

    onDelete=(e)=>{
      var Cat_Id=document.getElementById('Cat_Id');
      var Cat1=Cat_Id.value
      axios.post('http://localhost/backend-mall-management/ManagerPage/Category/DeleteCategory.php?Username='+Cat1)
      .then(result=>console.log(result.data))
      .catch(function(error){
        console.log(error);
      })
      this.setState({
        Category:'',
        Description:''
    })
    }

    onUpdate=(e)=>{
      var Category=document.getElementById('Category');
     var Description=document.getElementById('Description');
     var Cat_Id=document.getElementById('Cat_Id');

      var Jform=
        {
          Category:Category.value,
          Description:Description.value,
          Cat_Id:Cat_Id.value

        };
        axios.post('http://localhost/backend-mall-management/ManagerPage/Category/UpdateCategory.php',Jform)
        .then(res =>console.log(res.data));

    }


    componentDidMount=()=>{
      this.setState({isopened:true,User_Id:this.props.User_Id});

      
    }


  componentDidUpdate(){
    let myArray=[];
      axios.get('http://localhost/backend-mall-management/ManagerPage/Category/CategoryList.php?User_Id='+this.state.User_Id)
      .then(response=>{
         Resp=response.data;
      for(let i=0;i<Resp.length;i+=1){
        myArray.push(<tr key={i} onClick={()=> this.setInputBox(Resp[i]) }>
          <td>{Resp[i].Category}</td>
          <td >{Resp[i].Description}</td>
          <td >{Resp[i].Cat_Id}</td>
        </tr>)
      
      }

      this.setState({Info:myArray});

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
                <label htmlFor="Category">Category:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Category" name="Category" placeholder="Ex: Food,Clothing,Footwear etc" onChange={this.onAddHandle} value={this.state.Category}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Description">Description:</label>
              </div>
              <div className="col-75">
                <textarea id="Description" name="Description" placeholder="Description.." style={{height:150}} onChange={this.onAddHandle} value={this.state.Description}></textarea>
              </div>
            </div>
            <div className="row" style={{visibility:'hidden'}}>
              <div className="col-25" >
                <label htmlFor="Cat_Id">Cat_Id</label>
              </div>
              <div className="col-75">
             <input type='text' id="Cat_Id" name="Cat_Id" placeholder="AdCat_Id"  onChange={this.onAddHandle} />
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
                      <th>Category</th>
                      <th>Description</th>
                      <th >Cat_Id</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.Info}
                  </tbody>

                  </table>
              </div>
          </div>

    
      )
    }
}

const mapStateToProps = (state) => {
  return{
  User_Id: state.storeId
  }
}

export default connect(mapStateToProps)(Category);