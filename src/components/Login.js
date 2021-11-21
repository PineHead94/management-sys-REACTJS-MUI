import React, { useContext, useState } from 'react'
import { PatientContext } from '../patientContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    loginForm : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    textFields : {
        display : 'flex',
        flexDirection : 'column',

    }
})

function Login() {

    const navigate = useNavigate()

    const { users,accessType } = useContext(PatientContext)

    const [ username,setUsername ] = useState(null)
    const [ password,setPassword ] = useState(null)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        users.forEach( user=> {
            if( user.username === username){
                if( user.password === password ){
                    accessType( user.access )
                    navigate('/home')
                } else {
                    console.log('Wrong password')
                }
            }
        })

    }

    const classes = useStyles()



    return (
        <div>
            <Card
                className={classes.loginForm}
                sx={{width:350,mx:'auto',mt:'30vh'}}
            >
                <CardHeader 
                    title='Employee Login'
                />
                <CardContent
                    
                >
                    <form onSubmit={(e)=>handleSubmit(e)} className={classes.textFields}>
                    <TextField
                        variant='outlined'
                        label = 'Username'
                        sx={{mb:2}}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                    <TextField
                        variant='outlined'
                        label = 'Password'
                        type = 'password'
                        sx={{mb:2}}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    <Button
                        sx={{width:'40%',mx:'auto'}}
                        type='submit'
                        variant='contained'
                    >Login</Button>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
