import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import MyNotes from './pages/MyNotes'
import {app} from "./FirebaseConfig"
import {useEffect, useState} from 'react';
import About from './pages/About';
import ForgetPassword from './components/ForgetPassword';

function App() {

	const [theme, setTheme] = useState("dark")

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme])

	const hTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	}

  return (
	  <div className="App dark:text-white">
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <MyNotes hTheme={hTheme}/> }/>
				<Route path='/login' element={ <Login hTheme={hTheme}/> }/>
				<Route path='/signup' element={ <Signup hTheme={hTheme}/> }/>
				<Route path='/about' element={ <About hTheme={hTheme}/> }/>
				<Route path='/forgetpassword' element={ <ForgetPassword hTheme={hTheme}/> }/>
			</Routes>
		</BrowserRouter>
    </div>
  );
}

export default App;
