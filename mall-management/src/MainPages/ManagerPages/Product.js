import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CommonStyle.css';
import axios from 'axios';



var Resp=[];
var Cat_Resp=[];
class Product extends Component {
    state={
      
        Product:null,
        Description:null,
        Price:null,
        Category:null,
        Products:[],
        Categorys:[],
        User_Id:this.props.User_Id,
        isopened:false,

    }
    onAddHandle=(e)=>{
         this.setState({
            [e.target.id]:e.target.value,

        })
    }
    onSubmit=(e)=>{

        e.preventDefault();
      
      console.log(this.state);
     var Category=document.getElementById('Category').value;
     

        axios.post('http://localhost/backend-mall-management/ManagerPage/Product/Product.php',this.state)
        .then(res => console.log(res.data));

        this.setState({
            Product:'',
            Description:'',
            Price:'',
            Category:''
        })

        
    }

    setInputBox(i){
     var Category=document.getElementById('Category');
     var Product=document.getElementById('Product');
     var Description=document.getElementById('Description');
     var Price=document.getElementById('Price');
     var Product_Id=document.getElementById('Product_Id');

      Category.value=i.Category;
      Product.value=i.Product;
      Price.value=i.Price;
      Description.value=i.Description;
      Product_Id.value=i.Product_Id;


    }

    onDelete=(e)=>{
      var Product_Id=document.getElementById('Product_Id');
      var User1=Product_Id.value
      axios.get('http://localhost/backend-mall-management/ManagerPage/Product/DeleteProduct.php?Username='+User1)
      .then(result=>console.log(result))
      .catch(function(error){
        console.log(error);
      })
      this.setState({
        Product:'',
        Description:'',
        Price:''
    })
    }

    onUpdate=(e)=>{
        var Category=document.getElementById('Category');
        var Product=document.getElementById('Product');
        var Description=document.getElementById('Description');
        var Price=document.getElementById('Price');
        var Product_Id=document.getElementById('Product_Id');

      var Jform=
        {
          Category:Category.value,
          Product:Product.value,
          Price:Price.value,
          Description:Description.value,
          Product_Id:Product_Id.value

        };
        axios.post('http://localhost/backend-mall-management/ManagerPage/Product/UpdateProduct.php',Jform)
        .then(res => console.log(res.data));

    }


    componentDidMount=()=>{

      this.setState({isopened:true});

      
    }


  componentDidUpdate(){
    let myArray=[];
    let myArray2=[];
      axios.get('http://localhost/backend-mall-management/ManagerPage/Product/ProductList.php?User_Id='+this.state.User_Id)
      .then(response=>{
         Resp=response.data;
         console.log(Resp);
      for(let i=0;i<Resp.length;i+=1){
        myArray.push(<tr key={i} onClick={()=> this.setInputBox(Resp[i]) }>
          <td>{Resp[i].Category}</td>
          <td >{Resp[i].Product}</td>
          <td>{Resp[i].Price}</td>
          <td>{Resp[i].Description}</td>
          <td style={{visibility:'hidden'}}>{Resp[i].Product_Id}</td>
        </tr>)
      
      }

      this.setState({Products:myArray});

      })
      .catch(function(error){
        console.log(error);
      })
      axios.get('http://localhost/backend-mall-management/ManagerPage/Category/CatogoryList.php')
      .then(response=>{
         Cat_Resp=response.data;
         console.log(Cat_Resp);
      for(let i=0;i<Cat_Resp.length;i+=1){
        myArray2.push(<datalist id='Category'>
          <option>{Cat_Resp[i].Category}</option>
        </datalist>)
      
      }

      this.setState({Categorys:myArray2});

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
                <input list='Category' type="text" id="Category" name="Category" placeholder="Select the Category" onChange={this.onAddHandle} value={this.state.Category}/>
                {this.state.Categorys}
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Product">Product:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Product" name="Product" placeholder="Product" onChange={this.onAddHandle} value={this.state.Product}/>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="Price">Price:</label>
              </div>
              <div className="col-75">
                <input type="text" id="Price" name="Price" placeholder="Price" onChange={this.onAddHandle} value={this.state.Price}/>
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
                <label htmlFor="Product_Id">Product_Id</label>
              </div>
              <div className="col-75">
             <input type='text' id="Product_Id" name="Product_Id" placeholder="AdProduct_Id"  onChange={this.onAddHandle} />
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
                      <th>Product</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th style={{visibility:'hidden'}}>Product_Id</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.Products}
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

export default connect(mapStateToProps)(Product);