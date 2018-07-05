import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Ticket.css'

let to;

class Ticket extends Component {
  componentDidMount() {
    const { id, desc, status } = this.props.ticket;
    if (!to && status === 'done') {
      to = setTimeout(
        e => this.updateTicketHandler(e, id, desc, 'close'),
        5000
      );
    }
  }
  static propTypes = {
    desc: PropTypes.string
  };
  static contextTypes = {
    router: PropTypes.object
  };

  updateTicketHandler = (e, id, desc, status) => {
    if (e) {
      e.stopPropagation();
    }
    this.props.updateTicket(id, desc, status);
    if (to) {
      clearTimeout(to);
      to = undefined;
      return;
    }
    if (!to && status === 'done') {
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
      <div className="col s12 m7"
      onClick={() => this.redirectDetailPageHandler(id)}
      >
        <div className="card horizontal ticket">
          <div className="card-stacked">
            <div className="card-content">
              <p>{desc}</p>
            </div>
            <div className="card-action">
              {this.props.ticket.status === 'todo' && (
                <button
                  className="card-button waves-effect waves-light btn"
                  onClick={e => this.updateTicketHandler(e, id, desc, 'done')}
                >
                  Done
                </button>
              )}
              {this.props.ticket.status === 'done' && (
                <button
                  className="card-button waves-effect waves-light btn"
                  onClick={e => this.updateTicketHandler(e, id, desc, 'todo')}
                >
                  Not Fix
                </button>
              )}
              {this.props.ticket.status !== 'close' && (
                <button
                  className="card-button waves-effect waves-light btn"
                  onClick={e => this.updateTicketHandler(e, id, desc, 'close')}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
