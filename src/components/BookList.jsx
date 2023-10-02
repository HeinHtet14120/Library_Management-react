import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch.js'
import { Link, NavLink, useLocation } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { db } from '../firebase'
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import trash from '../assets/delete.svg';
import edit from '../assets/edit.svg';
import useFirestore from '../hooks/useFirestore';
import { AuthContex } from '../contexts/AuthContex';


export default function BookList() {

    let location = useLocation();
    let param = new URLSearchParams(location.search);
    let search = param.get('search');

    // Before Doing Search Function
    // let {data : books ,loading,error} = useFetch(`http://localhost:3000/books`);

    // let {data : books ,loading,error} = useFetch(`http://localhost:3000/books${search ? `?q=${search}`: ''}`);

    let {getCollection, deleteCollection} = useFirestore();

    let { user } = useContext(AuthContex);

    let {error,data : books , loading} = getCollection('books',['uid','==',user.uid]);

    let deleteBook = async(e,id) => {
        e.preventDefault();
        
        //delete book in database
        await deleteCollection('books',id);
    } 



    if(error){
        return <p>{error}</p>
    }

    let {isDark} = useTheme();

    return (
        <>
        {loading && <p>Loading ...</p>}
       
        {/* booklist */}
        {books && !books.length && <p className='text-blue-700 text-center my-3 text-xl h-screen'>No Books Found</p>}
        {!!books && (
           <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 my-3 `} >
               {books.map((b) =>(
                
                <NavLink to={`/books/${b.id}`} key={b.id} >
                   <div className={`p-4 border border-1 min-h-full rounded-lg ${isDark ? 'bg-dcard text-white border-primary' : ''}`} >
                       <div>
                            <img src={b.cover} alt="" />
                       </div>
                       
                       <div className='text-center space-y-2 mt-3'>
                            <>
                                <h1><b>{b.title}</b></h1>
                                <p>{b.description}</p>
                            </>
                             {/* genres */}
                            <div className="flex justify-between items-center">
                                <div className='flex flex-wrap'>
                                        {b.categories.map(genre =>(
                                        <span key={genre} className={`mx-1 my-1 px-2 py-1 text-indigo-800 text-sm border border-gray-2 rounded-full ${isDark ? ' text-white border-primary' : ''}`}>{genre}</span>
                                        ))}
                                </div>
                                <div className='flex space-x-2' >
                                        <div>
                                            <Link to={`/edit/${b.id}` } >
                                            <img src={edit} alt=""/>
                                            </Link>
                                        </div>
                                    
                                        <div>
                                            <img src={trash} alt="" onClick={(e) => deleteBook(e,b.id)}/>
                                        </div>
                                    
                                </div>
                            </div>
   
                       </div>
                   </div>
                </NavLink>
                
               ))}
           </div>
        )}  
       </>
    
  )
}
