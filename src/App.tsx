import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState<string>('');
  const [submittedTasks, setSubmittedTasks] = useState<{ id: number, task: string }[]>([]); // State to store submitted tasks

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value); // Update the task state when the input changes
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks'); // Get tasks from the backend
      setSubmittedTasks(response.data); // Update state with fetched tasks
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    if (task) {
      try {
        await axios.post('http://localhost:3001/tasks', { task }); // Send task to the backend
        setTask(''); // Clear the input field
        fetchTasks(); // Refresh the task list after submission
      } catch (err) {
        console.error('Error submitting task:', err);
      }
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task"> Task </label>
          <input type='text' id='task' name='task' onChange={handleChange}></input>
        </div>
        <button type='submit'> Submit </button>
      </form>

      <div>
        <h2>Submitted Tasks</h2>
        <ul>
        {submittedTasks.map((submittedTask, index) => (
          <li key={submittedTask.id}>{submittedTask.task}</li> // Access the 'task' property from each object
        ))}
      </ul>
      </div>
    </>


  )
}

export default App
