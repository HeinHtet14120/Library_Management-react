import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import useFirestore from '../hooks/useFirestore';
import Noteform from '../components/Noteform';
import NoteList from '../components/NoteList';

export default function BookDetails() {

  let { id } = useParams();
  // let url = `http://localhost:3000/books/${id}`;
  // let { data:book , loading , error }=useFetch(url);

  let { isDark } = useTheme();

  let { getDocuments } = useFirestore();

  let {error,data : book ,loading} = getDocuments('books',id);

  return (
    <>
    
    <div> 
    {error && <p>{error}</p>}
    {loading && <p>Loading...</p>}
    {!!book && (
      <div className='grid grid-cols-2' key={book.id}>
        <div>
          <img src={book.cover} alt="" className='w-[70%] my-2 mx-auto ' />
        </div>
        <div className='space-y-4' >
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : ''}`}>{book.title}</h1>
          <div className=' space-x-2'>
            {book.categories.map((b)=>(
              <span className={`px-2 py-1 text-indigo-800 text-sm border border-gray-2 rounded-full ${isDark ? 'text-white border-primary' : ''}`}>{b}</span>
            ))}
          </div>
          <p className={`${isDark ? 'text-white' : ''}`}>
          {book.description}
          </p>
        </div>
        
      </div>
    )}
   
    </div>
    <div>
    <h3 className=' my-3 text-center text-xl font-bold text-primary'>My Note</h3>
      <Noteform/>
      <NoteList/>
    </div>
    </>
  )
}
