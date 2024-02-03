import { Task } from '@prisma/client'
import React from 'react'
import useStore from '../store'
import UseMutateTask from '../hooks/useMutateTask'
import { ListItem } from '@mantine/core'
import { PencilAltIcon, TranslateIcon } from '@heroicons/react/solid'

export const TaskItem: React.FC<Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>> = ({
  id,
  title,
  description
}) => {
  const update = useStore((state) => {
    return state.updateEditedTask
  })
  const { deleteTaskMutaion } = UseMutateTask();
  return (
    <ListItem>
      <div className='float-left mr-10'>
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursol-pointer text-blue-500"
          onClick={() => {
            update({
              id,
              title,
              description
            })
          }}
        />
        <TranslateIcon
          className="mx-1 h-5 w-5 cursol-pointer text-blue-500"
          onClick={() => {
            deleteTaskMutaion.mutate(id)
          }}
        />
      </div>
      <span>{title}</span>
    </ListItem>
  )
}
