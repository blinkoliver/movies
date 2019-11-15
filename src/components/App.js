import React from 'react';
import '../App.css';
import Input from './Input';
import InformationPage from './InformationPage'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class App extends React.Component{
    state = {
        inputValue:'',
        selectedValue:'',
        results:[],
    };


    handleInput(event){
        let value=event.target.value;
        this.setState({inputValue:value},()=>{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&query=${this.state.inputValue}&page=1&include_adult=false`)
                .then(information=>information.json())
                .then(posts=>{
                    let results=posts.results;
                    this.setState({results:results});
                console.log(results)
                })
                .catch(err=>alert('error'))
        });
    }

  render(){

      return (
          <Router>

              <div className={'navbar'}>

                <div className={'home'}>
                  <button><Link to={"/"}>Movie-Search</Link></button>
                  <Route exact path={"/"}/>
                </div>

                <div className={'search'}>
                    <Input onChange={event=>this.handleInput(event)}/>
                    <div className={'suggestSearch'}>
                        {this.state.results.map(result=>
                            <div className={'suggest'}>
                                <Link key={result.id} to={`InformationPage/${result.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}/>
                                    <div className={'suggestionLabel'}>
                                        <span key={result.id}>{result.title}</span>
                                        <span>({result.release_date.slice(0,4)})</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className={'personal'}>
                    <button><Link to={"/Cabinet"}>Sign In</Link></button>
                </div>

                    <Route path={'/InformationPage/:id'} component={InformationPage}/>

              </div>

        </Router>
      )
  };
}

export default App;
