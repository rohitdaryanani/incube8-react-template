import React, { Component } from 'react';
import Ticket from '../components/Ticket';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket, updateTicket } from '../actions/index';

import './App.css';

const styles = {
  container: {
    display: 'flex'
  },
  box: {
    // flex: '0 1 33%',
    textAlign: 'center',
    label: {
      color: '#333',
      fontWeight: 600
    },
    backgroundColor: '#e2e4e6',
    padding: '10px',
    margin: '0 10px'
  }
};

class App extends Component {
  state = {
    ticketInputeValue: '',
    loading: false
  };

  addTicketHandler = e => {
    e.preventDefault();
    if (!this.state.ticketInputeValue) {
      return;
    }
    this.setState({
      loading: true
    });
    new Promise((res, rej) => {
      setTimeout(res, 2000);
    }).then(() => {
      this.props.addTicket(this.state.ticketInputeValue);
      this.setState({ ticketInputeValue: '', loading: false });
    });
  };

  handleTicketInputValueHandler = e => {
    this.setState({
      ticketInputeValue: e.target.value
    });
  };

  render() {
    return (
      <div>
        <form
          className="col s12"
          onSubmit={this.addTicketHandler}
          style={{ marginLeft: '29%' }}
        >
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="ticket">Ticket Name</label>
              <input
                id="ticket"
                type="text"
                className="validate"
                value={this.state.ticketInputeValue}
                onChange={this.handleTicketInputValueHandler}
              />
            </div>
            <div className="input-field col s6">
              {!this.state.loading && (
                <button
                  className="btn waves-effect waves-light card-button"
                  type="submit"
                >
                  Add!
                </button>
              )}
              {this.state.loading && (
                <div class="preloader-background">
                  <div class="preloader-wrapper active">
                    <div class="spinner-layer spinner-blue-only">
                      <div class="circle-clipper left">
                        <div class="circle" />
                      </div>
                      <div class="gap-patch">
                        <div class="circle" />
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="row">
          <div className="ticket-container">
            <label className="ticket-label">IN-PROGRESS</label>
            {this.props.tickets
              .filter(ticket => ticket.status === 'todo')
              .map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    updateTicket={this.props.updateTicket}
                  />
                );
              })}
          </div>
          <div className="ticket-container">
            <label className="ticket-label">DONE</label>
            {this.props.tickets
              .filter(ticket => ticket.status === 'done')
              .map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    updateTicket={this.props.updateTicket}
                  />
                );
              })}
          </div>
          <div className="ticket-container">
            <label className="ticket-label">CLOSE</label>
            {this.props.tickets
              .filter(ticket => ticket.status === 'close')
              .map((ticket, index) => {
                return (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    updateTicket={this.props.updateTicket}
                  />
                );
              })}
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
)(App);
