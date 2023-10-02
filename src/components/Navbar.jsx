import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light.svg';
import darkIcon from '../assets/dark.svg'
import blogout from '../assets/blogout.svg'
import wlogout from '../assets/whiteLogout.svg'
import useSignOut from '../hooks/useSignout';
import bregister from '../assets/bregister.svg';
import wregister from '../assets/wregister.svg';
import blogin from '../assets/blogin.svg';
import wlogin from '../assets/wlogin.svg';
import { AuthContex } from '../contexts/AuthContex';


export default function Navbar() {

    let [search,setSearch] = useState('')
    let navigate = useNavigate();
    let { user } = useContext(AuthContex);

    let searchHandle = (e) =>{
        navigate('/?search='+search);
        setSearch('')
    }

    let {isDark, changeTheme} = useTheme();

    let {logout} = useSignOut();
    let signoutUser = async () =>{
        await logout();
        navigate('/login')
    }

  return (
    <nav className={`border border-b-1 ${isDark ? 'bg-dbg border-primary' : 'bg-white'} `}>
            <ul className='flex justify-between p-3 items-center max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>
                    <button onClick={searchHandle} className=' bg-black rounded-full text-white flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <input value={search} onChange={e => setSearch(e.target.value)}  type='text' placeholder='search books...' className='outline-none px-2 py-1 rounded-lg bg-gray-300'/>
                </li>

                <Link to='/' className='flex items-center gap-3 md:-ml-32 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark ? 'text-purple-500' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>

                    <span className='text-2xl font-bold text-primary hidden md:block'>Book Store</span>
                </Link>
                <li className='flex items-center gap-3' >
                    {/* Create Books */}
                    <Link to="/create" className='bg-primary px-3 py-2 rounded-2xl text-white flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden md:block">Create Book</span>    
                    </Link>
                    <div className='w-11'>
                    <img src='https://brandmark.io/logo-rank/random/pepsi.png' alt='' className={`w-full rounded-full ${isDark ? 'bg-dbg' : 'bg-white'} `}/>
                    </div>
                    <div className='cursor-pointer'>
                        {isDark && <img src={lightIcon} alt="" onClick={() => changeTheme('light')}/>}
                        {!isDark && <img src={darkIcon} alt="" onClick={() => changeTheme('dark')}/>}
                    </div>
                    <div className='flex items-center'>
                        {!user &&
                        <>
                        <Link to={'/login'} className={`flex flex-col mx-3 items-center ${isDark ? 'text-white' : ''}` }>
                        {isDark && <img src={wlogin} alt="" />}
                        {!isDark && <img src={blogin} alt="" />}
                        <p className='text-xs'>Login</p>
                        </Link>
                        
                        <Link className={`flex flex-col mx-3 items-center ${isDark ? 'text-white' : ''}` } to={'/register'}>
                        {isDark && <img src={wregister} alt="" />}
                        {!isDark && <img src={bregister} alt="" />}
                        <p className='text-xs'>Register</p>
                        </Link>
                        </>
                        }
                        
                        
                        {!!user && <button onClick={signoutUser} className={`flex flex-col mx-3 items-center ${isDark ? 'text-white' : ''}` } >
                        {isDark && <img src={wlogout} alt="" />}
                        {!isDark && <img src={blogout} alt="" />}
                        <p className='text-xs'>Logout</p>
                        </button>}
                    </div>
                    
                </li>
            </ul>
        </nav>
  )
}
