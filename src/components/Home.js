import React, { useContext } from 'react'
import { PatientContext } from '../patientContext'
import Admin from './Admin'
import Doctor from './Doctor'
import Staff from './Staff'

 
function Home() {

    const { userAccess } = useContext(PatientContext)

    if(userAccess==='admin'){
        return (
            <Admin />
        )
    }
    if(userAccess==='doctor'){
        return (
            <Doctor />
        )
    }
    if(userAccess==='staff'){
        return (
            <Staff />
        )
    } else {
        return (
            <div style={{marginTop:'70px'}} >
                Not Logged in..
            </div>
        )
    }
}

export default Home
