import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import TaxCalculator from './components/TaxCalculator'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={TaxCalculator} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App