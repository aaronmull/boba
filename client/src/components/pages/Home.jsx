import logo from './boba.png'

export default function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <ul className="dataBox">
                <li>
                    <a href="/data/leaderboards" className="dataLink"><img className="dataImage" src={logo} alt="Leaderboards and Rankings"/></a>
                    <br /><a href="/data/leaderboards" className="dataLink">Leaderboards and Rankings</a>
                </li>
                <li>
                    <a href="/data/athlete" className="dataLink"><img className="dataImage" src={logo} alt="Individual Athlete Data" /></a>
                    <br /><a href="/data/athlete" className="dataLink">Individual Athlete Data</a>
                </li>
            </ul>
        </>
    )
}