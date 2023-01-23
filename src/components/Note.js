import { MdDelete } from "react-icons/md"
import UpdateNote from "./UpdateNote";

const Note = ({title, text, date, time, id, bgcolor, hDeleteNote, hIsUpdateNote, hUpdateNote, hUpdateData, unsetUpdateData}) => {

	const triggerUpdateNote = () => {
		// hUpdateNote(id, text, title);
		unsetUpdateData();
		hIsUpdateNote();
		hUpdateData(id, title, text);
	}
	

	return (
		<>
			<div className={`note  relative flex flex-col justify-between min-h-[200px] bg-${bgcolor}-200  text-black  text-left p-3  
				md:mx-0 rounded-md group hover:scale-105 transition-all hover:shadow-md`}
			>
				<div className="cursor-pointer min-h-[150px]" 
					onClick={triggerUpdateNote}
				>
					<h3 className="text-md font-medium">{ title }</h3>
					<p className="text-sm whitespace-pre-wrap">{ text }</p>
				</div>
				<div className="flex justify-between cursor-default">
					<small className="font-light">{ date }</small>
					<small className="font-light absolute left-[46%]">{ time } </small>
					<MdDelete size={20} 
						className="z-20 cursor-pointer font-light lg:scale-0 lg:group-hover:scale-100 transition-all"
						onClick={() => {hDeleteNote(id)}}
					/>
				</div>
			</div>
			{/* <div className="hidden"> */}
			{/* 	<UpdateNote */}
			{/* 		updateId={id} */}
			{/* 		updateTitle={title} */}
			{/* 		updateText={text} */}
			{/* 	/> */}
			{/* </div> */}
			<div className="hidden
			bg-red-200 bg-green-200 bg-orange-200 bg-yellow-200 bg-purple-200 bg-pink-200 bg-blue-200"></div>
		</>
	)
}

export default Note;
