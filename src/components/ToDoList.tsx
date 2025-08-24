import React, { useState } from 'react';
import styles from './ToDoList.module.css';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  priority: string;
}

function addTask(tasks: Task[], title: string, description: string, priority?: string): Task[];
function addTask(tasks: Task[], title: string): Task[];
function addTask(tasks: Task[], title: string, description: string = '', priority: string = 'medium'): Task[] {
  const newTask: Task = {
    id: tasks.length + 1,
    title: title,
    isCompleted: false,
    description: description,
    priority: priority
  };
  return [...tasks, newTask];
}

function toggleTaskStatus(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, isCompleted: !task.isCompleted } : task);
}

const ToDoList = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const handleAddTask = () => {
    const updatedTasks = addTask(myTasks, title, description, priority);
    setMyTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.todoCard}>
        <h2 className={styles.todoTitle}>To-Do List</h2>
        
        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={styles.inputField}
              placeholder="Enter task title"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Description (Optional)</label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={styles.inputField}
              placeholder="Enter task description"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Priority</label>
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className={styles.selectField}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button 
            onClick={handleAddTask}
            className={styles.addButton}
            disabled={!title.trim()}
          >
            Add Task
          </button>
        </div>

        <div className={styles.taskContainer}>
            <div className={styles.taskList}>
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.taskItem} ${task.isCompleted ? styles.completedTask : ''}`}
                >
                  <div className={styles.taskContent}>
                    <p className={styles.taskTitle}>{task.title}</p>
                    {task.description && (
                      <p className={styles.taskDescription}>Description: {task.description}</p>
                    )}
                    <p className={styles.taskPriority}>
                      Priority: <span className={styles[task.priority + 'Priority']}>{task.priority}</span>
                    </p>
                    <p className={`${styles.taskStatus} ${task.isCompleted ? styles.completedStatus : styles.notCompletedStatus}`}>
                      Status: {task.isCompleted ? 'Completed' : 'Not Completed'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => setMyTasks(toggleTaskStatus(myTasks, task.id))}
                    className={styles.taskCheckbox}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
