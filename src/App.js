import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home';
import Nav from './component/Nav';
import Question from './page/Question';
import Layout from './component/Layout';
import History from "./page/History";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Layout />}>
            <Route path="/page/question" element={<Question />} />
            <Route path="/page/history" element={<History />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
