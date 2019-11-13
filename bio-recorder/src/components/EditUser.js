import React  from 'react';
import { withRouter, Route } from 'react-router-dom';
import EditUserComp from './EditUserComp';

const  EditUser = ({ match }) => {
 
  return (
    <div>
     <Route exact path={`${match.path}/:id`} component ={ EditUserComp } />
 </div>
  )
}

export default withRouter(EditUser);