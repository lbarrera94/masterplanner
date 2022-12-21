import { Card, CardContent, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { Check, Clear } from '@mui/icons-material'


const Todo = ({title}) => {
  return (
    <div>
       <Container>
        <Card variant='outlined' style={{ marginTop: 35, background: "lightgray"}}>
            <CardContent>
                {/* Check Icon */}
                <Typography variant='h5' component='h2'>
                <IconButton>
                        <Clear style={{ color: "black" }}/>
                    </IconButton>
                    {title}
                    <IconButton style={{float: "right"}}>
                        <Check style={{ color: "green" }}/>
                    </IconButton>
                </Typography>
            </CardContent>
        </Card>
       </Container>
    </div>
  )
}

export default Todo