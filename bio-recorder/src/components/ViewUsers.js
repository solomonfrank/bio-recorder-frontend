import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link , withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchUsers, removeUser}  from '../redux/actions/userAction';

class ViewUser extends Component {
  state = {
    users: [],
    flashMessage: ""
   }

  count = 0;


renderAttr = () => {
    
  if (this.props.users.users.length < 1) {
    return (
    <div className="title">
        <p>No records  yet, click on the button to view all</p>
        </div>
    )
  } else {
      return (
         <div className ="table-responsive">
            <Table  className="table" striped bordered hover>
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
                 { this.props.users.users.map(item => {
                  const birthDate = new Date(`${item.birth_date}`);
                  const curr = new Date();
                  const diff = (curr - birthDate) * (-1); // This is the difference in milliseconds
                  const  age = Math.floor(diff/31557600000);
                  this.count++
                  return (
                    <tr key={item.id}>
                      <td>{this.count}</td>
                        <td>{item.first_name}</td>
                        <td>{item.surname}</td>
                        <td>{item.birth_date}</td>
                        <td>{age}</td>
                        <td>
                          <Link to={`/users/${item.id}`} data-userid={item.id} className="btn  btn__view btn-outline-primary">View</Link>
                          <Link   to={`/edit/${item.id}`} data-userid={item.id} onClick={ this.EditUser}  className="btn  btn__view btn-primary">Edit</Link>
                          <button   data-val={item.id} onClick={()=> this.props.deleteUser(item)} key={item.id } data-userid={item.id} className="btn   btn__view btn-danger">Delete</button>
                        </td>
                    </tr>
                    )
                    })
                  }
                </tbody>
              </Table>
            </div>
          )
        }
      }

render() {
  return (
    <div className="col-md-6 form__wrapper">
      {  this.state.flashMessage && this.renderFlash(this.state.flashMessage )}
      <button onClick ={ () => this.props.fetchAllUser()} className = "btn btn__view btn-primary"> View All User</button>
      { this.renderAttr()}
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllUser: () => dispatch(fetchUsers()),
  deleteUser: user => dispatch(removeUser(user))
})

const mapStateToProps = (state) =>({
  users: state.users
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewUser));