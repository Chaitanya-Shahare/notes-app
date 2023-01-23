import {useState, useEffect} from 'react'
import { IoIosAddCircle, IoMdOpen } from 'react-icons/io'
import { child, ref, set, get, remove } from 'firebase/database';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, orderBy, query } from 'firebase/firestore'

import { db } from '../FirebaseConfig';
import AddNote from '../components/AddNote'
import UpdateNote from '../components/UpdateNote';
import NavBar from '../components/NavBar'
import Note from '../components/Note'
import {useNavigate} from 'react-router-dom';

const MyNotes = ( { hTheme } ) => {

	const nav = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("userEmail") == null){
			nav("/login");
			window.location.reload();
		}
	}, [])
	
	const [ isAddNote, setIsAddNote ] = useState(false)
	const hIsAddNote = (event) => {setIsAddNote(!isAddNote)}

	const [ isUpdateNote, setIsUpdateNote ] = useState(false)
	const hIsUpdateNote = (event) => {setIsUpdateNote(!isUpdateNote)}

	const [ notes, setNotes ] = useState([]);

	let userEmail = localStorage.getItem("userEmail");


	// function getNotes() {
	// 	const notesCollectionRef = collection(db, 'users/' + userEmail.replace(".", "_") +'/notes' );
	// 	getDocs(notesCollectionRef)
	// 		.then(res => {
	// 			const newNotes = res.docs.map(
	// 				doc => ({
	// 					data: doc.data(),
	// 					id: doc.id
	// 				})
	// 			)
	// 			console.log(newNotes);
	// 			setNotes(newNotes)
	// 		})
	// 		.catch(err => console.log(err))
	// }
	//
	
	// getNotes
	useEffect(() => {
		const notesCollectionRef = collection(db, 'users/' + userEmail.replace(".", "_") +'/notes' );
		const q = query(notesCollectionRef, orderBy("datenow"))
		const getNotes = onSnapshot(q, snapshot => {
			setNotes(snapshot.docs.map(doc => (
				{
					id:doc.id,
					data: doc.data()
				}
			)))
		})
	})

	// color
	const colors = [ "red", "green", "orange", "yellow", "purple", "pink", "blue" ]
	
	function getColor(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
	}



	function addNote(title, text) {
		const date = new Date;
		const bgcolor = getColor(colors)
		const data = {
			title,
			text,
			date: date.toLocaleDateString(),
			time: date.toLocaleTimeString(),
			datenow: Date.now(),
			bgcolor
		}
		const notesCollectionRef = collection(db, 'users/' + userEmail.replace(".", "_") +'/notes' );
		
		addDoc(notesCollectionRef, data)
			.then(res => {
				console.log(res.id);
			})
			.catch(err => console.log(err))
	}

	function deleteNote(id) {
		const docRef = doc(db, 'users/' + userEmail.replace(".", "_") +'/notes', id );
		deleteDoc(docRef)
			.then(() => console.log("doc deleted"))
			.catch(err => console.log(err))
	}

	function updateNote(id, title, text, bgcolor) {
		const docRef = doc(db, 'users/' + userEmail.replace(".", "_") +'/notes', id );
		const date = new Date;
		const data = {
			title,
			text,
			date: date.toLocaleDateString(),
			time: date.toLocaleTimeString(),
			datenow: Date.now(),
			// bgcolor: getColor(colors)
		}
		updateDoc(docRef, data)
			.then(res => { 
				console.log(res) 
				unsetUpdateData();
			})
			.catch(err => console.log(err))
	}

	const [updateId, setUpdateId] = useState("");
	const [updateTitle, setUpdateTitle] = useState("");
	const [updateText, setUpdateText] = useState("");
	

	const hUpdateData = (id, title, text) => {
		setUpdateId(id);
		setUpdateTitle(title);
		setUpdateText(text);
	}

	const unsetUpdateData = () => {
		setUpdateId("");
		setUpdateTitle("");
		setUpdateText("");
	}

// const getUserDatabase = () => {
	// 	// alert(userEmail)
	// 	let r = ref(db, '/users/');
	// 	get(child(r, userEmail.replace(".", "_")))
	// 		.then( (ss) => {
	// 			// alert(ss);
	// 			setNotes([])
	// 			// console.log(ss.val());
	// 			// setNotes(ss.val().notes)
	// 			Object.values(ss.val().notes).map((d) => {
	// 				setNotes((olddata) => [...olddata, d]);
	// 			});
	// 		} )
	// }

	// useEffect(() => {getUserDatabase()}, [])


	// const addNote = (title, text) => {
	// 	const date = new Date;
	// 	const newNote = { 
	// 		id: Date.now(),
	// 		title: title,
	// 		text: text,
	// 		date: date.toLocaleDateString(),
	// 		time: date.toLocaleTimeString()
	// 	}

	// 	const newNotes = [...notes, newNote];
	// 	setNotes(newNotes);

	// 	let r = ref(db, '/users/' + userEmail.replace(".", "_") + "/notes/" );
	// 	set(r, newNotes);
	// }

	// const deleteNote = (id) => {
	// 	const newNotes = notes.filter((note) => note.id !== id);
	// 	setNotes(newNotes);

	// 	let r = ref(db, '/users/' + userEmail.replace(".", "_") + "/notes/" );
	// 	set(r, newNotes);
	// }

	// const [ updateId, setUpdateId ] = useState("");
	// const [ updateTitle, setUpdateTitle ] = useState("");
	// const [ updateText, setUpdateText ] = useState("");

	// const updateNote = (id, title, text) => {
	// 	setIsUpdateNote(!isUpdateNote)
	// 	setUpdateId(id);
	// 	setUpdateTitle(title);
	// 	setUpdateText(text);
	// 	console.log(id, title, text);
	// 	// deleteNote(id);
	// }




	return(
		<>
			{ (!isAddNote && !isUpdateNote)  &&
			<NavBar 
				isAddNote={isAddNote}
				hTheme={hTheme}
			/>
			}

			<div className="min-h-[80vh] max-w-screen-lg m-auto p-2">


				{   (!isAddNote && !isUpdateNote)  &&
					(<div className="note-container mt-5 mx-1 min-w-screen">
							{
								// notes.map((note) => (
								notes.slice(0).reverse().map((note) => ( 
								<Note 
								key={note.id}
								id={note.id}
								title={note.data.title}
								text={note.data.text}
								date={note.data.date}
								time={note.data.time}
								bgcolor={note.data.bgcolor}
								hDeleteNote={deleteNote}
								hIsUpdateNote={hIsUpdateNote}
								hUpdateNote={updateNote}
								hUpdateData={hUpdateData}
								unsetUpdateData={unsetUpdateData}
								/>
								))
							}
					</div>)
				}
				

				<AddNote 
					isAddNote={isAddNote}
					hIsAddNote={hIsAddNote}
					hAddNote={addNote}
					hDeleteNote={deleteNote}
					getColor={getColor}
				/>

				<UpdateNote
					isUpdateNote={isUpdateNote}
					hIsUpdateNote={hIsUpdateNote}
					hUpdateNote={updateNote}
					hDeleteNote={deleteNote}

					updateId={updateId}
					updateTitle={updateTitle}
					updateText={updateText}
					unsetUpdateData={unsetUpdateData}
				/>

				<IoIosAddCircle size={60}
					onClick={() => {
						hIsAddNote(); 
					}}
					className={ `fixed bottom-5 right-5 lg:right-[5vw] xl:right-[10vw] cursor-pointer
						z-20 ${( isAddNote || isUpdateNote) ? "hidden" : ""}`}
				/>

			</div>
		</>
	)
}

export default MyNotes;
