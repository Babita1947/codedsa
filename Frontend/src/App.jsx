import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import Problems from './pages/Problems';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import QuestionDescription from './pages/QuestionDescription';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/problems">
          <Route path='' element={<Problems/>}/>
          <Route path=':name' element={<QuestionDescription />}/>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
