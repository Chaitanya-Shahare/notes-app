import NavBar from "../components/NavBar";


const About = ({ hTheme }) => {

	return (
		<>
			<NavBar hTheme={hTheme}/>
			<div className="max-w-md m-auto mt-12">
			<h2 className="text-2xl text-center text-purple-300 mb-3">About</h2>
				<p className="text-center text-md mb-6">
				This is a simple notes app made using <br/>
					<span className="text-lg">
					React, Firebase & Tailwind CSS
					</span>
				</p>
			<h2 className="text-2xl text-center text-purple-300 my-3">Features</h2>
				<ul className="list-disc text-left px-12 mb-6">
				<li>Add, Update, Delete notes</li>
				<li>Notes are stored in Firebase firestore database</li>
				<li>Firebase authntication for email & passwrod login & google signin</li>
				<li>Styled using Tailwind CSS with a darkmode</li>
				</ul>
			<h2 className="text-2xl text-center text-purple-300 my-3">Contact</h2>
				<ul className="mb-6 text-center">
				<li>Author: Chaitanya Shahare</li>
				<li>Email: <a href="mailto:shaharechaitanya3@gmail.com">shaharechaitanya3@gmail.com</a></li>
				<li>Blog: <a href="https://blog.chaitanyashahare.com">blog.chaitanyashahare.com</a></li>
				</ul>
		</div>
		</>
	)
}

export default About;
