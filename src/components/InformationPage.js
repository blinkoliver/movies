import React from "react";

class InformationPage extends React.Component{

    state={
      post:[]
    };

    componentDidMount() {
        console.log(this.props);
    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`)
        .then(information=>information.json())
        .then(post=>{
            this.setState({post:post});
            console.log(this.state.post)
            }
    )}

    render(){
        return(
            <div className={'App'}>
                <div className={'App-header'}>
                    <p>Title:{this.state.post.original_title}</p>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${this.state.post.poster_path}`}
                        alt={this.state.post.original_title}
                    />
                    <p>{this.state.post.overview}</p>
                </div>

            </div>
        )
    }

}

export default InformationPage