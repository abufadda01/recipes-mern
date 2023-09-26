import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

import Home from './pages/home';
import Auth from './pages/auth';
import CreateRecipe from './pages/create-recipe';
import SavedRecipe from './pages/saved-recipes';

import Navbar from './components/navbar';


function App() {
  return (
    <div className="App">

      <Router>

      <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/auth' element={<Auth/>}></Route>
          <Route path='/created-recipe' element={<CreateRecipe/>}></Route>
          <Route path='/saved-recipe' element={<SavedRecipe/>}></Route>
        </Routes>

      </Router>

    </div>
  );
}


export default App;
