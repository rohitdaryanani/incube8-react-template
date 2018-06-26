export const ADD_TICKETS = 'ADD_TICKETS';
export const MOVE_TICKET = 'MOVE_TICKETS';

export const addTicket = (ticket) => {
  return {
    type: ADD_TICKETS,
    ticket,
  }
}
export const moveTicket = (ticket, status) => {
  return {
    type: MOVE_TICKET,
    ticket,
    status
  }
}