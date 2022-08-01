import './App.css';
import {Route, Redirect, Switch} from 'react-router-dom'
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'
import CreateActivityForm from './components/CreateActivityForm/CreateActivityForm';
import CountryDetails from './components/CountryDetails/CountryDetails';

function App() {
  return (
  <>
    <Switch>
      <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/home">
          <Header />
          <Home />
        </Route>

        <Route exact path="/activities/create">
          <Header />
          <CreateActivityForm />
        </Route>

        <Route exact path="/countries">
          <Redirect to="/home" />
        </Route>

        <Route path="/countries/:idPais">
          <Header />
          <CountryDetails />
        </Route>

        <Route path="/countries/*">
          <Redirect to="/home" />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      
  </>) 
}

export default App;
