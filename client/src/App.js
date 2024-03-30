import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import  { Toaster } from 'react-hot-toast';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminPrivateRoute from './components/Routes/AdminPrivateRoute';
import Cart from './pages/user/Cart';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
// import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <>
    <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path='user' element={<Dashboard />}/>
          <Route path='user/profile' element={<Profile />}/>
          <Route path='user/orders' element={<Orders />}/>
          
        </Route>
        <Route path='/cart' element={<PrivateRoute/>}>
          <Route path='' element={<Cart />}/>
        </Route>
        <Route path='/dashboard' element={<AdminPrivateRoute/>}>
          <Route path='admin' element={<AdminDashboard />}/>
          <Route path='admin/create-category' element={<CreateCategory />}/>
          <Route path='admin/create-product' element={<CreateProduct />}/>
          <Route path='admin/users' element={<Users />}/>
        </Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/policy' element={<Policy />}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='*' element={<PageNotFound />}/>
    </Routes>
   </>
  );
}

export default App;
