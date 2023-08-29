import React,{useState} from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,  
} from "react-router-dom";


function App() {
  const [progress, setProgress] =useState(0);
  return (
<>
<Router>
   <Navbar/>
   <LoadingBar
        color='#f11946'
        progress={progress}
      />
  <Routes>
    <Route path="/" element={<News key="general" setProgress={setProgress} pageSize={10} country="in" category="general"/>} />
    <Route path="/business" element={<News key="business" setProgress={setProgress} pageSize={10} country="in" category="business"/>} />
    <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} pageSize={10} country="in" category="entertainment"/>} />
    <Route path="/technology" element={<News key="technology"setProgress={setProgress} pageSize={10}  country="in" category="technology"/>} />
    <Route path="/sports" element={<News key="sports" setProgress={setProgress} pageSize={10}  country="in" category="sports"/>} />
    <Route path="/science" element={<News key="science" setProgress={setProgress} pageSize={10} country="in" category="science"/>} />
    <Route path="/health" element={<News key="health" setProgress={setProgress} pageSize={10} country="in" category="health"/>} />
   </Routes>
</Router>
</>
  );
}

export default App;
