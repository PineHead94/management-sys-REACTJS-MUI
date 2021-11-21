import React, { useContext } from 'react'
import { AppBar, Button, Toolbar } from '@mui/material'
import { useNavigate,useLocation } from 'react-router-dom'
import { PatientContext } from '../patientContext'


function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()

    const { accessType } = useContext(PatientContext)

    const logout = (e) => {
        e.preventDefault()
        accessType('')
        navigate('/')
    }
    
    return (
        <div>
            <AppBar 
                elevation={1}
            >
                <Toolbar>
                    { location.pathname === '/' ? null :
                        <Button
                            sx={{ml:'auto'}}
                            variant='contained'
                            color='secondary'
                            onClick={(e)=>logout(e)}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
