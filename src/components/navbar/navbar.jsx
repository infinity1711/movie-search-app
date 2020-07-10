import React from 'react'
import { withRouter } from 'react-router-dom'

class NavBar extends React.Component {

    goToFavourites = () => {
        this.props.history.push('/favourites')
    }

    home = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1" onClick={this.home} style={{ cursor: 'pointer' }}>Home</span>
                <div className="float-right">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <p className="nav-link" onClick={this.goToFavourites} style={{ cursor: 'pointer', marginBottom: '0' }}>Favourites</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(NavBar)