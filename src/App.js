import React, { Component } from 'react';
import Ticket from "./Ticket.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket, moveTicket } from './actions/index'


const styles = {
  container: {
    display: "flex"
  },
  box: {
    flex: "0 1 33%",
    textAlign: "center",
    borderRight: "1px solid #ccc",
    label: {
      fontWeight: 600
    }
  }
};

class App extends Component {
  state = {
    ticketInputeValue: '',
  };

  addTicketHandler = (e) => {
    e.preventDefault(); 
    if(!this.state.ticketInputeValue) {
      return
    }
    this.props.addTicket(this.state.ticketInputeValue)
    this.setState({ ticketInputeValue: ''})

  }

  handleTicketInputValueHandler = (e) => {
    this.setState({
      ticketInputeValue: e.target.value
    })
  }
  
  render() {    
    return (
      <div>
        <form onSubmit={this.addTicketHandler}>
        <input type="text" style={{ borderRadius: "3px" }} name="ticket" value={this.state.ticketInputeValue} onChange={this.handleTicketInputValueHandler}/>
        <input type="submit" value="ADD" style={{ cursor: "pointer" }}/>
        </form>
        <br />
        <br />
        <div style={styles.container}>
          <div style={styles.box}>
            <label style={styles.box.label}>IN-PROGRESS</label>
            {/** show Todo tickets below */}
            {this.props.tickets.tickets.filter(ticket => ticket.status === 'todo').map((ticket) => {
              return <Ticket key={ticket.id} ticket={ticket} moveTicket={this.props.moveTicket}/>
            })}
          </div> 
          <div style={styles.box}>
            <label style={styles.box.label}>DONE</label>
            {this.props.tickets.tickets.filter(ticket => ticket.status === 'done').map((ticket) => {
              return <Ticket key={ticket.id} ticket={ticket} moveTicket={this.props.moveTicket}/>
            })}
          </div>
          <div style={styles.box}>
            <label style={styles.box.label}>CLOSE</label>
            {/** show Close tickets below */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({tickets}) => {
  return {
    tickets
  };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addTicket, moveTicket }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
