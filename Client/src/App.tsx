
import './App.css'

import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import AddProducts from './pages/AddProducts';
import Home from './pages/home';
import Category from './pages/Category';
import SingleProduct from './pages/SingleProduct';



function App() {
  


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/AddProduct' element={<AddProducts/> } />
        <Route path='/Category' element={<Category/> } />
        <Route path={`/SingleProduct/:id`} element={<SingleProduct/> } />
      </Routes>
    </>
  )
}

export default App
