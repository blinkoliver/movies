import React from "react";
import moment from "moment";
import 'moment-duration-format'
import Load from './Load'
import {Link} from "react-router-dom";



class InformationPage extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
         post: {},
         loading:true,
         trailers:{},
         cast:[],
         directors:[],
         writers:[],
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
    fetchTrailerInfo(){
     fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US`)
         .then(information=>information.json())
         .then(post=>{
             let results = post.results;
             this.setState({trailers:results[0]}, ()=>this.setState({loading:false}));
             // console.log(results)
         }
         )}
     fetchCastCrew(){
     fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=6ed6e56030be8bc7d1821d5b302e302e`)
         .then(information=>information.json())
         .then(post=>{
             let directors = post.crew.filter(el=>el.job==='Director');
             this.setState({directors:directors.map(el=>el.name)});
             let writers=post.crew.filter(el=>el.job==='Writer');
             this.setState({writers:writers.map(el=>el.name)});
             this.setState({cast:post.cast});
             // console.log(post)
         })
            }


    componentDidMount() {
        this.fetchMovieInfo();
        this.fetchTrailerInfo();
        this.fetchCastCrew();
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id!==prevProps.match.params.id){
            this.fetchMovieInfo(this.props.match.params.id);
            this.fetchTrailerInfo(this.props.match.params.id);
            this.fetchCastCrew(this.props.match.params.id)
        }
    }

    render(){

     const genres = this.state.post.genres || [];
     const production_countries = this.state.post.production_countries || [];


        if(this.state.loading)
            {return (<Load/>)}
            return(
            <div className={'Container'}>
                    <div className={'TitleBlock'}>
                        <div className={'TitleBar'}>
                            <h1>{this.state.post.original_title} <span>({moment(this.state.post.release_date).format('YYYY')})</span></h1>

                            <div className={'Subtext'}>
                                <div>{moment.duration(this.state.post.runtime, 'minutes').format('h:mm').replace(':','h ')+'min'}</div>

                                <div>
                                    {
                                        genres.map((el, index) =>{
                                            const name = index === this.state.post.genres.length - 1 ? el.name :`${el.name}, `;
                                            return <Link to={`/Genres/${el.id}`} key={el.id}>{name}</Link>})
                                    }
                                </div>

                                <div>{moment(this.state.post.release_date).format('Do/MMM/YYYY')}</div>
                                <div>({
                                    production_countries.map((el, index)=>{
                                        const name=index===this.state.post.production_countries.length-1 ? el.name:`${el.name}, `;
                                        return <a href={`production_countries/${el.iso_3166_1}`} key={el.iso_3166_1}>{name}</a>
                                    })
                                })
                                </div>
                            </div>
                        </div>
                        <div className={'RatingsWrapper'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width='50' height='50' stroke="gold" fill="gold" viewBox="0 0 35 35"><path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/></svg>
                            <div>
                                <div><p>{this.state.post.vote_average}</p><p>/10</p></div>
                                <p>{this.state.post.vote_count}</p>
                            </div>
                        </div>
                    </div>

                    <div className={'SlateWrapper'}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${this.state.post.poster_path}`}
                            alt={this.state.post.original_title}
                        />
                        {this.state.trailers&&
                        <iframe src={`https://www.youtube.com/embed/${this.state.trailers.key}`}
                                frameBorder={"0"}
                                allow={"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"}
                                allowFullScreen
                                title={this.state.trailers.id}>
                        </iframe>}
                    </div>
                    <div className={'Overview'}>
                        <h1>{this.state.post.overview}</h1>
                        <div className={'CastCrew'}>
                            <div><b>Director: </b>{this.state.directors}</div>
                            <div><b>Writers: </b>{this.state.writers}</div>
                            <div><b>Stars: </b>{this.state.cast.map((el, index)=>{
                                const name=index===this.state.cast.length-1 ? el.name:`${el.name}, `;
                                return <Link key={el.id} to={`/Name/${el.id}`}>{name}</Link>
                                }
                            )}</div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default InformationPage