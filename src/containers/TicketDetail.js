import React, { Component } from 'react';
import Ticket from '../components/Ticket';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket, updateTicket } from '../actions/index';

const styles = {
  container: {
    display: 'flex'
  },
  box: {
    flex: '0 1 33%',
    textAlign: 'center',
    borderRight: '1px solid #ccc',
    label: {
      fontWeight: 600
    }
  }
};

class TicketDetail extends Component {
  state = {
    ticketInputeValue: '',
    status: '',
    loading: false,
    ticket: '',
    id: ''
  };

  componentDidMount() {
    const ticket = this.props.tickets.find(
      t => t.id === Number(this.props.match.params.id)
    );
    if (!ticket) {
    } else {
      console.log(ticket);
      this.setState({
        ticket,
        ticketInputeValue: ticket.desc,
        status: ticket.status,
        id: ticket.id
      });
    }
  }

  updateTicketHandler = e => {
    e.preventDefault();
    if (!this.state.ticketInputeValue) {
      return;
    }
    this.props.updateTicket(
      this.state.id,
      this.state.ticketInputeValue,
      this.state.status
    );

    this.props.history.push('/');
  };

  handleTicketInputValueHandler = e => {
    this.setState({
      ticketInputeValue: e.target.value
    });
    console.log(this.state.ticketInputeValue);
  };

  handleTicketStatusValueHandler = e => {
    console.log(e.target.value);
    this.setState({
      status: e.target.value
    });
  };

  render() {
    if (!this.state.ticket) {
      return <p>404</p>;
    }
    return (
      <div>
        <h1>Update Ticket</h1>
        <form onSubmit={this.updateTicketHandler}>
          <input
            type="text"
            style={{ borderRadius: '3px' }}
            name="ticket"
            value={this.state.ticketInputeValue}
            onChange={this.handleTicketInputValueHandler}
          />
          <select
            value={this.state.status}
            onChange={this.handleTicketStatusValueHandler}
          >
            <option value="todo">Todo</option>
            <option value="done">Done</option>
            <option value="close">Close</option>
          </select>

          <input
            type="submit"
            value="Update"
            style={{ cursor: 'pointer' }}
            disabled={this.state.loading}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ tickets }) => {
  return {
    tickets
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addTicket, updateTicket }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketDetail);
