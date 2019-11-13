import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../redux/actions/userAction';
import  { Modal, Button } from 'react-bootstrap';




 class ModalForm extends Component{
    state = {
        name: '',
        value: ''
      };

    addAttrName = event => (this.setState( { name: event.target.value}))

    addAttrValue = event => (this.setState( { value: event.target.value }))
  
    addAttrToDom = () => {
  
    const data = {};
    const attrName = this.state.name;
  
    data[attrName] = this.state.value;
  
    if(attrName && this.state.value) {
      this.props.modalProp.addAttribute(data);
     this.props.modalShow(data)
      }
    }
    render() {
       
        return (
    
            <div className='popup'>
              
                 <div className='popup__content'>
               
                 <Modal.Header  onClick={ () => this.props.modalShow() } closeButton >
                  <Modal.Title id="contained-modal-title-vcenter">
                  User Attribute
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                      <label for="surname">Attribute Name</label>
                      <input type="text" className="form-control" value={ this.state.name} onChange = { (event) => this.addAttrName(event) } required id="exampleInputPassword1" placeholder="e.g height"/>
                  </div>
        
                  <div className="form-group">
                      <label for="attr-val">Value</label>
                      <input type="text" className="form-control"  value={ this.state.value } required onChange = { (event) => this.addAttrValue(event) } id="attr-val" placeholder="e.g 10m"/>
                            </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-primary" size="md" onClick={ () => this.props.modalShow() } >Close</Button>
                  {<Button   variant="warning" size="md"  onClick={ () => this.addAttrToDom() }> {!this.props.isHidden.attribute ? 'Add' : 'Edit' }</Button> }
                </Modal.Footer>
              
                 </div>
               
                
            </div>
          )
    }

}

const mapDispatchToProps = dispatch => ({
  
    modalShow: (data) => dispatch(toggleModal(data))
  })
  const mapStateToProps = ({ isHidden, attribute, }, ownProps ) => ({
   
    isHidden,
    attribute,
    modalProp: ownProps,
    
  })
export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);