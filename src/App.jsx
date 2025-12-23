import { Routes,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/NavBar';
import Dashboard from './Components/Dashboard';
import Goals from './Components/Goals';
import History from './Components/History';
import Settings from './Components/Settings';


function App() {

  return (
    <>
      <ToastContainer position='top-center' limit={1} />
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Dashboard/>}/>
        <Route path='/goal' element= {<Goals/>}/>
        <Route path='/history' element= {<History/>}/>
        <Route path='/settings' element= {<Settings/>}/>
      </Routes>
    </>
  )
}

export default App
