import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import axios from 'axios';





class ViewUser extends Component {
   state = {
       users: [],
       flashMessage: ""
   }
count = 0;




fetchAllUser = async  (event) => {
   event.preventDefault();

  const headers = {
    'Content-Type': 'application/json',
   
  }

 let { data } = await axios.get('http://localhost:5000/api/v1/users', {
    headers: headers
  } ).catch(err => console.log(err.stack))
 
  this.setState({ users: [...data.payload ]})

}

succesFlashMessage = ( { message }) =>( this.setState({flashMessage : message}))

renderFlash = (message) => {
    console.log(message)
    return (
        <div className="alert alert-warning" role="alert">
        { message }
       </div>
    )
}

deleteUser = async (event) => {
const id =  event.target.dataset.val;
const headers = {
    'Content-Type': 'application/json',
   
  }

 let { data } = await axios.delete(`http://localhost:5000/api/v1/user/delete/${id}`, {
    headers: headers
  } ).catch(err => console.log(err.stack))
console.log(data)
 const { first_name } = data.payload[0];
 console.log(first_name)
 let arr = this.state.users.filter(item => item.first_name !== first_name)
 console.log(arr)
this.setState({ users:arr })

}

renderAttr = () => {
    if(this.state.users.length < 1) {
      return (
      <div className="title">
          <p>No records  yet, click on the button to view all</p>
          </div>
      )
    } else {
        return (
            <React.Fragment>
                 <Table  className ="table-responsive" striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Birth Date</th>
            <th>Age</th>

            <th>Action</th>

            </tr>
        </thead>
        <tbody>

{this.state.users.map(item => {
    const birthDate = new Date(`${item.birth_date}`);
 
    const curr = new Date();
    const diff = (curr - birthDate) * (-1); // This is the difference in milliseconds
    const  age = Math.floor(diff/31557600000);
    this.count++

    return (
        <React.Fragment>
          <tr>
           <td>{this.count}</td>
                <td>{item.first_name}</td>
                <td>{item.surname}</td>
                <td>{item.birth_date}</td>
                <td>{age}</td>
                <td>
                    <button  key={item.id } data-userId={item.id} className="btn  btn__view btn-outline-primary">View</button>
                    <button  key={item.id } data-userId={item.id} onClick={ this.EditUser}  className="btn  btn__view btn-primary">Edit</button>
                    <button  key={item.id } data-val={item.id} onClick={ this.deleteUser} key={item.id } data-userId={item.id} className="btn   btn__view btn-danger">Delete</button>
            </td>
           </tr>
          
        </React.Fragment>
        
    )
})}



</tbody>
</Table>
     </React.Fragment>
        )
     
    }
      
}

render () {

        return (

           
           <div className="col-md-6 form__wrapper">
                {  this.state.flashMessage && this.renderFlash(this.state.flashMessage )}
               <button onClick ={ (event) => this.fetchAllUser(event)} className = "btn btn-primary"> View All User</button>
               { this.renderAttr()}
           </div>
        )
    }


}


export default ViewUser;