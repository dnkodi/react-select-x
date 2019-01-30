import React from "react"
import PropTypes from "prop-types"
import st from "../scss/Icon.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(st)

const UpArrow = (
    <React.Fragment>
        <line className={st.line} x1="6" x2="60" y1="90" y2="30" />
        <line className={st.line} x1="60" x2="115" y1="30" y2="90" />
    </React.Fragment>
)

const DownArrow = (
    <React.Fragment>
        <line className={st.line} x1="6" x2="60" y1="30" y2="90" />
        <line className={st.line} x1="60" x2="115" y1="90" y2="30" />
    </React.Fragment>
)

const renderPaths = (name) => {
    switch (name) {
        case "uparrow":
            return UpArrow
        case "downarrow":
            return DownArrow
        default:
            break
    }
}

export const Icon = ({ name }) =>
        <svg
            version="1.1"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderPaths(name)}
        </svg>

Icon.propTypes = {
    name: PropTypes.oneOf(["uparrow", "downarrow"]).isRequired
}
