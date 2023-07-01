import React from 'react'
import {
    Link
} from "react-router-dom";

export default function Header() {
    return (
        <>
            <nav>
                <div className="links">
                    <ul>
                        <li><Link to="/AirPollution"> Air Pollution</Link></li>
                        <li><Link to="/Weather"> Weather</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
