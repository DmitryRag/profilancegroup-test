import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectUser, logout } from '../../feature/userSlice'
import { Routes, Route} from "react-router-dom"
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import News from '../News/News'
import SearchFormError from '../SearchFormError/SearchFormError'
import Login from '../Login/Login'
import { news } from '../../constants/news'
import './App.css'


export default function App() {
    const [showPopup, setShowPopup] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    function handleClick(e) {
        if (!user) {
            setShowPopup(true)
        } else {
            e.preventDefault()

            dispatch(logout())
        }
    }

    const filteredDashboard = news.filter(news => {
        return news.content.toLowerCase().includes(searchValue.toLocaleLowerCase().trim())
    })

    function changeSearchInput(e) {
        setSearchValue(e.target.value)
    }

    function resetSearchForm(e) {
        e.preventDefault()
        setSearchValue('')
    }

    return (
        <>
            <div className='App'>
                <Header onClick={handleClick}/>
                <Routes>
                    <Route path="/" element=
                        {user ? 
                            <h1 className='app__title'>Привет {user.name}!</h1>
                        : 
                            <h1 className='app__title'>Привет Гость</h1>
                        } 
                    />
                    <Route path="news" element={
                        <>
                            <SearchForm
                            value={searchValue}
                            onChange={changeSearchInput}
                            filteredDashboard={filteredDashboard}
                            />
                            <News filteredDashboard={filteredDashboard}/>
                            {(filteredDashboard.length < 1 &&
                                <SearchFormError
                                    resetSearchForm={resetSearchForm}
                                />
                            )}
                        </>
                    } />
                </Routes>
            </div>
            <Login trigger={showPopup} setTrigger={setShowPopup} />
        </>
    )
}
