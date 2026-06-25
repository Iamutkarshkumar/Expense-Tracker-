import './App.css'
import { Button } from './components/ui/button.tsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './components/ui/Home.jsx';
import Login from './components/ui/Login.jsx';
import Signup from './components/ui/Signup.jsx';
import { Toaster } from "@/components/ui/sonner"
import { useSelector } from 'react-redux';

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { user } = useSelector(store => store.auth);
  return user ? element : <Navigate to="/login" />;
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute element={<Home/>} />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App
