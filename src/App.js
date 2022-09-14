import './App.css';
import Logo from './components/templates/Logo';
import Menu from './/components/templates/Menu';
import Footer from './components/templates/Footer';
import Rotas from './Rotas';
import {BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Logo />
        <Menu />
        <Rotas />
        <Footer />
      </div>
    </BrowserRouter>    
  )
}

