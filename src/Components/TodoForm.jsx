import React, {useState} from 'react'
import { FormControl, Container, TextField, Button } from '@mui/material'

const TodoForm = ({ addTodo }) => {
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text);
        console.log( "text", text );
    }
    const handleChange = (e) => {
        //setText(e.taret.value)
        setText(e.target.value)
    }
  return (
        <Container maxWidth="sm" >
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true}>
                    <TextField label="add a task" required={true} 
                    value={text} onChange={handleChange}/>
                    <Button 
                    variant='contained' 
                    color='primary' 
                    type='submit' 
                    style={{marginTop: 5}} 
                    type="submit"
                    >
                        + add task 
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}

export default TodoForm