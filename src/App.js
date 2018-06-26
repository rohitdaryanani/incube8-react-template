import React, { Component } from 'react';
import Ticket from "./Ticket.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTicket, updateTicket } from './actions/index'


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
    loading: false,
  };

  addTicketHandler = (e) => {
    e.preventDefault();
    if(!this.state.ticketInputeValue) {
      return
    }
    this.setState({
      loading: true,
    })
    new Promise((res, rej) => {
      setTimeout(res, 2000)
    })
    .then(() => {
      this.props.addTicket(this.state.ticketInputeValue)
      this.setState({ ticketInputeValue: '', loading: false})
    })

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
        <input type="submit" value="ADD" style={{ cursor: "pointer" }} disabled={this.state.loading} />
        {this.state.loading && <bold>...</bold>}
        </form>
        <br />
        <br />
        <div style={styles.container}>
          <div style={styles.box}>
            <label style={styles.box.label}>IN-PROGRESS</label>
            {/** show Todo tickets below */}
            {this.props.tickets.filter(ticket => ticket.status === 'todo').map((ticket, index) => {
              return <Ticket key={ticket.id} ticket={ticket} updateTicket={this.props.updateTicket}/>
            })}
          </div> 
          <div style={styles.box}>
            <label style={styles.box.label}>DONE</label>
            {this.props.tickets.filter(ticket => ticket.status === 'done').map((ticket, index) => {
              return <Ticket key={ticket.id} ticket={ticket} updateTicket={this.props.updateTicket}/>
            })}
          </div>
          <div style={styles.box}>
            <label style={styles.box.label}>CLOSE</label>
            {this.props.tickets.filter(ticket => ticket.status === 'close').map((ticket, index) => {
              return <Ticket key={ticket.id} ticket={ticket} updateTicket={this.props.updateTicket}/>
            })}
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
    return bindActionCreators({ addTicket, updateTicket }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
