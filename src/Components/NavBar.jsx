import { Link } from "react-router-dom"
import menu from '../assets/Icons/menu.png'

const NavBar = () => {


  const NavClose = ()=>
  {
    const btn = document.getElementById("navbar-button");

    if(btn && btn.offsetParent !== null)
    {
      btn.click();
    }

  }

  return (
    
    <nav className="navbar navbar-expand-lg  navbar-dark" style={{backgroundColor:"#6f2cf4"}} >
      <div className="container-fluid" >
        <Link className="navbar-brand fs-3 my-2 ps-lg-4 text-light" to="/">
          Wellness & Habit Tracking
        </Link>

        <button className="navbar-toggler" id="navbar-button" type="button" 
                data-bs-toggle="collapse" data-bs-target="#navbarText" 
                aria-controls="navbarText" aria-expanded="false" 
                aria-label="Toggle navigation"  >
                <img src={menu} style={{width:"35px", height:"30px", filter:"invert(1)"}} />
        </button>

        <div className="collapse navbar-collapse fs-5" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-2 gap-lg-5" >
            <li className="nav-item E-nav_item">
              
              <Link className="nav-link text-light  "  aria-current="page" to="/" onClick={()=>NavClose()} >Dashboard</Link>
            </li>
            <li className="nav-item E-nav_item">
              <Link className="nav-link text-light "  to="/goal"  onClick={()=>NavClose()} >Goals</Link>
            </li>
            <li className="nav-item E-nav_item">
              <Link className="nav-link text-light " to="/history"  onClick={()=>NavClose()} >History</Link>
            </li>
            <li className="nav-item E-nav_item">
              <Link className="nav-link text-light "  to="/settings"  onClick={()=>NavClose()} >Settings</Link>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  )
}

export default NavBar