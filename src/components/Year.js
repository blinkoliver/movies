import React from "react";
import Load from './Load'
import {Link} from "react-router-dom";

class Year extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            loading:true
        }}
    fetchFilmsInfoAboutYear(){
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&sort_by=popularity.desc&certification_country=RU&include_adult=false&include_video=false&page=1&year=${this.props.match.params.id}`)
            .then(information=>information.json())
            .then(post=>{
                    this.setState({post:post.results}, ()=>this.setState({loading:false}));
                    console.log(this.state.post)
                }
            )
    }

    componentDidMount() {
        this.fetchFilmsInfoAboutYear()
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id!==prevProps.match.params.id){
            this.fetchFilmsInfoAboutYear(this.props.match.params.id);
        }
    }

    render()
    {
        if(this.state.loading)
        {return (<Load/>)}
        return(
            <div className={'Container'}>
                <h1>Films of {this.props.match.params.id}</h1>
                <div className={'KnownForItems'} style={{flexDirection: 'column'}}>
                    {this.state.post.map(result=>
                        <div key={result.id} style={{flexDirection: 'row'}}>
                            <Link key={result.id} to={`/InformationPage/${result.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                     alt={result.id}
                                />
                                {result.original_title}
                            </Link>
                            <h2>{result.overview}</h2>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Year