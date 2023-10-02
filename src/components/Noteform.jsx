import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useFirestore from '../hooks/useFirestore';

export default function Noteform({type = 'create', seteditNote, editNote, noteID}) {

    let { id } = useParams();

    let [note,setNote] = useState('');

    let { addCollection, updateCollection} = useFirestore();

    let navigate = useNavigate();
    useEffect(()=>{
      if(type ==='update'){
        setNote(editNote)
      }
    },[type])
  
  let noteSubmit = async (e) =>{
    e.preventDefault();

    let data = {
      note : note,
      Bookid : id
    }

    if(type == 'update'){
      await updateCollection('note',noteID,data);
      seteditNote(null)
      
    }else{
      await addCollection('note',data)
    }
    setNote('')
  }
  
  return (
    <form onSubmit={noteSubmit}>
      
      <textarea value={note} onChange={e => setNote(e.target.value)} name="" className='shadow-md border-2 bg-slate-200 mt-4 w-full' id="" cols="30" rows="5" required></textarea>
      <div className="flex space-x-1">
        <button  type='submit' className='bg-primary text-white flex mb-4 mt-2 py-2 px-2 rounded-lg gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
          <span>{type === 'create' ? 'Add Note':'Update'}</span>
        </button>
        {type === 'update' && <button  type='button' onClick={()=>{seteditNote(null)}} className=' text-red-500 border-2 text-sm border-primary mb-4 mt-2 py-2 px-2 rounded-lg gap-1'>
          <span>Cancle</span>
        </button>}
      </div>
    </form>
  )
}
