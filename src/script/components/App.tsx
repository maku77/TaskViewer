import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Main } from './Main';
import { SignIn } from './SignIn';
import { SignOut } from './SignOut';
import { Top as Top } from './Top';

export const App: React.FC = () => {
  return (<div  style={{margin: '1em'}}>
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Top} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/main" component={Main} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>);
};