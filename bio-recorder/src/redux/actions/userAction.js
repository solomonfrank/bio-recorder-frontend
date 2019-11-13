import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
 
}
export const fetchUsers= () => async dispatch => {
  try {
    const { data: { payload} } = await axios.get('https://bio-recorder.herokuapp.com/api/v1/users', {
      headers: headers
    } )
    
  dispatch({ type: 'FETCH_USERS', payload });
  } catch ( error ){
    console.log(error.stack)
  }
 }

export const removeUser = user => async dispatch => {
   try {
      await axios.delete(`https://bio-recorder.herokuapp.com/api/v1/users/${user.id}`, {
      headers: headers
    } )
    dispatch({ type: 'DELETE_USER', payload: user });
   } catch(error) {
     console.log(error.stack)
   }
 }

 export const getUser = param => ({
   type: 'FETCH_SINGLE_USER',
   payload: param
 })

 export const toggleModal = (attr) => ({
   type: 'TOGGLE_MODAL',
   payload: attr
})

 
