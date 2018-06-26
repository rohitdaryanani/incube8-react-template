import {ADD_TICKETS} from '../actions/index'
let id = 0;
const initialState = {
    tickets: [{
        id: id++,
        desc: 'Have fun with Online Test',
        status: 'todo'
      }],
}

export default (state = initialState, action) => {
  switch(action.type){
    case ADD_TICKETS:
    return { 
        tickets : [
             ...state.tickets, 
            {
                id: id++,
                desc: action.ticket,
                status: 'todo'
            }
        ] 
    };
    default:
    return state
  }
}