import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Lists from "./components/Lists/Lists";
import Post from "./components/Post/Post";
import User from "./components/User/User";
import Page404 from "./pages/Page404";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Lists />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/users/:by" element={<User />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
