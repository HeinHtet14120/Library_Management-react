import React, { useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import trash from '../assets/delete.svg';
import edit from '../assets/edit.svg'
import Noteform from './Noteform';


export default function NoteList() {

    let { id } = useParams();

    let { getCollection,deleteCollection } = useFirestore();
    let [editNote,seteditNote] = useState(null)

    let {error,data : notes  , loading} = getCollection('note',['Bookid','==', id]);

    let deleteNote = async (id) =>{
        await deleteCollection('note',id);
    }

  return (
    !!notes.length && notes.map(note =>(
        <div className=' shadow-md border-2 my-3 px-3 py-3' key={note.id}>
        <div className='flex space-x-2'>
            <img src='https://brandmark.io/logo-rank/random/pepsi.png' alt='' className={`w-12 h-12 rounded-full`}/>
            <div>
                <h4>Hein Htet</h4>
                <p className=' text-gray-400'>{moment(note?.date?.seconds * 1000).fromNow()}</p>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <div className=' mt-3'>
                {editNote?.id != note.id && note.note}
                {editNote?.id === note.id && <Noteform type="update" seteditNote={seteditNote} editNote={editNote.note} noteID={note.id}/>}
            </div>
            <div className='flex items-center space-x-3 cursor-pointer'>
                <img src={edit} alt="" onClick={() => seteditNote(note)} />
                <img src={trash} alt="" onClick={() => deleteNote(note.id)} />
            </div>
        </div>
        
    </div>
    ))
   
  )
}
