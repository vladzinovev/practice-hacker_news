import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import './App.css';

const baseURL='https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

function App() {

  const [post, setPost] = React.useState([]);

      useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost(response.data);
        });
      }, []);

      if (!post) return null;

  return (
    <div className="App">
      {post.map(num=>
        <p>{num}</p>
      )}
    </div>
  );
}

export default App;
