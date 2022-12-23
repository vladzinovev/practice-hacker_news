
import { Route, Routes} from 'react-router-dom'
import './App.css';
import Lists from './components/Lists/Lists';
import Post from './components/Post/Post';
import User from './components/User/User';


function App() {

  return (
    
      <div className="App">
        <div className='container'>
          
          <Routes>
            <Route path="/" element={<Lists />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/userid/:by" element={<User />} />
          </Routes> 
          
        </div>
      </div>

    
  );
}

export default App;
