import React from 'react'
import '../App.css';

class Input extends React.Component{

    render(){
        return(
            <input onChange={this.props.onChange} placeholder={"Find Movies, TV shows, Celebrities and more..."}/>
        )
    }
}

export default Input