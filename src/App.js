import React, { Component } from 'react';
import Ticket from "./Ticket.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket } from './actions/index'


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

// Keep track of ticket id
let id = 0;

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
            {this.props.tickets.tickets.map((ticket) => {
              return <Ticket key={ticket.id} ticket={ticket}/>
            })}
          </div> 
          <div style={styles.box}>
            <label style={styles.box.label}>DONE</label>
            {/** show Done tickets below */}
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
    return bindActionCreators({ addTicket }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
