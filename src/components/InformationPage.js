import React from "react";
import moment from "moment";
import Load from './Load'


class InformationPage extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
         post: [],
         loading:true
     };
 }

    fetchMovieInfo(){
        fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`)
        .then(information=>information.json())
        .then(post=>{
                this.setState({post:post}, ()=>this.setState({loading:false}));
                console.log(this.state.post)
            }
        )
 }


    componentDidMount() {
        this.fetchMovieInfo();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id!==prevProps.match.params.id){
            this.fetchMovieInfo(this.props.match.params.id)
        }
    }

    render(){
        if(this.state.loading)
            {return (<Load/>)}
            return(
            <div className={'Container'}>
                    <div className={'TitleBlock'}>
                        <div className={'TitleBar'}>
                            <h1>{this.state.post.original_title} ({moment(this.state.post.release_date).format('YYYY')})</h1>

                            <div className={'Subtext'}>
                                <div>
                                {moment.utc(moment.duration(this.state.post.runtime, "minutes").asMilliseconds()).format('h:mm').replace(':','h ')+'min'}
                                </div>
                                <div>{this.state.post.genres.map(el=><span key={el.id}>{el.name+' '}</span>)}</div>
                                <div>{moment(this.state.post.release_date).format('Do/MMM/YYYY')}
                                    ({this.state.post.production_countries[0].iso_3166_1})
                                </div>
                                {/*<div>{this.state.post.production_companies.map(el=><p key={el.id}>{el.origin_country}</p>)}</div>*/}
                            </div>



                        </div>
                        <div className={'RatingsWrapper'}>
                            <p>{this.state.post.vote_average}/10</p>
                            <p>{this.state.post.vote_count}</p>
                        </div>
                    </div>
                    <div className={'SlateWrapper'}>
                    <img
                    src={`https://image.tmdb.org/t/p/w200${this.state.post.poster_path}`}
                    alt={this.state.post.original_title}
                    />

                    </div>
            </div>
        )
    }

}

export default InformationPage