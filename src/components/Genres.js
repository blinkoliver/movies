import React from "react";
import Load from './Load'
import {Link} from "react-router-dom";

class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            loading:true
}}
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${this.props.match.params.id}`)
            .then(information=>information.json())
            .then(post=>{
                    this.setState({post:post.results}, ()=>this.setState({loading:false}));
                    console.log(this.state.post)
                }
            )
    }

render()
 {
     if(this.state.loading)
     {return (<Load/>)}
    return(
                <div className={'Container'}>
                    <div>{this.state.post.map(element=>
                        <div>
                            <Link key={element.id} to={`/InformationPage/${element.id}`}>
                                    {element.original_title}
                            </Link>
                        </div>)}
                    </div>
                </div>
            )
    }
}

export default Genres