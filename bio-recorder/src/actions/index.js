import React from 'react';
import axios from 'axios';



 export const addUser = (body) => async (dispatch) => {


    axios.post('http://localhost:500/api/v1/user/create', { body } )

    
  
    
}



 