import React, {Component, useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Error from "../error";

/**
 * Компонента авторизации
 * @param userService
 * @returns {JSX.Element}
 * @constructor
 */
function Authorization({userService}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onUsernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value)
    }

    /**
     * Отправляет запрос аутентификации и обновляет страницу
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault()
        userService.authentication(username, password)
            .then(() => {
                window.location.reload()
            })
            .catch((e) => {
                if (e.message = "Request failed with status code 400") {
                    setError("Неправильный логин или пароль")
                }
            })
    }

    return (
        <>
            <main className="login-form">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label htmlFor="email_address"
                                                   className="col-md-4 col-form-label text-md-right">Username</label>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control"
                                                       name="email-address" required autoFocus
                                                       value={username}
                                                       onChange={onUsernameChanged}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="password"
                                                   className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="password" className="form-control"
                                                       name="password" required
                                                       value={password}
                                                       onChange={onPasswordChanged}
                                                />
                                            </div>
                                        </div>
                                        {error.length > 0 ? <Error errorMessage={error}/> : <div></div>}
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Log in
                                            </button>
                                            <Link to={'/registration'} className="btn btn-link">
                                                Registration
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Authorization;