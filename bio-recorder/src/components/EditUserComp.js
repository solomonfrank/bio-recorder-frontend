import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, toggleModal } from '../redux/actions/userAction';
import ModalAttr from './modalWrapper';
import ModalForm from './userModal';


class EditUserComp extends Component {
 
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

  renderModal = () => {
    return  (this.props.isHidden.isHidden) ?  <ModalForm  addAttribute={this.addAttribute} /> : null
  }
  
  componentDidMount() {
    this.props.fetchUser(this.props.match.params);

  }
  
  setInputField = (event) => {
  const { value, name }  = event.target;
  const obj = {};
  obj[name]  = value;
  this.setState({ otherAttr: [...this.state.otherAttr, obj]
 })
}

succesFlashMessage = ( { message }) =>( this.setState({flashMessage : message}))

renderFlash = (message) => (
    <div className="alert alert-warning" role="alert">
    { message }
    </div>
)


submitForm = async  (event) => {
  event.preventDefault();
  const {id, first_name, surname, birth_date } = this.props.user;
  let body = {first_name, surname, birth_date, attribute: this.state.otherAttr}
  body = JSON.stringify(body)
 
  const headers = { 'Content-Type': 'application/json' }

  try {
    let user = await axios.put(`https://bio-recorder.herokuapp.com/api/v1/users/${id}`, body, { headers } )
    const { data } = user;
    if (data.success) {
   this.succesFlashMessage(data)
  }

} catch (err) {
  console.log(err.stack)
}
}

render () {
  return (
    <div className="col-md-6 form__wrapper">
      <ModalAttr>
        { this.renderModal() }
      </ModalAttr>
      <form onSubmit = { this.submitForm}>
        {  this.state.flashMessage && this.renderFlash(this.state.flashMessage ) }
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
            <input type="text" className="form-control"     name={Object.keys(attr)}  onChange={ (event) => this.setInputField(event) }  required id="surname" placeholder={ Object.values(attr) }/>
        </div>
        )): ''
        }
        <button type="submit" className="btn form-control btn__bg">Update</button>
      </form>
 </div>
  )
 }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: param => dispatch(getUser(param)),
    modalShow: param => dispatch(toggleModal(param))
})

const mapStateToProps = ({ isHidden ,attribute, users: { users, otherAttr} }) => ({
    user: users,
    isHidden,
    attribute,
    otherUser: otherAttr
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserComp));

