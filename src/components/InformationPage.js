import React from "react";

class InformationPage extends React.Component{

    state={
      posts:[]
    };

    componentDidMount() {
        console.log(this.props);
    fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`)
        .then(information=>information.json())
        .then(posts=>{
            this.setState({posts:posts});
            console.log(this.state.posts)
            }
    )}

    render(){
        return(
            <div className={'App'}>
                <div className={'App-header'}>
                    <p>Title:{this.state.posts.original_title}</p>

                    <img
                        src={`https://image.tmdb.org/t/p/w200${this.state.posts.poster_path}`}
                        alt={this.state.posts.original_title}
                    />
                </div>

            </div>
        )
    }

}

export default InformationPage