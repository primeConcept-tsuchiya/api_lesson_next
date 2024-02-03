import React from 'react'
import UseQueryTasks from '../hooks/useQueryTasks';
import { List, Loader, ThemeIcon } from '@mantine/core';
import { DocumentSearchIcon, SparklesIcon } from '@heroicons/react/solid';
import { TaskItem } from './TaskItem';
import { title } from 'process';

export const TaskList = () => {
  const { data: tasks, status } = UseQueryTasks();
  if (status === 'loading') return <Loader my="lg" color='cyan' />
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color='cyan' size={24} radius="xl">
          <DocumentSearchIcon fontSize={16} />
        </ThemeIcon>
      }
    >
      {tasks?.map((tasks) => {
        return (
          <TaskItem
            key={tasks.id}
            id={tasks.id}
            title={tasks.title}
            description={tasks.description}
          />
        )
      })}
    </List>
  )
}
