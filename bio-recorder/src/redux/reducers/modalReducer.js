
const initialState = {
  isHidden: false,
  attribute: null,

}


export const modalReducer = (state=initialState, action) => {
  switch(action.type) {
      case 'TOGGLE_MODAL':
        return {
         
        isHidden: !state.isHidden, 
        attribute: action.payload
        }
      default:
        return state
  }
}