import React from "react";

class InformationPage extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
            post: []
     };
 }

    fetchMovieInfo(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`)
            .then(information=>information.json())
            .then(post=>{
                    this.setState({post:post});
                }
            )
    }

    componentDidMount() {
        this.fetchMovieInfo()
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id!==prevProps.match.params.id){
            this.fetchMovieInfo(this.props.match.params.id)
        }
    }

    render(){
        return(
            <div className={'Container'}>
                <div className={'TitleBlock'}>
                    <div className={'TitleBar'}>
                        <h1>{this.state.post.original_title}</h1>
                        <span>{this.state.post.release_date.slice(0,-6)}</span>

                    </div>
                    <div className={'RatingsWrapper'}>

                    </div>
                </div>
                <div className={'SlateWrapper'}>
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