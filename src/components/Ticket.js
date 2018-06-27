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
    justifyContent: 'space-between',
    cursor: 'pointer'
  }
};

let to;

class Ticket extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    handleMoveTicket: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: PropTypes.object
  };

  updateTicketHandler = (e, id, desc, status) => {
    if (e) {
      e.stopPropagation();
    }
    this.props.updateTicket(id, desc, status);
    if (to && status !== 'done') {
      clearTimeout(to);
      to = undefined;
      return;
    }
    if (status === 'done') {
      to = setTimeout(
        e => this.updateTicketHandler(e, id, desc, 'close'),
        5000
      );
    }
  };

  redirectDetailPageHandler = id => {
    this.context.router.history.push(`/${id}`);
  };

  render() {
    const { desc, id } = this.props.ticket;
    return (
      <div
        style={styles.ticket}
        onClick={() => this.redirectDetailPageHandler(id)}
      >
        <div>{desc}</div>
        <div>
          {this.props.ticket.status === 'todo' && (
            <button
              onClick={e => this.updateTicketHandler(e, id, desc, 'done')}
            >
              Done
            </button>
          )}
          {this.props.ticket.status === 'done' && (
            <button
              onClick={e => this.updateTicketHandler(e, id, desc, 'todo')}
            >
              Not Fix
            </button>
          )}
          {this.props.ticket.status !== 'close' && (
            <button
              onClick={e => this.updateTicketHandler(e, id, desc, 'close')}
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
