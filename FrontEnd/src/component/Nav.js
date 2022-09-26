import React from "react";

import "../css/nav.css"

function Navbar({ user }) {
  return (
    <>
      <nav className="navbar  sticky-top navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src={require("../images/logo.png")}
              alt=""
              width={200}
              height={60}
            />
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {user && user.role === 2 &&
              <li className="nav-item">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="/customer"
                >
                  Home
                </a>
              </li>}

              {user && user.role === 1 &&
              <li className="nav-item">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="/profile"
                >
                  Home
                </a>
              </li>}

              {user && user.role === 4 &&
              <li className="nav-item">
                <a
                  className="nav-link active fw-bold"
                  aria-current="page"
                  href="/profile"
                >
                  Home
                </a>
              </li>}
              
              {user && user.role === 4 &&
                <li className="nav-item">
                  <a
                    className="nav-link fw-bold"
                    aria-current="page"
                    href="/customer/list"
                  >
                    Customer
                  </a>
                </li>
              }
              {user && user.role === 4 &&
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-bold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Owner
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                  > {user && user.role === 1 && <>
                    <li>
                      <a className="dropdown-item " href="/owner/add">
                        Add
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>}
                    <li>
                      <a className="dropdown-item" href="/owner/list">
                        List
                      </a>
                    </li>
                  </ul>
                </li>
              }
              {user && (user.role === 1 || user.role === 4) &&
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-bold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hostel
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                  > {user && user.role === 1 && <>
                    <li>
                      <a className="dropdown-item " href="/hostel/add">
                        Add
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li></>}
                    {user && user.role === 1 &&
                      <li>
                        <a className="dropdown-item" href={`/hostel/list/${user.id}`}>
                          List
                        </a>
                      </li>}

                    {user && user.role === 4 &&
                      <li>
                        <a className="dropdown-item" href="/hostel/list">
                          List
                        </a>
                      </li>}
                      
                  </ul>
                </li>
              }
              {user && user.role === 2 &&
                <li className="nav-item">
                  <a
                    className="nav-link fw-bold"
                    aria-current="page"
                    href="/hostel/list"
                  >
                    Hostel
                  </a>
                </li>
              }
              {user && user.role === 2 &&
                <li className="nav-item">
                  <a
                    className="nav-link fw-bold"
                    aria-current="page"
                    href="/flat/list"
                  >
                    Flats
                  </a>
                </li>
              }
              {
                 user && user.role === 2 &&
                <li className="nav-item">
                <a
                  className="nav-link fw-bold"
                  aria-current="page"
                  href={`/customer/update/${user.id}`}
                >
                  Update Your Details
                </a>
              </li>
              }
              {user && (user.role === 4 || user.role === 1) &&
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-bold"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Flat
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                  > {user && user.role === 1 && <>
                    <li>
                      <a className="dropdown-item " href="/flat/add">
                        Add
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>}{user && user.role === 4 &&
                    <li>
                      <a className="dropdown-item" href="/flat/list">
                        List
                      </a>
                    </li>}
                    {user && user.role === 1 && <>
                      <li>
                        <a className="dropdown-item" href={`/flat/list/${user.id}`}>
                          List
                        </a>
                      </li>
                    </>
                    }
                  </ul>
                </li>
              }{user && user.role === 1 &&
                <li>
                  <a className="nav-link  fw-bold active" href="/owner/message">
                    Messages
                  </a>
                </li>}
                {
                  user && user.role === 1 &&
                    <li>
                      <a className="nav-link  fw-bold active" href={`/owner/update/${user.id}`}>
                         Update Your Details
                      </a>
                    </li>
                  }
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link active fw-bold" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active fw-bold me-2" href="/profile">
                  {user && user.name}
                </a>
              </li>
              {!user &&
                <li className="nav-item">
                  <a className="nav-link active fw-bold btn btn-outline-success me-3" href="/login">
                    Login
                  </a>
                </li>
              }
              {!user &&
                <li className="nav-item">
                  <a className="nav-link active fw-bold btn btn-outline-secondary" href="/register">
                    Register
                  </a>
                </li>
              }
              {user &&
                <li className="nav-item">
                  <a className="nav-link active fw-bold btn btn-outline-danger" href="/Logout">
                    Logout
                  </a>
                </li>
              }</ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
