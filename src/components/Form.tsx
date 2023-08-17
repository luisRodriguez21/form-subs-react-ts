import { useReducer, useState } from 'react';
import { Sub } from '../types';
import useNewSub from '../hooks/useNewSub';

interface FormProps {
    handleNewSub: (newSub: Sub) => void
}

const Form = ({ handleNewSub } : FormProps) => {
    // const [inputValues, setInputValues] = useState<FormState["inputValues"]>({ nick: '', subMonths: 0,  avatar: '', description: '', })
    const [inputValues, dispatch] = useNewSub();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        handleNewSub(inputValues)
        handleClean();
    }

    const handleClean = () => {
		dispatch({ type: "clear" })
	}


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name="nick" placeholder="Nick" />
                <input onChange={handleChange} value={inputValues.subMonths} type="number" name="subMonths" placeholder="subMonths" />
                <input onChange={handleChange} value={inputValues.avatar} type="text" name="avatar" placeholder="avatar" />
                <textarea onChange={handleChange} value={inputValues.description} name="description" placeholder="description" />

                <button type='submit'>Save new sub!</button>
                <button type="button" onClick={handleClean}>Clear data!</button>

            </form>
        </div>
    )
}

export default Form;