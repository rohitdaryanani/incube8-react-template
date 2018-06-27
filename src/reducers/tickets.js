import { ADD_TICKET, UPDATE_TICKET } from '../actions/index';
let id = 0;
const initialState = [
  {
    id: id++,
    desc: 'Have fun with Online Test',
    status: 'todo'
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return [
        ...state,
        {
          id: id++,
          desc: action.desc,
          status: 'todo'
        }
      ];

    case UPDATE_TICKET:
      const ticket = state.find(t => t.id === action.id);
      if (!ticket) {
        return state;
      }
      ticket.status = action.status;
      ticket.desc = action.desc;
      return [...state];
    default:
      return state;
  }
};
