import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import PostScreen from './screens/PostScreen';
import ListProductScreen from './screens/ListProductScreen';
import LoginScreen from './screens/LoginScreen';

// Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [sideToggle, setSideToggle] = useState(false);
  return (
    <Router>
       <Navbar click={() => setSideToggle(true)}/>
       <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
       <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
       <main>
         <Switch>
           <Route exact path="/" component={HomeScreen}/>
           <Route exact path="/product/:id" component={ProductScreen}/>
           <Route exact path="/cart" component={CartScreen}/>
           <Route exact path="/admin/login" component={LoginScreen}/>
           <ProtectedRoute exact path="/admin/product" component={PostScreen}/>
           <ProtectedRoute exact path="/admin/products" component={ListProductScreen}/>
         </Switch>
       </main>
       {/* HomeScreen */}
       {/* ProductScreen */}
       {/* CartScreen  */}
    </Router>
  );
}

export default App;
