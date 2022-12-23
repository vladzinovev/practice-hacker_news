
import { Route, Routes,Router } from 'react-router-dom'
import './App.css';
import Lists from './components/Lists';
import Post from './components/Post';


function App() {

  return (
    
      <div className="App">
        <div className='container'>
          
          <Routes>
            <Route path="/" element={<Lists />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes> 
          
        </div>
      </div>

    
  );
}

export default App;
