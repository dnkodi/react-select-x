
import React, { PureComponent } from "react"
import { Select, MultiSelect} from "../src"

const list = [
    { value: "LBJ", label: "Lebron James" },
    { value: "SC", label: "Stepehen Curry" },
    { value: "JH", label: "James Harden" },
    { value: "KD", label: "Kevin Durant" },
    { value: "CP3", label: "Chris Paul" }
]

export class SelectView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: "",
            selectedValues: []
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleItemsClick = this.handleItemsClick.bind(this)
    }

    handleClick(value) {
        this.setState({
            selectedValue: value
        })
    }

    handleItemsClick(value) {
        this.setState({
            selectedValues: value
        })
    }

    render() {
        return (
            <div style={{ margin: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2>Select Component</h2>
                <section>
                    <Select
                        label="Single Select"
                        margin="1rem 0"
                        name="single-select"
                        onChange={this.handleClick}
                        options={list}
                        placeholder="-Select-"
                        value={this.state.selectedValue}
                        width="350px"
                    />

                    <Select
                        disabled
                        label="Single Select (disabled)"
                        margin="1rem 0"
                        name="single-select"
                        onChange={this.handleClick}
                        options={list}
                        placeholder="-Select-"
                        value={this.state.selectedValue}
                        width="350px"
                    />

                    <Select
                        inline
                        searchable
                        label="Inline Searchable Select"
                        margin="1rem 2rem 1rem 0"
                        name="single-select"
                        onChange={this.handleClick}
                        options={list}
                        placeholder="-Select-"
                        value={this.state.selectedValue}
                        width="350px"
                    />

                    <Select
                        disabled
                        label="Searchable Select (disabled)"
                        name="single-select"
                        margin="1rem 0"
                        onChange={this.handleClick}
                        options={list}
                        placeholder="-Select-"
                        searchable
                        value={this.state.selectedValue}
                        width="350px"
                    />
                    
                    <MultiSelect
                        label="Multi-Select"
                        name="multi-select"
                        margin="1rem 0"
                        onChange={this.handleItemsClick}
                        options={list}
                        placeholder="-Select-"
                        value={this.state.selectedValues}
                        width="350px"
                    />
                </section>
            </div>
        )
    }
}
