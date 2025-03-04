import Header from './Header'
import Home from './pages/Home'
import NewSession from './pages/NewSession'
import Data from './pages/Data'
import SessionEntry from './pages/SessionEntry'
import AddAthlete from './pages/AddAthlete'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

export default function Router() {

    const Layout = () => {
        return (
          <>
            <Header />
            <Outlet />
          </>
        )
    }

    const BrowserRoutes = () => {
        return (
            <>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-session" element={<NewSession />} />
                    <Route path="/new-session/:metric" element={<SessionEntry />} />
                    <Route path="/add-athlete" element={<AddAthlete />}/>
                    <Route path ="/data" element={<Data />}/>
                    <Route path="/data/:metric" element={<Data />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </>
        )
    }

    return (
        <BrowserRoutes />
    )
}