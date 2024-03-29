import { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import "bootstrap/js/src/collapse.js";

type Props = {
    auth:any,
    logoutUser:any
}

type State = {

}

class Navbar extends Component<Props,State> {

    onLogoutClick(e:any){
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <>
                {user.role==="admin"?<li className="nav-item">
                    <Link to="/approve" className="nav-link">Jóváhagyás</Link>
                </li>:<></>}
                <li className="nav-item">
                    <Link to="/" onClick={this.onLogoutClick.bind(this)} className="nav-link">Kijelentkezés</Link>
                </li>
            </>
        );

        const guestLinks = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Regisztrálás</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Bejelentkezés</Link>
                </li>
            </>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">HM</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobileNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Kezdőoldal</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {isAuthenticated?authLinks:guestLinks}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state:any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);