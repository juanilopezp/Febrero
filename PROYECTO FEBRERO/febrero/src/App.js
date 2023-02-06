import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './componentes/headers/Header';
import Paginas from './componentes/headers/main/Paginas';


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Paginas/>
        
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
