const initialState = {
  users: [],
  otherAttr: {}
}
  
const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_USER': 
      return {
          ...state,
          users: action.payload
      }
    case 'DELETE_USER': 
    
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id )
      }
    case 'FETCH_USERS':
      return {
          ...state,
          users: action.payload
      }
    case 'FETCH_SINGLE_USER':
      return {
      
        users: state.users.find(user => parseInt(user.id, 10) === parseInt(action.payload.id, 10) )
      }
    case 'TOGGLE_MODAL': 
    return {
      ...state,
      otherAttr:  { ...state.otherAttr, ...action.payload }
    }
    default: 
      return state
  }
}

export default userReducer;