import { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// Components
import Navbar from './components/Navbar';

// Pages
import Explore from './pages/Explore';
import Topics from './pages/Topics';
import DataStories from './pages/DataStories';
import AboutUs from './pages/AboutUs';

// Styles
import "./app.css"

const App = () => {

  const [currentPage, setCurrentPage] = useState('')
  const changeCurrentPage = (page:string) => setCurrentPage(page)

  return (
    <div className="App">

      <BrowserRouter>
          <Navbar onPageClick={changeCurrentPage} clicked={currentPage}/>
          <div className='body'>
            <Routes>
              <Route path="/" element={<Explore changeSidebar={ changeCurrentPage }/>} />
              <Route path="/topics" element={<Topics changeSidebar={ changeCurrentPage }/>} />
              <Route path="/data-stories" element={<DataStories changeSidebar={ changeCurrentPage }/>} />
              <Route path="/about-us" element={<AboutUs changeSidebar={ changeCurrentPage }/>} />
            </Routes>
          </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
