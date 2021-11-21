import React from 'react'
import { useContext, useState } from 'react'
import { PatientContext } from '../patientContext'
import { Button, Card, CardContent, CardHeader,Modal,TextField, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import { format } from 'date-fns' 
import { Box } from '@mui/system'

const useStyles = makeStyles({
    loginForm : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
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


function Staff() {

    const classes = useStyles()

    const { patients,addPatient,removePatient } = useContext(PatientContext)

    const [ name,setName ] = useState('')
    const [ age,setAge ] = useState('')
    const [ illness,setIllness ] = useState('')
    const [ date,setDate ] = useState('')
    const [ dischargeName,setDischargeName ] = useState('')
    const [ dischargeIllness,setDischargeIllness ] = useState('')

    const onAdmit = (e) => {
        e.preventDefault()
        addPatient({name,age,date,illness})
    }

    const handleDischarge = () => {
        removePatient(dischargeName,dischargeIllness)
        handleClose()
    }

    const handleModal = (name,illness) => {
        handleOpen()
        setDischargeName(name)
        setDischargeIllness(illness)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    This will discharge {dischargeName}
                </Typography>
                <br/>
                <Box >
                <Button
                    variant='contained'
                    color='warning'
                    onClick={handleDischarge}
                >Discharge</Button>
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
        <Card
            className={classes.loginForm}
            sx={{width:400,mt:10,mx:'auto'}}
        >
            <CardHeader
                title='Admit Patient'
            />
            <CardContent>
            <form onSubmit={(e)=>onAdmit(e)}  className={classes.textFields}>
                <TextField
                variant='outlined'
                label = "Patient's name"
                sx={{mb:2}}
                onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                variant='outlined'
                label = 'Age'
                type='number'
                sx={{mb:2}}
                onChange={(e)=>setAge(e.target.value)}
                />
                <TextField
                variant='outlined'
                label = 'Illness'
                sx={{mb:2}}
                onChange={(e)=>setIllness(e.target.value)}
                />
                <TextField
                variant='outlined'
                type='date'
                label='Admitted On'
                sx={{mb:2}}
                InputLabelProps={{
                    shrink: true,
                  }}
                onChange={(e)=>setDate(e.target.value)}
                />
                <Button
                    type='submit'
                    variant='contained'
                    sx={{mt:2,mx:'auto'}}
                >
                    Admit
                </Button>
            </form>
            </CardContent>
        </Card>
        <Card
            sx={{width:600,mt:5,mx:'auto'}}
        >
            <CardHeader 
                title="Patient's Table"
            />
            <CardContent>
            <table className='patient-table'>
            <thead>
                <tr>
                    <th>Patient's Name</th>
                    <th>Patient's Age</th>
                    <th>Illness</th>
                    <th>Admitted on</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            { patients.map( patient => {
                return (
                    <tr key={patient.name+patient.illness}>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.illness}</td>
                        <td>{ patient.date ? format(new Date(patient.date),'dd/MM/Y') : null }</td>
                        <td><Button
                            sx={{width:100}}
                            variant='contained'
                            color='success'
                            onClick={()=>handleModal(patient.name,patient.illness)}
                        >Discharge</Button></td>
                    </tr>
                )
            }) }
        </tbody>
        </table>
            </CardContent>
        </Card>
    </div>
    )
}

export default Staff
