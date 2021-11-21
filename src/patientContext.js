import { createContext, useState } from "react";

export const PatientContext = createContext()

const PatientContextProvider = ( props ) => {

    const [ users,setUsers ]  = useState([
        {username:'Udhav1',password:'test123',access:'admin'},
        {username:'Udhav2',password:'test123',access:'doctor'},
        {username:'Udhav3',password:'test123',access:'staff'},
    ])

    const addUser = ({username,password,access}) => {
        let duplicate = true
        users.forEach( user => {
            if( user.username === username ){
                duplicate = false
            } 
        })
        if(duplicate){
            setUsers([...users,{username,password,access}])
            duplicate = false
        }
    }

    const removeUser = (username) => {
        setUsers( prevState => prevState.filter( user => user.username !== username ))
    }

    const [ userAccess,setUserAccess ] = useState('')

    const accessType = (access) => {
        setUserAccess(access)
    }

    const [ patients,setPatients ] = useState([
        { name:'John',age:90,date:'2021-05-12',illness:'Fever'},
        { name:'Mary',age:80,date:'2021-12-02',illness:'Dengue'},
        { name:'Dan',age:70,date:'2021-09-20',illness:'Corona'}
    ])
    const addPatient = ({name,age,date,illness}) => {
        let duplicate = true
        patients.forEach( patient => {
            if( patient.name === name ){
                duplicate = false
            } 
        })
        if(duplicate){
            setPatients([...patients,{name,age,date,illness}])
            duplicate = false
        }
    }

    const removePatient = (name,illness) =>{
        let newPatients = []
        newPatients = patients.filter( patient => {
            if(patient.name===name){
                if(patient.illness===illness){
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } )
        setPatients(newPatients)
    } 

    return (
        <PatientContext.Provider value={{users,addUser,accessType,userAccess,patients,addPatient,removeUser,removePatient}}>
            { props.children }
        </PatientContext.Provider>
    )
}

export default PatientContextProvider