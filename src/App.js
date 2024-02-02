import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Add from "./components/Add";
import Edit from "./components/Edit";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Add/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
