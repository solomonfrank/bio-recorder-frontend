import { Component } from 'react';
import ReactDOM from 'react-dom';



const modalElem = document.getElementById('modal');

class ModalAttr extends Component {
constructor(props) {
  super(props);
  this.elem = document.createElement('div');
 

}
componentDidMount() {
   modalElem.append(this.elem);
}

componentWillUnmount() {
 // modalElem.remove(this.elem)
}

render() {
  return(
    ReactDOM.createPortal(this.props.children, this.elem)
  )
}


}
export default ModalAttr;