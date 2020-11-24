import React, {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom";
import Error from "../error";

export default function Registration({userService}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [copyPassword, setCopyPassword] = useState('')
    const [error, setError] = useState('')

    const onUsernameChanged = (event) => {
        setUsername(event.target.value)
    }

    const onPasswordChanged = (event) => {
        setPassword(event.target.value)
    }

    const onCopyPasswordChanged = event => {
        setCopyPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (password === copyPassword) {
            userService.registration(username.replace(/\s/g, ''), password)
                .then(() => {
                    userService.authentication(username, password)
                        .then(() => {
                            window.location.reload()
                        })
                })
                .catch(e => {
                    console.log(JSON.parse(JSON.stringify(e)))
                    if (e.message == "Request failed with status code 404") {
                        setError("Пользователь с таким ником уже зарегестрирован. ")
                    }
                })
        } else {
            setError('Пароли должны совпадать.')
        }
    }

    return (
        <>
            <main className="login-form">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Registration</div>
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
                                        <div className="form-group row">
                                            <label htmlFor="password"
                                                   className="col-md-4 col-form-label text-md-right">Copy
                                                password</label>
                                            <div className="col-md-6">
                                                <input type="password" id="copyPassword" className="form-control"
                                                       name="copyPassword" required
                                                       value={copyPassword}
                                                       onChange={onCopyPasswordChanged}
                                                />
                                            </div>
                                        </div>
                                        {error.length > 0 ? <Error errorMessage={error}/> : <div></div>}
                                        <div className="col-md-6 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Sign in
                                            </button>
                                            <Link to={'/authorization'} className="btn btn-link">
                                                Authorization
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
