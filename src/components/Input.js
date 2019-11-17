import React from 'react'
import '../App.css';

class Input extends React.Component{

    render(){
        return(
            <input id={'focus'} onChange={this.props.onChange} onBlur={this.props.onBlur} onFocus={this.props.onFocus} placeholder={"Find Movies, TV shows, Celebrities and more..."}/>
        )
    }
}

export default Input