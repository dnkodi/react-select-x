
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
            <div style={{ margin: 10 }}>
                <h1>Select Component</h1>
                <section>
                    <h2>Single Select</h2>
                    <Select margin="1rem 0" message="Please Select" name="single-select" onChange={this.handleClick} options={list} width="350px" placeholder="-Select-" searchable value={this.state.selectedValue} />
                </section>
                <section>
                    <h2>Multi Select</h2>
                    <MultiSelect margin="1rem 0" message="Please Select" name="multi-select" onChange={this.handleItemsClick} options={list} width="350px" placeholder="-Select-" value={this.state.selectedValues} />
                </section>
            </div>
        )
    }
}
