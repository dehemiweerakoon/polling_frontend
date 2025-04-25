import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home/Home'
import PollUpdates from './components/PollUpdates/PollUpdates'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/vote' element={<PollUpdates/>}/>
    </Routes>
    </>
  )
}

export default App
