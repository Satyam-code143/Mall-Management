import React, {Component} from 'react';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import AdminPage from './MainPages/AdminPage';
import ShowRoom from './MainPages/AdminPages/Showroom';
import Users from './MainPages/AdminPages/Users';
import MallEmployees from './MainPages/AdminPages/Employee';
import Manager from './MainPages/ManagerPage';
import Category from './MainPages/ManagerPages/Category';
import Product from './MainPages/ManagerPages/Product';
import ShopEmployees from './MainPages/ManagerPages/Employees';
import Customers from './MainPages/ManagerPages/Customers';


class App extends Component{


  render(){
    return(
      <BrowserRouter >
        <div className='App'>
          <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route  path='/AdminPage' component={AdminPage}/>
          <Route  path='/ManagerPage' component={Manager}/>
          </Switch>
          <Route  exact path='/AdminPage/' component={ShowRoom}/>
          <Route  path='/AdminPage/Users' component={Users}/>
          <Route  path='/AdminPage/Employees' component={MallEmployees}/>
          <Route  exact path='/ManagerPage' component={Category}/>
          <Route  path='/ManagerPage/Product' component={Product}/>
          <Route  path='/ManagerPage/Employees' component={ShopEmployees}/>
          <Route  path='/ManagerPage/Customers' component={Customers}/>
        </div>
      </BrowserRouter>

    );
  }
}
export default App;
