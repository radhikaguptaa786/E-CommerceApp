import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

function Header() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Buy Now
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link">
                  Category
                </NavLink>
              </li>
              { auth?.user?.role===0 ?(
                 <li className="nav-item">
                 <NavLink to="/cart" className="nav-link">
                   Cart{0}
                 </NavLink>
               </li>
              ):(
                <></>
              )
              }
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle "
                      type="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      aria-expanded="false"
                    >
                      {auth.user.name}
                    </button>
                    <ul className="dropdown-menu ">
                      <li>
                        <NavLink
                          className="dropdown-item active"
                          to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="dropdown-item" to="/" >Change Password
                          </NavLink>
                         
                      </li>
                     
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item">
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link"
                        >
                          LOGOUT
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
