import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  ticket: {
    border: "1px solid #ccc",
    borderRadius: "3px",
    minHeight: "7em",
    padding: "0.5em",
    margin: "0.5em",
    fontWeight: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};

class Ticket extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    handleMoveTicket: PropTypes.func.isRequired
  };

  updateTicketHandler = (index, status) => {
    this.props.updateTicket(index, status)
  }

  render() {
    console.log(this.props)
    const { desc } = this.props.ticket;
    return (
      <div style={styles.ticket}>
        {/* Ticket description */}
        <div>{desc}</div>
        {/* Ticket actions [Done/Not Fix/Close]. Modify to display them properly */}
        <div>
          {this.props.ticket.status === 'todo' && <button onClick={() => this.updateTicketHandler(this.props.index, 'done')}>Done</button>}
          {this.props.ticket.status === 'done' && <button onClick={() => this.updateTicketHandler(this.props.index, 'todo')}>Not Fix</button> }
          {this.props.ticket.status !== 'close' && <button onClick={() => this.updateTicketHandler(this.props.index, 'close')}>Close</button>}
        </div>
      </div>
    );
  }
}

export default Ticket;
