import logo from './logo.svg';
import './App.css';
import Embed from 'react-runkit'
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState()
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      {<div>enter user name: <input onChange={(e) => setUsername(e.target.value)} /></div>}
      <div>welcome to kaboot, {username || "jeff"}</div>
      <Embed source={ `// enter your answer here! \n` }  /></div>
  );
}

export default App;
