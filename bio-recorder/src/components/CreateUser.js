import React, { Component } from 'react';
import ModalAttr from './Modal';
import axios from 'axios';





class CreateUser extends Component {
   state = {
        setModalShow: false,
        setAttribute: false,
        otherAttr: [],
        userDetail: {
            first_name: '',
            surname : '',
            birth_date: ''

        },
        flashMessage: ""
        
    
    }


  modalShow = () => this.setState({ setModalShow: true})

  

  modalHide = () => this.setState({ setModalShow: false });

  addAttribute = (data) => ( this.setState ( 
      {
        ...this.state,
        setModalShow: false,
        setAttribute: true,
        otherAttr : [ ...this.state.otherAttr, data],
     
      }
    ) 
        
)

setInputField = (event) => {
   const { value, dataset: { label } }  = event.target;
   const obj = {};
   obj[label]  = value;
   console.log(obj)

this.setState({ userDetail: {
       ...this.state.userDetail,
      ...obj
}})
  
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

submitForm = async  (event) => {
   event.preventDefault();
  const { userDetail, otherAttr } = this.state;
  let body = { ...userDetail, attribute: otherAttr };
  body = JSON.stringify(body)
  console.log(body)
  const headers = {
    'Content-Type': 'application/json',
   
  }

 let user = await axios.post('https://bio-recorder.herokuapp.com/api/v1/user/create', body, {
    headers: headers
  } ).catch(err => console.log(err.stack))
const { data } = user;
if(data.success) {
    this.succesFlashMessage(data)

}

 
}



renderAttr = () => {
    if(this.state.otherAttr.length) {
      return   this.state.otherAttr.map( item => {
             const name = Object.keys(item)
             return (
                <div className="form-group">
                <label for="birthDate">{name}</label>
                <input type="text"  value ={ item[name]} className="form-control" id="birthDate" placeholder=""/>
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
                    <button type="button" onClick={ this.modalShow }   className="btn form-control btn-outline-dark  btn__attr">Add Attribute</button>
                    </div>
                    
                    {  this.state.setModalShow && <ModalAttr show = {this.modalShow}  addAttr = { this.addAttribute  } hideModal={ this.modalHide } />}
                    
                    <button type="submit" className="btn form-control btn__bg">Submit</button>
                    </form>
                  
            </div>
        )
    }


}


export default CreateUser;