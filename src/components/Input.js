import React from 'react'
import '../App.css';

class Input extends React.Component{

    render(){
        return(
            <div>
                <div>
                    <input onChange={this.props.onChange}/>
                </div>
            </div>
        )
    }
}

export default Input