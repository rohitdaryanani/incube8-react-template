import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';
import TicketDetail from './containers/TicketDetail';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/:id" component={TicketDetail} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
