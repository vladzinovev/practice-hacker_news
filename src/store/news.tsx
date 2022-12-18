import axios from "axios";
import { useEffect, useState } from "react";

const baseURL='https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

const News=()=>{
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  if (!posts) return null;

  return ({posts,setPosts})
}
export default News;
