import logo from './boba.png'

export default function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <ul className="dataBox">
                <li>
                    <a href="/data/tenfly" className="dataLink"><img className="dataImage" src={logo} alt="10yd Fly Data"/></a>
                    <br /><a href="/data/tenfly" className="dataLink">10-yd Fly Data</a>
                </li>
                <li>
                    <a href="/data/tenstart" className="dataLink"><img className="dataImage" src={logo} alt="10yd Start Data"/></a>
                    <br /><a href="/data/tenstart" className="dataLink">10-yd Start Data</a>
                </li>
            </ul>
        </>
    )
}