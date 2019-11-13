import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import ViewUser from './ViewUsers';
import CreateUser from './CreateUser';
import EditUserComp  from './EditUserComp';
import User from './User'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

const App = () => (
   <Router>
      <div>
          <Header />
          <Route exact path="/" component={CreateUser}/>
          <Route exact path="/users" component={ViewUser}/>
          <Route exact path="/edit/:id" component={EditUserComp}/>
          <Route exact path="/users/:id" component={User}/>
      </div>
   </Router>
)

export default App;
