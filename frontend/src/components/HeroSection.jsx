import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold tracking-wide border border-indigo-100'>Top Career & Talent Marketplace</span>
                <h1 className='text-5xl font-extrabold text-slate-900 tracking-tight leading-tight'>Connect With Top Companies & <br /> Land Your <span className='text-indigo-600'>Ideal Career</span></h1>
                <p className='text-slate-600 max-w-2xl mx-auto text-base'>Discover curated job opportunities across engineering, design, and management roles with direct applications and real-time status tracking.</p>
                <div className='flex w-[48%] max-w-2xl shadow-md border border-slate-200 pl-4 rounded-full items-center gap-4 mx-auto bg-white focus-within:ring-2 focus-within:ring-indigo-500'>
                    <input
                        type="text"
                        placeholder='Search by role, skill, or company (e.g. Frontend Developer)'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-slate-700 py-3 text-sm'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-indigo-600 hover:bg-indigo-700 px-6 py-6 text-white">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection