import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';
import Mypage from './pages/mypage/Mypage';
import { AuthProvider } from './context/AuthContext';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/mypage" element={
            <ProtectedRoute role={["USER", "HOST"]}>
              <Mypage />
            </ProtectedRoute>
          }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
