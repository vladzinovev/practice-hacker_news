
import React, { useContext } from 'react';
import './App.css';
import { StoreContext } from './store/store';




function App() {

  const {posts}=useContext(StoreContext);

  return (
    <div className="App">
      {posts.map(num=>
        <p>{num}</p>
      )}
    </div>
  );
}

export default App;
