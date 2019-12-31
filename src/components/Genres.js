import React from "react";
import Load from './Load'
import {Link} from "react-router-dom";

class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
}}
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.id}`)
            .then(information=>information.json())
            .then(post=>{
                    this.setState({post:post}, ()=>this.setState({loading:false}));
                    console.log(this.props, this.state.post)
                }
            )
    }

render()
{
    console.log(this.props);

    return(
                <div className={'Container'}>
<h1>her</h1>
                </div>
            )
    }
}

export default Genres