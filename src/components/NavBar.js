import {useEffect, useState} from 'react';
import { TbNotes } from 'react-icons/tb'
import { BiLogOut } from 'react-icons/bi'
import { CgDarkMode } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, signOut} from 'firebase/auth';
import {IoMdOpen} from 'react-icons/io';

const NavBar = ({ isAddNote, hTheme }) => {

	const nav = useNavigate();

	const defaultProfileImage = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

	let googleUserInfo = ""

	if ( localStorage.getItem("loginType") === "google" )
		googleUserInfo = JSON.parse(localStorage.getItem('googleUserInfo'))
	else
		googleUserInfo = ""

	let userEmail = localStorage.getItem("userEmail");

	const [isProfileMenu, setIsProfileMenu] = useState(false);

	const logout = (event) => {
		event.preventDefault();
		const auth = getAuth();
		localStorage.clear();
		signOut(auth)
			.then(res => {
				localStorage.clear();
				nav("/login");
				window.location.reload();
			})
			.catch(err => console.log(err))
	}


	return (
		<>
			<div className={ `flex justify-between max-w-[1200px] p-4 m-auto ${isAddNote ? "hidden": ""} transition-all ` }>
				<Link to="/">
					<div className='flex items-center'>
					<TbNotes size={50} className="-ml-1"/>
					<span className='text-[2rem] font-bold'><span className="text-[2.2rem] text-purple-900 dark:text-purple-200">N</span>otes</span>
					</div>
				</Link>
				<div className='flex gap-3 items-center'>
				<CgDarkMode size={25} onClick={hTheme}
					className="cursor-pointer"/>
				{ userEmail ?
					<div onClick={() => {setIsProfileMenu(!isProfileMenu)}}
						className='flex flex-col items-center justify-center relative'
					>
						<img src={googleUserInfo !== "" ? googleUserInfo.photoURL : defaultProfileImage}
							className='rounded-[50%] w-8 relative cursor-pointer'
						/>
							<div className={`${isProfileMenu ? "" : "opacity-0 scale-0"} z-20 bg-gray-50 dark:bg-gray-900 border-y-2 border-x-2 rounded-md rounded-tr-none duration-200 absolute top-11 right-0 text-left w-36 transition-all border-gray-200 `}>
								<ul className='text-center '>
								{/* <li className='p-2 border-b-2 border-b-gray-100'>Hey you</li> */}
								<li 
									className='p-2 cursor-pointer ' >
									<Link to="/">Home</Link>
								</li>
								<li 
									className='p-2 cursor-pointer ' >
									<Link to="/about">About</Link>
								</li>
								<li onClick={logout}
									className='p-2 cursor-pointer ' >
									<BiLogOut size={20} className="inline mr-1"/> Logout 
								</li>
								</ul>
							</div>
					</div> 
					: <Link to="/about">About</Link>

				}
				</div>
			</div>
		</>
	)
}

export default NavBar;
