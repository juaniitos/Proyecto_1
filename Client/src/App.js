import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInSide from '../src/Components/SignIn';
import Home from './Components/Home';
import SocketContext from '../src/Context/socket-context';
import io from 'socket.io-client';
import OrdenVenta from './Components/Screens/Ventas/OrdenVenta';
import InformesVentas from './Components/Screens/Ventas/InformesVentas';
import Kardex from './Components/Screens/Inventario/Kardex';
import ListaProductos from './Components/Screens/Inventario/ListaProductos';
import ListaPrecios from './Components/Screens/Inventario/ListaPrecios';
import OrdenCompra from './Components/Screens/Compras/OrdenCompra';
import InformesCompras from './Components/Screens/Compras/InformesCompras';
import CreateItem from './Components/Screens/Inventario/CreateItem';
import SearchProducts from './Components/Screens/Inventario/SearchProduct';
import logo from "./static/images/logo_JD2.jpg";

function App() {
  const [socket] = useState(io.connect("/"));
  const [login, setLogin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    console.log("SESION",localStorage.getItem('USUARIO'))
    if(localStorage.getItem('USUARIO')) {
      setLogin(true);
      setUsuario(JSON.parse(localStorage.getItem('USUARIO')));
    }else{
      setUsuario({})
    }
    setLoaded(true)
  }, [])

  return (
    <div>
      <img className='logo' src={logo} width={"70vh"} /> 
      <SocketContext.Provider value={{socket: socket, login: login, setLogin: setLogin, usuario: usuario, setUsuario: setUsuario }}>
        <Routes>
          <Route path='/' element={<SignInSide setLogin={setLogin} />} />
          <Route path='/home' element={<Home user={usuario} />} />
          <Route path='/ordenventa' element={<OrdenVenta/>} />
          <Route path='/informesventas' element={<InformesVentas/>} />
          <Route path='/item' element={<CreateItem/>} />
          <Route path='/kardex' element={<Kardex/>} />
          <Route path='/products' element={<ListaProductos/>} />
          <Route path='/precios' element={<ListaPrecios/>} />
          <Route path='/searchProduct/:_id' element={<SearchProducts/>}/>
          <Route path='/ordencompra' element={<OrdenCompra/>} />
          <Route path='/informescompras' element={<InformesCompras/>} />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;