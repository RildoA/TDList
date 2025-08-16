import { Routes, Route } from "react-router-dom";
import Aside from "./components/layouts/Aside";
import Section from "./components/layouts/Section";
import Home from "./components/pages/Home";
import Tasks from "./components/pages/Tasks";
import Signup from "./components/pages/Signup";
import Login from './components/pages/Login'
import { AuthProvider } from "./components/AuthContext/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Aside />
        <Section>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tasks" element={<PrivateRoute><Tasks/></PrivateRoute>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Section>
      </div>
    </AuthProvider>
    
  );
}

export default App;
