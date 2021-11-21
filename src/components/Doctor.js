import React from 'react'
import { useContext } from 'react'
import { PatientContext } from '../patientContext'
import { Card, CardContent, CardHeader } from '@mui/material'
import format from 'date-fns/format'


function Doctor() {


    const { patients } = useContext(PatientContext)

    return (
        <div>
        <Card
            sx={{width:500,mt:10,mx:'auto'}}
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
                </tr>
            </thead>
            <tbody>
            { patients.map( patient => {
                return (
                    <tr key={patient.name+patient.illness}>
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.illness}</td>
                        <td>{format(new Date(patient.date),'dd/MM/Y')}</td>
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

export default Doctor
