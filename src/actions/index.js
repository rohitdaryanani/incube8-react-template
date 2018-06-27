export const ADD_TICKET = 'ADD_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKETS';
export const FETCH_TICKET = 'FETCH_TICKET';
export const EDIT_TICKET = 'EDIT_TICKET';

export const addTicket = desc => {
  return {
    type: ADD_TICKET,
    desc
  };
};

export const updateTicket = (id, desc, status) => {
  return {
    type: UPDATE_TICKET,
    id,
    desc,
    status
  };
};
