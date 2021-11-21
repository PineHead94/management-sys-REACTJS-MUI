import React from 'react'
import { useContext, useState } from 'react'
import { PatientContext } from '../patientContext'
import { Button, Card, CardContent, CardHeader, FormControl, MenuItem, Modal, Select, TextField,Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { Box } from '@mui/system'



const useStyles = makeStyles({
    loginForm : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    textFields : {
        display : 'flex',
        flexDirection : 'column',

    },
    modalBox : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    }
})

function Admin() {


    const { users,addUser,removeUser } = useContext(PatientContext)


    const [ username,setUsername ] = useState('')
    const [ password,setPassword ] = useState('')
    const [ access,setAccess ] = useState('admin')
    const [ deleteUser,setDeleteUser ] = useState('')


    const onCreate = (e) => {
        e.preventDefault()
        if(username!==''){
            addUser({ username,password,access })
        }
    }

    const handleRemove = () => {
        removeUser(deleteUser)
        handleClose()
    }

    const handleModal = (username) => {
        handleOpen()
        setDeleteUser(username)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles()

    const styles = {
        width:400,
        mx:'auto',
        mt:30
    }

    return (


        <div>
                <Modal
                open={open}
                onClose={handleClose}
                sx={styles}
                >
                <Box>
                    <Card className={classes.modalBox}>
                    <CardHeader
                        title='Are you sure?'
                    />
                    <CardContent>
                        <Typography>
                            This will remove {deleteUser}
                        </Typography>
                        <br/>
                        <Box >
                        <Button
                            variant='contained'
                            color='warning'
                            onClick={handleRemove}
                        >Delete</Button>
                        <Button
                            variant='contained'
                            onClick={handleClose}
                            sx={{ml:5}}
                        >No</Button>
                        </Box>
                    </CardContent>

                    </Card>
                </Box>
                </Modal>
                <div className='create'>
                    <Card
                        className={classes.loginForm}
                        sx={{width:350,mx:'auto',mt:'10vh'}}
                    >
                        <CardHeader
                            title='Create Employee'
                        />
                        <CardContent>
                        <form onSubmit={(e)=>onCreate(e)} className={classes.textFields}>
                        <TextField
                        variant='outlined'
                        label = 'Username'
                        sx={{mb:2}}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                        <TextField
                        variant='outlined'
                        label = 'Password'
                        sx={{mb:2}}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <FormControl>
                        <Select
                            value={access}
                            color='error'
                            onChange={(e)=>setAccess(e.target.value)}
                            >
                            
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'doctor'}>Doctor</MenuItem>
                            <MenuItem value={'staff'}>Staff</MenuItem>
                        </Select>
                        </FormControl>
                        <Button     
                            type='submit'
                            variant='contained'
                            sx={{mt:2,mx:'auto'}}
                        >
                            Create
                        </Button>
                    </form>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card
                        sx={{width:400,mt:5,mx:'auto'}}
                    >
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { users.map( user => {
                            return (
                                <tr key={user.username+user.access}>
                                    <td>{user.username}</td>
                                    <td>{user.access.toUpperCase()}</td>
                                    <td><Button 
                                    variant='contained' 
                                    color='secondary' 
                                    onClick={()=>handleModal(user.username)}
                                    >Remove</Button></td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </table>
                    </Card>

                </div>
            </div>
    )
}

export default Admin
