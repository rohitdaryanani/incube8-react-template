export const ADD_TICKETS = 'ADD_TICKETS';

export const addTicket = (ticket) => {
  return {
    type: ADD_TICKETS,
    ticket,
  }
}