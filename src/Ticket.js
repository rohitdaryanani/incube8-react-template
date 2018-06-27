import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  ticket: {
    border: '1px solid #ccc',
    borderRadius: '3px',
    minHeight: '7em',
    padding: '0.5em',
    margin: '0.5em',
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};

let to;

class Ticket extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    handleMoveTicket: PropTypes.func.isRequired
  };

  updateTicketHandler = (id, status) => {
    this.props.updateTicket(id, status);
    if (to && status !== 'done') {
      clearTimeout(to);
      to = undefined;
      return;
    }
    if (status === 'done') {
      to = setTimeout(() => this.updateTicketHandler(id, 'close'), 5000);
    }
  };

  render() {
    const { desc } = this.props.ticket;
    return (
      <div style={styles.ticket}>
        <div>{desc}</div>
        <div>
          {this.props.ticket.status === 'todo' && (
            <button
              onClick={() =>
                this.updateTicketHandler(this.props.ticket.id, 'done')
              }
            >
              Done
            </button>
          )}
          {this.props.ticket.status === 'done' && (
            <button
              onClick={() =>
                this.updateTicketHandler(this.props.ticket.id, 'todo')
              }
            >
              Not Fix
            </button>
          )}
          {this.props.ticket.status !== 'close' && (
            <button
              onClick={() =>
                this.updateTicketHandler(this.props.ticket.id, 'close')
              }
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Ticket;
