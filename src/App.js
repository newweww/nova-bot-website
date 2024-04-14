import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './page/Home';
import Nav from './component/Nav';
import Question from './page/Question';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './component/Layout';
import Hello from "./page/Hello";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Layout />}>
            <Route path="/page/question" element={<Question />} />
            <Route path="/page/hello" element={<Hello />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
