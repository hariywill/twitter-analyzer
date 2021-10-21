import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import { AppProvider } from './context';

function App() {  
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard/:account" exact component={Dashboard} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
