import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function ForgetPassword({ hTheme }) {

	const nav = useNavigate();

	useEffect(() => {
		const userEmail = localStorage.getItem("userEmail");
		if (userEmail != null)
			nav("/");
	}, []);

	const [ userEmail, setUserEmail ] = useState("");

	const hUserEmail = (event) => { setUserEmail(event.target.value); }


	const resetPassword = (event) => {
		event.preventDefault();
		const auth = getAuth();
		sendPasswordResetEmail(auth, userEmail)
			.then(res => { 
				alert("Email Sent");
				nav("/login"); 
			})
			.catch(err => console.log(err))
	}














	return (
		<>
			<NavBar hTheme={hTheme}/>
				<div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
					<div className="mt-5 md:mt-24 w-full p-6 m-auto bg-white dark:bg-black rounded-md shadow-xl max-w-md">
						<h1 className="text-3xl font-semibold text-center text-purple-700 dark:text-purple-300 uppercase">
						Reset Password
						</h1>
						<form className="mt-6">
							<div className="mb-2">
							<label
								for="email"
								className="block text-sm font-semibold text-gray-800 dark:text-gray-300"
							>
								Email
							</label>
							<input
								type="email"
								className="block w-full px-4 py-2 mt-2 text-purple-700 dark:text-purple-300 bg-white dark:bg-black border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
								onChange={hUserEmail}
							/>
							</div>
							<div className="mt-6">
								<button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 dark:bg-purple-300 dark:text-black rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
								onClick={resetPassword}
							>
								Send Email
							</button>
							</div>
							</form>

						<p className="mt-8 text-xs font-light text-center text-gray-700 dark:text-gray-300">
						{" "}
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-purple-600 dark:text-purple-300 hover:underline"
						>
							<Link to="/signup">
							Sign up
							</Link>
						</Link>
						</p>
						</div>
		</div>
		</>
	);
}


