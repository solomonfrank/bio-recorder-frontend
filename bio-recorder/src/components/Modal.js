import React, { Component } from 'react';
import  { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleModal } from '../redux/actions/userAction'


// const AttributeModal = () => {

// return (
//     <div className="modal" tabindex="-1" role="dialog">
//   <div className="modal-dialog" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title">Modal title</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <p>Modal body text goes here.</p>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-primary">Save changes</button>
//         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div>
// )
// }
class  ModalAttr extends Component {
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
    this.props.addAttr(data);
    this.props.modalShow()
    }
  }

    
    
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          User Attribute
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
              <label for="surname">Attribute Name</label>
              <input type="text" className="form-control" onChange = { (event) => this.addAttrName(event) } required id="exampleInputPassword1" placeholder="e.g height"/>
          </div>

          <div className="form-group">
              <label for="attr-val">Value</label>
              <input type="text" className="form-control"  required onChange = { (event) => this.addAttrValue(event) } id="attr-val" placeholder="e.g 10m"/>
                    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" size="md" onClick={ () => this.props.modalShow()}>Close</Button>
          <Button   variant="warning" size="md" onClick={ () => this.addAttrToDom() }>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
 
  
  }

 
  const mapDispatchToProps = dispatch => ({
  
    modalShow: () => dispatch(toggleModal())
  })
  const mapStateToProps = ({ isHidden, users: { users} }) => ({
   
    isHidden
  })
export default connect( mapStateToProps, mapDispatchToProps)(ModalAttr);