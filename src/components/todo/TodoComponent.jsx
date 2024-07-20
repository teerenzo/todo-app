import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { retrieveTodoApi, updateTodoApi ,createTodoApi} from './api/TodoApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage} from 'formik'

export default function TodoComponent() {
    
    const {id} = useParams()
    
    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')
    const navigate = useNavigate()

    const authContext = useAuth()
    
    const username = authContext.username
    
    useEffect(
        () => retrieveTodos(),
        [id]
        )

    function retrieveTodos(){
        if(id === 'new') return
        retrieveTodoApi(username, id)
        .then(response => {
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }

    function onSubmit(values) {
        const todo = {
            id:id === 'new' ? -1 : id,
            username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id === 'new') {
            createTodoApi(todo)
            .then(response => {
                navigate('/todos')
                console.log(response)
            })
        }else{
        updateTodoApi(username, id, todo)
        .then(response => {
            navigate('/todos')
            console.log(response)
        })
        .catch(error => console.log(error))
    }
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length<5) {
            errors.description = 'Enter atleast 5 characters'
        }

        if(values.targetDate == null) {
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details </h1>
            <div>
                <Formik initialValues={ { description, targetDate } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
        
                        <Form>
                            <ErrorMessage 
                                name="description"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
       
                </Formik>
            </div>

        </div>
    )
}