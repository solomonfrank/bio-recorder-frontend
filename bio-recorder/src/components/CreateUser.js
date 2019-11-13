import React, { Component } from 'react';
import ModalAttr from './modalWrapper';
import ModalForm from './userModal';
import axios from 'axios';
import { connect } from 'react-redux';
 import { toggleModal } from '../redux/actions/userAction';


class CreateUser extends Component {
  state = {
    setModalShow: true,
    setAttribute: false,
    otherAttr: [],
    userDetail: {
        first_name: '',
        surname : '',
        birth_date: ''

    },
    flashMessage: ""
  }
  


  addAttribute = (data) => ( this.setState ( 
    {
      ...this.state,
      setModalShow: false,
      setAttribute: true,
      otherAttr : [ ...this.state.otherAttr, data],
    
    }
  ) 
)

renderModal = () => {

  if (this.props.isHidden.isHidden) {
    
    return  <ModalForm  addAttribute={this.addAttribute} />
  } else {
    return null
  }

}

setInputField = (event) => {
  const { value, dataset: { label } }  = event.target;
  const obj = {};
  obj[label]  = value;
  this.setState({ userDetail: {
      ...this.state.userDetail,
    ...obj
  }
 })
}

succesFlashMessage = ( { message }) =>( this.setState({flashMessage : message}))

renderFlash = (message) => {
  return (
    <div className="alert alert-warning" role="alert">
    { message }
    </div>
  )
}

submitForm = async  (event) => {
  event.preventDefault();
  const { userDetail, otherAttr } = this.state;
  let body = { ...userDetail, attribute: otherAttr };
 
  body = JSON.stringify(body)
  // this.props.createUser(body)
  
  const headers = {
    'Content-Type': 'application/json',
  }

  try {
    
    let user = await axios.post('https://bio-recorder.herokuapp.com/api/v1/users', body, {
      headers: headers
    } )
    const { data } = user;

    if (data.success) {
      this.succesFlashMessage(data)
   }
   let userDetail =  {
    first_name: '',
    surname: '',
    birth_date: ''
  }
    this.setState( prevState => ({ ...prevState, userDetail: {
      first_name:'',
      surname: '',
      birth_date: ''
    }, otherAttr: [] }))
  } catch (error ) {}

  

}

renderAttr = () => {
  let items = Object.entries(this.props.users);
  console.log(items)
  if(items.length) {
    return  items.map( item => {
      // const name = Object.keys(item)
      console.log(item)
      return (
        <div className="form-group">
        <label for="birthDate">{item[0]}</label>
        <input type="text"  value ={ item[1]} className="form-control" id="birthDate" placeholder=""/>
    </div>
      )
  })
 }
}

render () {

  return (
    <div className="col-md-6 form__wrapper">
      <form onSubmit = { this.submitForm}>
        {  this.state.flashMessage && this.renderFlash(this.state.flashMessage )}
        <div className="form-group">
            <label for="first_name">First Name</label>
            <input type="text" className="form-control"  data-label ="first_name"  onChange={ this.setInputField }  required id="firstName"  placeholder="Enter first name" />
            
        </div>
        <div className="form-group">
            <label for="surname">Surname</label>
            <input type="text" className="form-control"  data-label="surname"   onChange={ this.setInputField }  required id="surname" placeholder="Enter surname"/>
        </div>

        <div className="form-group">
            <label for="birthDate">Birth Date</label>
            <input type="date" className="form-control"  data-label="birth_date"   onChange={ this.setInputField }  required id="birthDate" placeholder=""/>
        </div>
        { this.renderAttr() }
        <div className="form-group">
        <button type="button" onClick={ this.props.modalShow }   className="btn form-control btn-outline-dark  btn__attr">Add Attribute</button>
        </div>
        <ModalAttr>
           { this.renderModal() }
         </ModalAttr>
        {/* {  this.setModalShow && <ModalAttr show = {this.modalShow}  addAttr = { this.addAttribute  } hideModal={ this.modalHide } />} */}
        
        <button type="submit" className="btn form-control btn__bg">Submit</button>
      </form>
   </div>
  )
  }
}

// const mapDispatchToProp = dispatch  => ({
//   createUser: user => dispatch(addUser(user))
// }

//)
const mapDispatchToProps = dispatch => ({
  
  modalShow: () => dispatch(toggleModal())
})
const mapStateToProps = ({ isHidden, users: { otherAttr} }) => ({
  users: otherAttr,
  isHidden
})
export default connect(mapStateToProps, mapDispatchToProps )(CreateUser)