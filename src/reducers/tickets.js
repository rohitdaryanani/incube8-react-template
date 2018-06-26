import {ADD_TICKETS, MOVE_TICKET} from '../actions/index'
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
    case MOVE_TICKET:
        const index = state.tickets.findIndex(((ticket) => ticket.id === action.ticket.id))
        state.tickets[index].status = action.status;
        console.log(state.tickets)
        return state
    default:
    return state
  }
}