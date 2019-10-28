import React from "react";

class Select extends React.Component{

    render() {
        return (
            <div>
                <div>
                <select onChange={this.props.onChange}>
                    {this.props.titles.map(element=><option>{element}</option>)}
                </select>
                </div>
            </div>
        );
    }
}

export default Select
