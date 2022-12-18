import axios from "axios";
import { useEffect, useState } from "react";

const baseURL='https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

const Novelty=()=>{
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  if (!posts) return null;
  return (posts)
}
export default Novelty;