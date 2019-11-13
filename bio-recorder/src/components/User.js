import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/userAction';



class User extends Component {
    
    state = {
      setAttribute: false,
      otherAttr: [],
      userDetail: {
        first_name: '',
        surname : '',
        birth_date: ''
      },
     flashMessage: ""
  }
  
  componentDidMount() {
    this.props.fetchUser(this.props.match.params);
  }
  
  render () {
  return (
    <div className="col-md-6 form__wrapper">
   
      <form onSubmit = { this.submitForm}>
     
        <div className="form-group">
          <label for="first_name">First Name</label>
          <input type="text" className="form-control" value={ !this.props.user ? this.state.userDetail.first_name : this.props.user.first_name } data-label ="first_name"  onChange={ this.setInputField }  required id="firstName"  placeholder="Enter first name" />
         </div>
        <div className="form-group">
          <label for="surname">Surname</label>
          <input type="text" className="form-control"  value={ !this.props.user ? this.state.userDetail.surname : this.props.user.surname }  data-label="surname"   onChange={ this.setInputField }  required id="surname" placeholder="Enter surname"/>
        </div>
        <div className="form-group">
          <label for="birthDate">Birth Date</label>
          <input type="date" className="form-control" value={ !this.props.user ? this.state.userDetail.birth_date : this.props.user.birth_date }  data-label="birth_date"   onChange={ this.setInputField }  required id="birthDate" placeholder=""/>
        </div>

        { ( this.props.user.attribute ) ? this.props.user.attribute.map( attr => 
          (<div  key={Object.keys(attr) }className="form-group">
            <label for="surname">{ Object.keys(attr) }</label>
            <input type="text" className="form-control"   value={ Object.values(attr) }  name={Object.keys(attr)}   required id="surname" placeholder={ Object.values(attr) }/>
        </div>
        )): ''
        }
      
      </form>
 </div>
  )
 }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: param => dispatch(getUser(param)),
})

const mapStateToProps = ({ isHidden ,attribute, users: { users, otherAttr} }) => ({
    user: users,
    isHidden,
    attribute,
    otherUser: otherAttr
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));

