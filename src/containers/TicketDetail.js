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
  },
  ticket: {
    width: '400px',
    margin: '0px auto',
    border: '1px solid rgb(204, 204, 204)',
    borderRadius: '3px',
    padding: '0.5em'
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
      this.setState({
        ticket,
        ticketInputeValue: ticket.desc,
        status: ticket.status,
        id: ticket.id,
        check: false
      });
    }
  }

  updateTicketHandler = e => {
    e.preventDefault();
    if (!this.state.ticketInputeValue) {
      this.setState({
        check: true
      });
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
    this.setState({
      status: e.target.value
    });
  };

  render() {
    if (!this.state.ticket) {
      return <p>404</p>;
    }
    return (
      <div style={styles.ticket}>
        <h1>Update Ticket</h1>
        <form onSubmit={this.updateTicketHandler}>
          <p>
            Description:
            <input
              type="text"
              style={{ borderRadius: '3px', marginLeft: 20, width: 200 }}
              name="ticket"
              value={this.state.ticketInputeValue}
              onChange={this.handleTicketInputValueHandler}
            />
          </p>
          {this.state.check && (
            <span style={{ color: '#ff003b', marginLeft: 5 }}>
              This value is required{' '}
            </span>
          )}
          <p>
            Status:
            <select
              value={this.state.status}
              onChange={this.handleTicketStatusValueHandler}
              style={{ borderRadius: '3px', marginLeft: 54 }}
            >
              <option value="todo">Todo</option>
              <option value="done">Done</option>
              <option value="close">Close</option>
            </select>
          </p>
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
