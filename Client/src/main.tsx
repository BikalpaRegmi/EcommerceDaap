import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { EthereumContextProvider } from './context/EthereumContext.tsx'
import { ProductContextProvider } from './context/productsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EthereumContextProvider>
        <ProductContextProvider>
          
    <App />
</ProductContextProvider>
      </EthereumContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
