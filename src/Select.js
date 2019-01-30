import React, { PureComponent } from "react"
import { Icon } from "./Icon"
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import st from "../scss/Select.scss"

const cx = classNames.bind(st)

export class Select extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            focussedIndex: null,
            invalid: false,
            open: false,
            options: this.props.options,
            outerOptions: this.props.options,
            searchInputValue: ""
        }

    }

    static getDerivedStateFromProps = (nextProps, prevState) =>
        JSON.stringify(nextProps.options) !== JSON.stringify(prevState.outerOptions) ? { outerOptions: nextProps.options, options: nextProps.options } : null

    componentDidMount() {
        document.addEventListener("click", this.handleClick, false)
    }

    componentWillUnmount() {
        // remove the listener when the component is destroyed
        document.removeEventListener("click", this.handleClick, false)
    }


    handleClick = (e) => {
        // check if click is inside the main select div
        if (!this.node.contains(e.target) && this.state.open) {
            this.setState({
                options: this.props.options,
                open: false,
                focussedIndex: this.props.options.findIndex(i => i.value === this.props.value),
                searchInputValue: "",
                invalid: this.props.required && !Boolean(this.props.value)
            })
        }
        if (this.state.open) {
            this.setState({
                invalid: false
            })
        }
    }

    handleKeyPress = (e) => {
        // if user type on search open drop down
        if (e.key !== "Enter" && !this.state.open) {
            this.toggleSelector()
        }
    }

    onTextChange = (ev) => {
        const search = ev.target.value.replace(/^\s+/, "").replace(/\s\s+/, " ")

        const { options } = this.props

        const filterOptions = options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))

        this.setState(prevState => ({
            options: filterOptions,
            focussedIndex: (filterOptions.length > 0) && (options.length !== filterOptions.length) ? 0 : prevState.focussedIndex,
            searchInputValue: search
        }))
    }

    handleMouseOver = (item) => (event) => this.setState({ focussedIndex: item });

    resetOptions(item) {
        const resetFocus = this.props.options.findIndex(i => i.value === item)
        this.setState({
            options: this.props.options,
            focussedIndex: resetFocus,
            searchInputValue: "",
            invalid: false
        })
        this.select.focus()
    }

    toggleSelector = () => {
        if (!(this.props.readOnly || this.props.disabled)) {
            if (this.state.options.length > 0) { // check if user search for non exisiting value and still click on the div
                this.setState(prevState => ({
                    open: !prevState.open
                }))
            }
        }
    }

    selectItem = (value) => (event) => {
        this.setState({
            open: false
        })
        this.props.onChange(value)
        this.resetOptions(value)
    };


    handleFocus = (value) => {
        if (!this.state.open) this.toggleSelector()

        const { length } = this.props.options

        this.setState(prevState => ({
            focussedIndex: prevState.focussedIndex !== null ? (prevState.focussedIndex + value + length) % length : 0
        }))
    }

    handleEnterPressed() {
        if (!this.props.readOnly) {
            const { options, focussedIndex } = this.state
            this.setState({
                open: false
            })
            this.props.onChange(options[focussedIndex].value)
            this.resetOptions(options[focussedIndex].value)
        }
    }

    handleKeyDown = (event) => {
        if (!this.props.readOnly) {
            switch (event.key) {
                case " ":
                    this.toggleSelector()
                    break
                case "ArrowDown":
                    this.handleFocus(1)
                    break
                case "ArrowUp":
                    this.handleFocus(-1)
                    break
                case "Enter":
                    if (this.state.focussedIndex !== null && this.state.options.length > 0) this.handleEnterPressed()
                    break
                default:
                    this.inputTitle.focus()
            }
        }
    }

    render() {
        const { focussedIndex, invalid, options, open, searchInputValue } = this.state
        const { disabled, errorText, inline, label, margin, name, placeholder, readOnly, value, width, searchable } = this.props
        const selected = this.props.options.find(item => item.value === value)
        const selectedLabel = selected ? selected.label : ""

        return (
            <div className={cx(st.wrapper, { inline })} style={{ margin, width }}>
                {label ? <label className={st.label}>{label}</label> : null}
                <div className={cx(st.select, { disabled, searchable, open }, { [st.error]: invalid })} ref={node => { this.node = node }}>
                    <div
                        className={st.selectItem}
                        onClick={this.toggleSelector}
                        onKeyDown={this.handleKeyDown}
                        ref={select => { this.select = select }}
                        tabIndex="0"
                    >
                        { searchable ? (
                            <input
                                disabled={disabled}
                                onInput={this.onTextChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder={selectedLabel || placeholder}
                                readOnly={readOnly}
                                ref={el => { this.inputTitle = el }}
                                type="text"
                                value={searchInputValue}
                            />
                        ) : (
                            <p className={st.clickableInput}>{ selectedLabel || placeholder }</p>
                        )}
                        <span className={st.arrowBox}><Icon name={open ? "uparrow" : "downarrow"} size={1} /></span>
                    </div>
                    { open &&
                        <ul className={st.options}>
                            { options.length > 0 ? options.map((item, i) =>
                                <li
                                    className={focussedIndex === i ? st.focused : ""}
                                    key={`${name}-${item.value}`}
                                    onClick={this.selectItem(item.value)}
                                    onMouseOver={this.handleMouseOver(i)}
                                >
                                    {item.label}
                                </li>)
                                : <li>No results found</li>}
                        </ul>
                    }
                </div>
                {invalid ? <p className={st.errorText}>{errorText}</p> : null}
            </div>
        )
    }
}

Select.defaultProps = {
    disabled: false,
    errorText: "Field is required.",
    inline: false,
    label: "",
    margin: "",
    name: "",
    placeholder: "",
    readOnly: false,
    required: false,
    searchable: false,
    width: ""
}

Select.propTypes = {
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    inline: PropTypes.bool,
    label: PropTypes.string,
    margin: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    searchable: PropTypes.bool,
    value: PropTypes.string.isRequired,
    width: PropTypes.string
}
