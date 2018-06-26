export const ADD_TICKET = 'ADD_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKETS';

export const addTicket = (desc) => {
  return {
    type: ADD_TICKET,
    desc,
  }
}
export const updateTicket = (id, status) => {
  return {
    type: UPDATE_TICKET,
    id,
    status
  }
}