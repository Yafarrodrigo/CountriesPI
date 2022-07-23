import './App.css';
import {Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home'

function App() {
  return (
  <>
      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/home">
        <Header />
        <Home />
      </Route>

      <Route path="/countries">
        <Header />
        <h1> ERROR </h1>
      </Route>
  </>) 
}

export default App;
