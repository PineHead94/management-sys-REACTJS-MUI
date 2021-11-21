import Home from "./components/Home";
import Login from "./components/Login";
import PatientContextProvider from "./patientContext";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      <PatientContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path ='/' element ={ <Login /> } />
          <Route path = '/home' element ={ <Home /> } />
        </Routes>
      </Router>
      </PatientContextProvider>
    </div>
  );
}

export default App;
