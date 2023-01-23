import {useState} from 'react';
import { BiArrowBack } from 'react-icons/bi'
import { BiSave } from 'react-icons/bi'
import { MdDelete } from "react-icons/md"

const AddNote = ({ isAddNote, hIsAddNote, hDeleteNote, hAddNote  }) => {

	let date = new Date();

	const [ title, setTitle ] = useState("");
	const [ text, setText ] = useState("");
	// console.log(title, text);


	

	const hTitle = (event) => { 
		setTitle(event.target.value) 

	}
	const hText = (event) => { 
		setText(event.target.value) 
	}

	const save = () => {
		if ((title.trim().length != 0) || (text.trim().length != 0)){
			hAddNote(title, text);
			setTitle("");
			setText("");
		}
		hIsAddNote();
		
	}


	return(
		<>
			<div className={ ` min-h-[90vh] z-10 rounded-[100%] ${!isAddNote ? "-z-0 scale-0 absolute opacity-0 " : "rounded-none"} transition-all duration-100 ease-linear`}>
				<div className={` flex justify-between mt-6 m-4 ${!isAddNote ? "-z-0 scale-0 opacity-0 rounded-[50%]": ""} transition-all `}>
					<BiArrowBack 
						size={25}
						className="cursor-pointer"
						onClick={() => {
							hIsAddNote();
						}}
					/>
					<BiSave 
						size={25}
						className="cursor-pointer"
						onClick={() => {save()}}
					/>
				</div>
				<div>
					<div>
						<textarea
							placeholder="Title"
							className="w-[100%] text-left outline-none p-5 pb-0 text-2xl font-semibold resize-none dark:bg-black"
							value={title}
							onChange={hTitle}
						></textarea>
						<textarea
							placeholder="Note" 
							className="w-full min-h-[79vh] p-5 pt-0 -mt-5 text-left outline-none font-medium text-md resize-none dark:bg-black" 
							value={text}
							onChange={hText}
						></textarea>
					</div>
					<small className={`mx-auto text-center w-screen${!isAddNote ? "opacity-0" : ""}`}>{ date.toLocaleString() }</small>
				</div>
			</div>
		</>
	)
}

export default AddNote;
