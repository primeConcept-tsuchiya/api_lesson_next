import { Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react'

const UseQueryTasks = () => {
    const router = useRouter()
    const getTask = async () => {
        const { data } = await axios.get<Task[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/todo`
        )
        return data;
    }
    return useQuery<Task[], Error> ({
        queryKey: ['tasks'],
        queryFn: getTask,
        onError: (err: any) => {
            if (err.response.status === 401 || err.response.status === 403) {
                router.push('/');
            }
        }
    })
}

export default UseQueryTasks;