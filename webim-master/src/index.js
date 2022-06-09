import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './page/login';
import Register from './page/register';
import Main from './page/immain/main';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';

const Routes = ()=>(
  <Router >
    <div>
        <Redirect to='/login'/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/main" component={Main} />
    </div>
  </Router>
)
ReactDOM.render(<Routes />,document.getElementById('root'));

