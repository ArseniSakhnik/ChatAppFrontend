import React from 'react'
import './App.css';
import Authorization from "../Authorization";
import UserService from "../services/UserService";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Chat from "../Chat";
import ChatProvider, {useChat} from "../ChatProvider/ChatProvider";
import Registration from "../RegistrationForm";

const userService = new UserService()

/**
 * Вход в приложение
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <ChatProvider>
            <Router>
                <div className="App">
                    <Route path={'/registration'}>
                        {localStorage.getItem('username') === null ? <Registration userService={userService}/> :
                            <Redirect to={'/chat'}/>}
                    </Route>
                    <Route exact strict path={'/'}>
                        {localStorage.getItem('username') === null ? <Redirect to={'/authorization'}/> :
                            <Redirect to={'/chat'}/>}
                    </Route>
                    <Route strict path='/authorization'>
                        {localStorage.getItem('username') === null ? <Authorization userService={userService}/> :
                            <Redirect to={'/chat'}/>}
                    </Route>
                    <Route strict path={'/chat'}>
                        {localStorage.getItem('username') === null ? <Redirect to={'/authorization'}/> :
                            <Chat userService={userService}/>}
                    </Route>
                </div>
            </Router>
        </ChatProvider>
    );
}

export default App;
