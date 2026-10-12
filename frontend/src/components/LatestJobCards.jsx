import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-indigo-700 bg-indigo-50 font-semibold border-indigo-200'>{job?.position} Positions</Badge>
                <Badge className='text-emerald-700 bg-emerald-50 font-semibold border-emerald-200'>{job?.jobType}</Badge>
                <Badge className='text-amber-700 bg-amber-50 font-semibold border-amber-200'>{job?.salary} LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards