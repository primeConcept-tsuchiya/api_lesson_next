import React, { FormEvent } from 'react'
import useStore from '../store'
import UseMutateTask from '../hooks/useMutateTask'
import { Button, TextInput } from '@mantine/core'


export const TaskForm = () => {
  const { editedTask } = useStore()
  const update = useStore((state) => {
    return state.updateEditedTask
  })
  const { createTaskMutation, updateTaskMutation } = UseMutateTask()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedTask.id === 0) {
      createTaskMutation.mutate({
        title: editedTask.title,
        description: editedTask.description
      })
    } else {
      updateTaskMutation.mutate({
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mt={"md"}
          placeholder='title'
          value={editedTask.title || ''}
          onChange={(e) => {
            update({ ...editedTask, title: e.target.value })
          }}
        />
        <TextInput
          mt={"md"}
          placeholder='description'
          value={editedTask.description || ''}
          onChange={(e) => {
            update({ ...editedTask, description: e.target.value })
          }}
        />
        <Button
          disabled={editedTask.title === ''}
          color="cyan"
          type="submit"
        >
          {editedTask.id === 0 ? 'create' : 'update'}
        </Button>
      </form>
    </>
  )
}
