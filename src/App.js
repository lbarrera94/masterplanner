import './App.css';
import { GoogleLogin } from 'react-google-login'
import { gapi } from "gapi-script";
import axios from 'axios'
import { useState } from 'react';
import TodoForm from './Components/TodoForm'
import { Button } from '@mui/material';
import TodoList from './Components/TodoList';


function App() {

  gapi.load("client:auth2", () => {
    gapi.auth2.init({
      clientId:
        "30809728936-n5qpj0m4450ql92ib4tg759ftqgbs5uj.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  const responseGoogle = (response) => {
    console.log(response)
    const { code } = response
    axios
      .post('/api/create-tokens', { code })
      .then(response => {
        console.log(response.data)
        setSignedIn(true)
      })
      .catch(error => console.log(error.message)) 

  }

  const responseError = (error) => {
    console.log(error)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(summary, description, location, startDateTime, endDateTime)
    axios.post('/api/create-event', {
      summary, 
      description, 
      location, 
      startDateTime, 
      endDateTime,
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.log(error.message)) 
  }

  const [summary, setsummary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')
  const [signedIn, setSignedIn] = useState(false)

const [todos, setTodos] = useState([
  {
    id: 1,
    title: "Play",
    isCompleted: false,
    impact: 0
  },
  {
    id: 2,
    title: "Play bbal",
    isCompleted: true,
    impact: 1
  }
])

// add a todo
const addTodo = (title) => { 
  const newTodo = {
    title,
    id: title, 
    impact: undefined,
    difficulty: undefined,
  }

  setTodos(())

};


  return (
    <div>
    <div className="App">
        <h1> Google Calendar API</h1>
      </div>
      {!signedIn ? (
        <div>
          <GoogleLogin 
          clientId='30809728936-n5qpj0m4450ql92ib4tg759ftqgbs5uj.apps.googleusercontent.com' 
          buttonText='Sign in & authorize calendar'
          onSuccess={responseGoogle}
          onFailure={responseError}
          cookiePolicy={'single_host_origin'}
          //This is important
          responseType='code'
          accessType='offline'
          scope='openid email profile https://www.googleapis.com/auth/calendar'
          />
        </div>
        ) : (
        <div>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos}/>
        <form onSubmit={handleSubmit}>
          <label htmlFor='summary'>Summary</label>
          <br />
          <input 
              type='text' 
              id='summary' 
              value={summary} 
              onChange={e => setsummary(e.target.value)} />
          <br />

           <label htmlFor='description'>Description</label>
          <br />
          <textarea 
              type='text' 
              id='description' 
              value={description} 
              onChange={e => setDescription(e.target.value)} />
          <br />

          <label htmlFor='location'>Location</label>
          <br />
          <input 
              type='text' 
              id='location' 
              value={location} 
              onChange={e => setLocation(e.target.value)} 
              />
              <br />

          <label htmlFor='startDateTime'>Start Date Time</label>
          <br />
          <input 
              type='datetime-local' 
              id='startDateTime' 
              value={startDateTime} 
              onChange={e => setStartDateTime(e.target.value)} />
          <br />

          <label htmlFor='endDateTime'>End Date Time</label>
          <br />
          <input 
              type='datetime-local' 
              id='endDateTime' 
              value={endDateTime} 
              onChange={e => setEndDateTime(e.target.value)} />
          <br />
          <button type='submit'>create event</button>
        </form>
      </div>)
      }
      
      
    </div>
  );
}

export default App;
