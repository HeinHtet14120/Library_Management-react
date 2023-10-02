import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import useFirestore from '../hooks/useFirestore';
import { AuthContex } from '../contexts/AuthContex';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Create() {

  let {id} = useParams();

  let [title,setTitle] = useState('');
  let [description,setDescription] = useState('');
  let [newcategory,setNewCategory] = useState('');
  let [categories,setCategories] = useState([]);
  let [isEdit, setEdit] = useState(false);
  let [file,setFile] = useState(null);
  let [preview,setPreview] = useState('')

  let navigate = useNavigate();

  // let {setPostData, data : books} = useFetch('http://localhost:3000/books', 'POST');

  useEffect(()=>{

    //edit form
    if(id){
      setEdit(true);
      let ref = doc(db, 'books', id)
      getDoc(ref).then(doc =>{
        if(doc.exists){
          let {title, description, categories} = doc.data()
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      })
    }else{
      //create form
      setEdit(false)
      setTitle('');
      setDescription('');
      setCategories([]);
    }
  },[])

  let addCategories = (e) =>{
    if(newcategory && categories.includes(newcategory)){
      setNewCategory('')
      return
    }
    setCategories(prev => [newcategory,...prev])
    setNewCategory('')
  }

  let { user } = useContext( AuthContex);

  let uploadtoFirebase = async (file) =>{

    let uniqueFilename = Date.now().toString() +'_'+file.name;
    let path = "/covers/"+user.uid+"/"+uniqueFilename;
    let storageRef = ref(storage, path)
    let res = await uploadBytes(storageRef,file);
    return await getDownloadURL(storageRef);

  }

  let submitForm =  async(e) =>{
    e.preventDefault();

    let url = await uploadtoFirebase(file);
    let data = {
      title,
      description,
      categories,
      uid : user.uid,
      cover : url
    }
   
    let {addCollection,updateCollection} = useFirestore();
    
    if(isEdit){
      await  updateCollection('books',id,data)
    }else{
      await addCollection('books',data);
    }
    navigate('/')
  }



  let fileHandle = (e) =>{
    setFile(e.target.files[0]);
  }

  let handlePreviewImage = (file) =>{
    let read = new FileReader;
    read.readAsDataURL(file);

    read.onload = () =>{
      setPreview(read.result);
    }
  }

  useEffect(() =>{
    if(file){
      handlePreviewImage(file)
    }
  },[file])


  

  let {isDark} =  useTheme();
  return (
    <div className='h-screen'>  
    <form className="w-full max-w-lg mx-auto mt-2" onSubmit={submitForm}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-password">
            Book Name
          </label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Name"/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-password">
            Book Description 
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Description"/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-password">
            Book Categories 
          </label>
          <div className='flex items-center space-x-2'>
            <input value={newcategory} onChange={e => setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Categories" />
            <button type='button' onClick={addCategories} className='bg-primary rounded-full mb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
              {categories.map(genre =>(
              <span key={genre} className="mx-1 my-1 px-2 py-1 text-indigo-800 text-sm border border-gray-2 rounded-full ">{genre}</span>
              ))}
        </div>
      </div>

      <div className="w-full px-3 my-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-password">
            Book Image
          </label>
          <input type="file" name="" id="" onChange={fileHandle} className='my-2'/>
          {!!preview && <img src={preview} alt="" width={200} height={200}/>}
        </div>

      <button  className='bg-primary px-3 py-2 rounded-2xl text-white flex justify-center items-center gap-1 w-full'>
         
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
  
        
            <span className="hidden md:block">{isEdit ? 'Update' : 'Create'} Book</span>    
      </button>
    </form>
    </div>

  )
}
