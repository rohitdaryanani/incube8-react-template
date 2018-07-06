import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket, updateTicket } from '../actions/index';

import './App.css';

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
      <div class="col s12 m7 ticket-details-container">
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <span class="card-title">Update Ticket Card</span>
              <form onSubmit={this.updateTicketHandler}>
                <div className="input-field col s6">
                  <input
                    id="ticket"
                    id="ticket"
                    type="text"
                    className="validate"
                    value={this.state.ticketInputeValue}
                    onChange={this.handleTicketInputValueHandler}
                  />
                  <label className="active" htmlFor="ticket">Description</label>
                  {this.state.check && (<span
                    className="helper-text"
                    style={{ color: '#ff003b'}}
                  >
                    This value is required
                  </span>)}
                </div>
                <label>Status:</label>
                <select
                  value={this.state.status}
                  onChange={this.handleTicketStatusValueHandler}
                  className="browser-default"
                >
                  <option value="" disabled selected>
                    Choose your option
                  </option>
                  <option value="todo">Todo</option>
                  <option value="done">Done</option>
                  <option value="close">Close</option>
                </select>
                <button
                  className="btn waves-effect waves-light card-button"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
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
