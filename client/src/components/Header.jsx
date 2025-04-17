import logo from '../assets/images/boba.png'
import { useContext } from 'react'
import Context from '../components/Context'

export default function Header(props) {
    const userData = useContext(Context)
    return (
        <nav className="nav-bar">
            <p>
                <a href="https://www.instagram.com/bobaspeed/" target="_blank">
                <img src={logo} alt="Boba Speed" height="40" />
                </a>
            </p>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/new-session">New Speed Session</a>
                </li>
                <li>
                    <a href="/add-athlete">Add Athlete</a>
                </li>
                <li>
                    User: {userData.name}
                </li>
            </ul>
        </nav>
    )
}