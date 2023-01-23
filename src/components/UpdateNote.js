import {useState} from 'react';
import { BiArrowBack } from 'react-icons/bi'
import { BiSave } from 'react-icons/bi'
import { MdOutlineDelete } from 'react-icons/md';

const UpdateNote = ({ isUpdateNote, hIsUpdateNote, hDeleteNote, hUpdateNote, updateId, updateTitle, updateText, unsetUpdateData  }) => {

	let date = new Date();

	const [ title, setTitle ] = useState(updateTitle);
	const [ text, setText ] = useState(updateText);
	// console.log(updateTitle, updateText);


	// console.log(updateId);

	const hTitle = (event) => { 
		setIsTitleChange(true)
		// setText(updateText)
		setTitle(event.target.value) 
	}

	const hText = (event) => { 
		setIsTextChange(true)
		// setTitle(updateTitle)
		setText(event.target.value) 
	}

	const save = () => {
		if ((title.trim().length != 0) || (text.trim().length != 0)){
			if (isTitleChange && !isTextChange) 
			{
				hUpdateNote(updateId, title, updateText)
				console.log('1');
			}
			else if (!isTitleChange && isTextChange)
			{
				hUpdateNote(updateId, updateTitle, text)
				console.log('2');
			}
			else if (isTextChange && isTitleChange)
			{
				hUpdateNote(updateId, title, text)
				console.log('3');
			}
			else 
			{
				hUpdateNote(updateId, updateTitle, updateText)
				console.log('4');
			}



			unsetUpdateData();
			// setTitle("");
			// setText("");
		}
		hIsUpdateNote();
		setIsTitleChange(false)
		setIsTextChange(false)
		
	}

	const [ isTitleChange, setIsTitleChange ] = useState(false)
	const [ isTextChange, setIsTextChange ] = useState(false)


	return(
		<>
			<div className={ ` min-h-[90vh] z-10 rounded-[100%] ${!isUpdateNote ? "-z-0 scale-0 absolute opacity-0 " : "rounded-none"} transition-all duration-100 ease-linear`}>
				<div className={` flex justify-between mt-6 m-4 ${!isUpdateNote ? "-z-0 scale-0 opacity-0 rounded-[50%]": ""} transition-all `}>
					<BiArrowBack 
						size={25}
						className="cursor-pointer"
						onClick={() => {
							hIsUpdateNote();
							unsetUpdateData();
						}}
					/>
					<div className='flex gap-3'>
					<MdOutlineDelete
						size={25}
						className="cursor-pointer"
						onClick={() => {hDeleteNote(updateId); hIsUpdateNote()}}
					/>
					<BiSave 
						size={25}
						className="cursor-pointer"
						onClick={() => {save()}}
					/>
					</div>
				</div>
				<div>
					<div>
						<textarea
							placeholder="Title"
							className="w-[100%] text-left outline-none p-5 pb-0 text-2xl font-semibold resize-none  dark:bg-black"
							value={isTitleChange ? title : updateTitle}
							onChange={hTitle}
						></textarea>
						<textarea
							placeholder="Note" 
							className="w-full min-h-[79vh] p-5 pt-0 -mt-5 text-left outline-none font-medium text-md resize-none dark:bg-black" 
							value={isTextChange ? text : updateText}
							onChange={hText}
						></textarea>
					</div>
					<small className={`mx-auto text-center w-screen${!isUpdateNote ? "opacity-0" : ""}`}>{ date.toLocaleString() }</small>
				</div>
			</div>
		</>
	)
}

export default UpdateNote;
