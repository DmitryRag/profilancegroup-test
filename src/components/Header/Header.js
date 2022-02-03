import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../feature/userSlice'
import { Link } from "react-router-dom"
import Logo from '../../images/logo.svg'
import './Header.css'

export default function Header({onClick}) {
    const user = useSelector(selectUser)
    console.log(user)

    return (
        <header className='header'>
            <Link to='/' ><img className='header__logo' src={Logo} alt='header logo'/></Link>
            <Link to='/news' className='header__link'>Новости</Link>
            {!user ? <button className='header__btn' onClick={onClick}>Войти</button> : null}
            {user ? <button className='header__btn' onClick={onClick}>Выйти</button> : null}
        </header>
    )
}
