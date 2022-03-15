import './App.css';
import cookies from 'js-cookie';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ChangePassword from './Components/Screens/Usuarios/ChangePassword';
import UsersConnection from './Components/Screens/Usuarios/UsersConnection';
import { display, style } from '@mui/system';
// import ClientListNoActive from './Components/Screens/Clientes/ClientListNoActive';

function App() {
  const languages = [
    {
      code: 'es',
      name: 'Español',
      country_code: 'cl'
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'us'
    },
    {
      code: 'pt',
      name: 'Português',
      country_code: 'br'
    }
  ]

  const currentLanguageCode = cookies.get('i18next') || 'es'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const [socket] = useState(io.connect("/"));
  const [login, setLogin] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [usuario, setUsuario] = useState({});

  const GlobeIcon = ({width = 24, height = 24, color='#ffffff'}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className="bi bi-globe2" viewBox="0 0 16 16">
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"></path>
    </svg>
  )

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

  useEffect(() => {
    document.title = t('app_title')
  }, [currentLanguage, t])

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const cerrarSesion = () => {
    localStorage.removeItem('USUARIO');
    setLogin(false);
    navigate("/")
  }

  return (
    <div className='App'>
      <img className='logo' src={logo} width={"70vh"} /> 
      {login &&   
      <div className='d-flex justify-content-end'>
        <Button className='header btn-user' onClick={() => navigate('/Home')}>{t('inf_venta.button')}</Button>
        <Button className='header' onClick={cerrarSesion}>{t('app.header_button')}</Button>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary" className='globe' caret>
            <GlobeIcon/>
          </DropdownToggle>
          <DropdownMenu>
            {languages.map(({code, name, country_code}) => {
              return(
                <DropdownItem onClick={() => i18n.changeLanguage(code)} key={country_code} disabled={code === currentLanguageCode}>
                  <p>
                {/* <span className={`flag-icon flag-icon-${country_code} mx-2`}
                style={{opacity: code === currentLanguageCode ? 0.5 : 1}}></span> */}
                    {name}
                  </p>
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </div>}
      <SocketContext.Provider value={{socket: socket, login: login, setLogin: setLogin, usuario: usuario, setUsuario: setUsuario }}>
        <Routes>
          <Route path='/' element={<SignInSide setLogin={setLogin} />} />
          <Route path='/changePassword' element={<ChangePassword setLogin={setLogin} />} />
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
          <Route path='/chat' element={<UsersConnection />} />
          {/* <Route path='/clientList/NoActive' element={<ClientListNoActive/>} /> */}
        </Routes>
      </SocketContext.Provider>
      {login &&
      <div>
        {window.location.pathname !== '/chat' && window.location.pathname !== '/changePassword' &&
        window.location.pathname !== '/' &&
        <Button className='btn-userChat' onClick={ () => navigate('/chat')}>{t('chat.p')}</Button>}
      </div>}
    </div>
  );
}

export default App;