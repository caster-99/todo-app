import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = ({ children }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-gradient w-100 mb-3 py-3">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Notes App
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"
                                    style={{
                                        fontWeight: window.location.pathname === "/" ? "bold" : "normal",
                                    }}
                                >
                                    Notes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories"
                                    style={{
                                        fontWeight: window.location.pathname === "/categories" ? "bold" : "normal",
                                    }}
                                >
                                    Categories
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center justify-content-between">
                            {user && (
                                <p className="m-0 me-3">
                                    Welcome, <b>{user.username}</b>
                                </p>
                            )}
                            <form onSubmit={handleLogout}>
                                <button className="btn btn-text" type="submit">
                                    Logout
                                    <i className="bi bi-box-arrow-right ms-2"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}

export default Layout;