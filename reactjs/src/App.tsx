import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Pages/loginForm';
import RegisterForm from './Pages/registerForm';
import { Home } from './Pages/home';
import { useAppSelector } from './redux/hooks';
import UpdateProfile from './Pages/updateProfile';
const App = () => {
  const { isAuthenticated } = useAppSelector(state => state.user)
  console.log(isAuthenticated)
  return <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path='*' element={<Navigate to={getRoute(isAuthenticated)} replace />} />
      <Route>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UpdateProfile />} />
      </Route>
    </Routes>
  </Router>
}

export default App;
export const getRoute = (isAuthenticated: boolean) => {
  if (isAuthenticated) return "/home";
  return "/login"
}