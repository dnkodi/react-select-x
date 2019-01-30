import React, { PureComponent } from "react"
import { Icon } from "./Icon"
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import st from "../scss/Select.scss"

const cx = classNames.bind(st)

export class MultiSelect extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            focussedIndex: null,
            options: this.props.options.map((item, i) => ({ ...item, index: i })),
            filteredOptions: [],
            searching: false,
            searchInputValue: ""
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false)
    }


    handleClick = (event) => {
        // check if click is inside the main select div
        if (!this.node.contains(event.target) && this.state.open) {
            this.setState({
                open: false,
                searching: false,
                focussedIndex: this.props.options.indexOf(this.props.value),
                searchInputValue: ""
            })
        }
    }

    handleKeyPress = (event) => {
        // if user type on search open drop down
        if (event.key !== "Enter" && !this.state.open) {
            this.toggleSelector()
        }
    }

    onTextChange = (event) => {
        const search = event.target.value.replace(/^\s+/, "").replace(/\s\s+/, " ")

        const { options } = this.state

        const filteredOptions = options.filter(option => option.label.toLowerCase().includes(search.toLowerCase()))

        this.setState(prevState => ({
            filteredOptions,
            searching: true,
            focussedIndex: (filteredOptions.length > 0) && (options.length !== filteredOptions.length) ? 0 : prevState.focussedIndex,
            searchInputValue: search
        }))
    }

    handleMouseOver = (item) => (event) => this.setState({ focussedIndex: item });

    resetOptions(item) {
        const resetFocus = this.props.options.indexOf(item)
        this.setState(prevState => ({
            options: prevState.options.filter(i => i.value !== item.value),
            focussedIndex: resetFocus,
            searchInputValue: ""
        }))
        this.select.focus()
    }

    toggleSelector = () => {
        if (!this.props.readOnly && !this.props.disabled && this.state.options.length > 0) { // check if user search for non exisiting value and still click on the div
            this.setState(prevState => ({
                open: !prevState.open
            }))
        }
    }

    removeItem = (index) => (event) => {
        event.stopPropagation()

        const item = this.props.value[index]
        this.props.onChange(this.props.value.filter(({ value }) => value !== item.value))

        this.setState((prevState) => ({
            options: prevState.options.concat(item).sort((a, b) => a.index - b.index)
        }))
    }

    selectItem = (value) => (event) => {
        this.props.onChange(this.props.value.concat(value))
        this.setState({
            open: false,
            searching: false
        })
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
        if (!(this.props.readOnly || this.props.disabled)) {
            const { options, focussedIndex, searching, filteredOptions } = this.state
            const optionsList = searching ? filteredOptions : options

            this.setState(prevState => {
                const newState = [...prevState.selectedValues, optionsList[focussedIndex]]
                this.props.onChange(newState)
                return {
                    open: false,
                    searching: false,
                    selectedValues: newState
                }
            })
            this.resetOptions(optionsList[focussedIndex])
        }
    }

    handleKeyDown = (event) => {
        if (!(this.props.readOnly || this.props.disabled)) {
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
                    this.handleEnterPressed()
                    break
                default:
                    this.inputTitle.focus()
            }
        }
    }

    renderItemList() {
        return (
            this.props.value.map((item, i) => (
                <span className={st.selectValue} key={item.value}>
                    <span className={st.selectValueLabel}>{item.label}</span>
                    <span className={st.selectValueIcon} onClick={this.removeItem(i)}>X</span>
                </span>
            ))
        )
    }

    renderInputSize() {
        const { searchInputValue } = this.state

        if (this.props.value.length > 0) {
            if (searchInputValue) {
                return searchInputValue.length
            }
            else {
                return 1
            }
        }

        return null
    }

    render() {
        const { open, searchInputValue, focussedIndex, filteredOptions, options, searching } = this.state
        const { disabled, inline, label, margin, name, placeholder, readOnly, value: selected, width } = this.props

        const optionsList = searching ? filteredOptions : options

        return (
            <div className={cx(st.wrapper, { inline })} style={{ margin, width }}>
                {label ? <label className={st.label}>{label}</label> : null}
                <div className={cx(st.select, { disabled, open })} ref={node => { this.node = node }}>
                    <div
                        className={st.selectItem}
                        onClick={this.toggleSelector}
                        onKeyDown={this.handleKeyDown}
                        ref={select => { this.select = select }}
                        tabIndex="0"
                    >
                        <span className={st.multiSelectedWrapper}>
                            {this.renderItemList()}
                            <input
                                className={cx({ placeholder: !(selected.length > 0) && !searchInputValue })}
                                disabled={disabled}
                                onInput={this.onTextChange}
                                onKeyPress={this.handleKeyPress}
                                placeholder={selected.length > 0 ? "" : placeholder}
                                readOnly={readOnly}
                                ref={el => { this.inputTitle = el }}
                                type="text"
                                value={searchInputValue}
                            />
                        </span>
                        <span className={st.arrowBox}><Icon name={open ? "uparrow" : "downarrow"} size={1} /></span>
                    </div>
                    { open &&
                        <ul className={st.options}>
                            {optionsList.length > 0 ? optionsList.map((item, i) =>
                                <li
                                    className={cx({ [st.focused]: focussedIndex === i })}
                                    key={`${name}-${item.value}`}
                                    onClick={this.selectItem(item)}
                                    onMouseOver={this.handleMouseOver(i)}
                                >
                                    {item.label}
                                </li>) : <li>No results found</li>}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

MultiSelect.defaultProps = {
    disabled: false,
    inline: false,
    label: "",
    margin: "",
    name: "",
    placeholder: "",
    readOnly: false,
    width: ""
}

MultiSelect.propTypes = {
    disabled: PropTypes.bool,
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
    value: PropTypes.array.isRequired,
    width: PropTypes.string
}
