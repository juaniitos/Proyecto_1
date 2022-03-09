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
// import ListaProductos from './Components/Screens/Inventario/ListaProductos';
// import ListaPrecios from './Components/Screens/Inventario/ListaPrecios';
import OrdenCompra from './Components/Screens/Compras/OrdenCompra';
import InformesCompras from './Components/Screens/Compras/InformesCompras';
import CreateItem from './Components/Screens/Inventario/CreateItem';
import SearchProducts from './Components/Screens/Inventario/SearchProduct';
import EditarItem from './Components/Screens/Inventario/EditarItem';
import logo from "./static/images/logo_JD2.jpg";
import NewListaProductos from './Components/Screens/Inventario/NewListaProductos';
import CreateClient from './Components/Screens/Clientes/CreateClient';
import EditarClient from './Components/Screens/Clientes/EditarClient';
import ClientList from './Components/Screens/Clientes/ClientList';
// import ClientListNoActive from './Components/Screens/Clientes/ClientListNoActive';

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
          <Route path='/item/editar/:_id' element={<EditarItem/>} />
          <Route path='/kardex' element={<Kardex/>} />
          <Route path='/products' element={<NewListaProductos/>} />
          {/* <Route path='/precios' element={<ListaPrecios/>} /> */}
          <Route path='/searchProduct/:_id' element={<SearchProducts/>}/>
          <Route path='/ordencompra' element={<OrdenCompra/>} />
          <Route path='/informescompras' element={<InformesCompras/>} />
          <Route path='/client' element={<CreateClient/>} />
          <Route path='/clientList' element={<ClientList/>} />
          <Route path='/client/editar/:_id' element={<EditarClient/>} />
          {/* <Route path='/clientList/NoActive' element={<ClientListNoActive/>} /> */}
        </Routes>
      </SocketContext.Provider>
    </div>
  );
}

export default App;