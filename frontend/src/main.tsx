import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux'
import store from './store.ts'
import App from './App.tsx'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import HomeScreen from './screens/HomeScreen.tsx'
import ProductScreen from './screens/ProductScreen.tsx'
import CartScreen from './screens/CartScreen.tsx'
import LoginScreen from './screens/LoginScreen.tsx'
import RegisterScreen from './screens/RegisterScreen.tsx'
import ShippingScreen from './screens/ShippingScreen.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import PaymentScreen from './screens/PaymentScreen.tsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.tsx'
import OrderScreen from './screens/OrderScreen.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HomeScreen />} index={true} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)
