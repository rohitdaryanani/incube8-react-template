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

  render() {
    const { desc } = this.props.ticket;
    return (
      <div style={styles.ticket}>
        {/* Ticket description */}
        <div>{desc}</div>
        {/* Ticket actions [Done/Not Fix/Close]. Modify to display them properly */}
        <div>
          <button>Done</button>
          {this.props.ticket.status !== 'todo' && <button>Not Fix</button> }
          <button>Close</button>
        </div>
      </div>
    );
  }
}

export default Ticket;
