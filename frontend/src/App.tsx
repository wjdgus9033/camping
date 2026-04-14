import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
