import TodoList from '@/components/Panel/TodoList/TodoList'
import React from 'react'



const page = () => {
  return (
    <div>
      <div>
        <h1>Panel</h1>
      </div>
      <div>
        <h2>Lista de tareas</h2>
          <TodoList />
      </div>
    </div>
  )
}

export default page