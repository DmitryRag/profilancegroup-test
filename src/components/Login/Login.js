import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../feature/userSlice'
import { userFirst, userSecond } from '../../constants/users'
import './Login.css'

export default function Login({ trigger, setTrigger }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [requiredEmailError, setRequiredEmailError] = useState(false)
    const [requiredPasswordError, setRequiredPasswordError] = useState(false)

    const dispatch = useDispatch()

    let userTest = {
        email: email,
        password: password
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (email.length <= 0) {
            setRequiredEmailError(true)
            setRequiredPasswordError(false)
            console.log(1)
        } else if (password.length <= 0) {
            setRequiredPasswordError(true)
            setRequiredEmailError(false)
            console.log(2)
        }  else if (JSON.stringify(userTest) === JSON.stringify(userFirst) || JSON.stringify(userTest) === JSON.stringify(userSecond)) {
            dispatch(login({
                name: name,
                email: email,
                password: password,
                loggedIn: true,
            }))
            setTrigger(false)
            setName('')
            setEmail('')
            setPassword('')
            setError(false)
            setRequiredEmailError(false)
            setRequiredPasswordError(false)
        } else {
            setError(true)
            setRequiredEmailError(false)
            setRequiredPasswordError(false)
        }
    }

    function handleClickClosePopup() {
        setTrigger(false)
        setName('')
        setEmail('')
        setPassword('')
        setError(false)
        setRequiredEmailError(false)
        setRequiredPasswordError(false)
    }

    return (trigger) ? (
        <div className='login__wrapper'>
            <div className='login'>
                <button className='login__close-btn' onClick={handleClickClosePopup}/>
                    <form className='login__form' onSubmit={(e) => handleSubmit(e)}>
                        <h1 className='login__title'>Login here</h1>
                        <input
                            className='login__input'
                            type='name'
                            placeholder='Имя'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className='login__input'
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error ? (<span className='error'>Неверные логин или пароль или все вместе :)</span>) : null}
                        {requiredEmailError ? (<span className='error'>Поле обязательно для заполнения</span>) : null}
                        <input
                            className='login__input'
                            type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error ? (<span className='error'>Неверные логин или пароль или все вместе :)</span>) : null}
                        {requiredPasswordError ? (<span className='error'>Поле обязательно для заполнения</span>) : null}
                        <button className='login__btn_submit' type='submit'>Войти</button>
                    </form>
            </div>
        </div>
    ) : ''
}
