import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import { AppProvider } from './context';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          {/* Combine home and main as one */}
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
