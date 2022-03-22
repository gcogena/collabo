import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Explore from './pages/Explore';

// Styles
import "./app.css"

const App = () => {

    const [currentPage, setCurrentPage] = useState('Explore')
    const changeCurrentPage = (page:string) => setCurrentPage(page)

  return (
    <div className="App">
      <Router>
        <Navbar onPageClick={changeCurrentPage} clicked={currentPage}/>
        
        <Routes>
          <Route path="/"></Route>
        </Routes>                
      </Router>

      <div className='body'>
        {currentPage==='Explore' ? <Explore /> : <></>}
        
      </div>
     
    </div>
  );
}

export default App;
