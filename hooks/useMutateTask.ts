import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react'
import useStore from '../store';
import { EditedTask } from '../types';
import axios from 'axios';
import { Task } from '@prisma/client';

const UseMutateTask = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const reset = useStore((state) => state.resetEditedTask);

    const createTaskMutation = useMutation(
        async (task: Omit<EditedTask, 'id'>) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/todo`,
                task
            )
            return res.data;
        },
        {
            onSuccess: (res) => {
                const previosTodos = queryClient.getQueryData<Task[]>(['tasks'])
                if (previosTodos) {
                    queryClient.setQueriesData(['tasks'], [res, ...previosTodos])
                }
                reset();
            },
            onError: (err: any) => {
                reset()
                if (err.response.status === 401 || err.response.status === 403) {
                    router.push('/');
                }
            },
        }
    )

    const updateTaskMutation = useMutation(async (task: EditedTask) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`
        )
        return res.data;
    },
        {
            onSuccess: (res, variables) => {
                const previosTodos = queryClient.getQueryData<Task[]>(['tasks']);
                if (previosTodos) {
                    queryClient.setQueriesData(['tasks'],
                        previosTodos.map((task) => {
                            return task.id === res.id ? res : task
                        })
                    )
                }
            },
            onError: (err: any) => {
                reset()
                if (err.response.status === 401 || err.response.status === 403) {
                    router.push('/');
                }
            }
        }
    )

    const deleteTaskMutaion = useMutation(
        async (id: number) => {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`)
        },
        {
            onSuccess: (_, variables) => {
                const previosTodos = queryClient.getQueryData<Task[]>(['tasks'])
                if (previosTodos) {
                    queryClient.setQueriesData(
                        ['tasks'],
                        previosTodos.filter((task) => task.id !== variables)
                    )
                }
                reset();
            },
            onError: (err: any) => {
                reset()
                if (err.response.status === 401 || err.response.status === 403) {
                    router.push('/');
                }
            },
        }
    )

    return { createTaskMutation, updateTaskMutation, deleteTaskMutaion }

}

export default UseMutateTask;