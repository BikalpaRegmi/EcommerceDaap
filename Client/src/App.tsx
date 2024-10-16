
import './App.css'

import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddProducts from './pages/AddProducts';
import Home from './pages/home';
import Category from './pages/Category';
import SingleProduct from './pages/SingleProduct';
import DisconnectInstructions from './pages/DisconnectMetamask';
import OrderHistory from './pages/OrderHistory';



function App() {
  


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AddProduct' element={<AddProducts/> } />
        <Route path='/Category' element={<Category/> } />
        <Route path={`/SingleProduct/:id`} element={<SingleProduct />} />
        <Route path={`/Disconnect`} element={<DisconnectInstructions />} />
        <Route path={`/History`} element={<OrderHistory />} />
        
      </Routes>
    </>
  )
}

export default App
