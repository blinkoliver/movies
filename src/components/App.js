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
        inputIsFocused:true||false,
        error:true||false,
        loading:true
    };

    handleInput(event){

        let value=event.target.value;
        this.setState({inputValue:value},()=>{
            if (value.length>0){
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&query=${this.state.inputValue}&page=1&include_adult=false`)
                .then(information=>information.json())
                .then(posts=>{
                    let results=posts.results;
                    this.setState({results:results});
                // console.log(results)
                })
                .catch(this.setState({error:true}))
            }}
        );
    }

    onBlur=()=>{
        setTimeout(()=>{this.setState({inputIsFocused:false})},[500])
        // document.getElementById("suggestSearch").style.display='none';
    };
    onFocus=()=>{
        this.setState({inputIsFocused:true});
        // document.getElementById("suggestSearch").style.display='block';
    };

  render(){
      return (
          <Router>
              <header>
                  <div className={'Container'}>
                      <div className={'home'}>
                        <button><Link to={"/"}>Movie-Search</Link></button>
                        <Route exact path={"/"}/>
                      </div>

                      <div className={'search'}>
                        <Input onChange={event=>this.handleInput(event)}
                               onBlur={this.onBlur}
                               onFocus={this.onFocus}
                        />
                        {this.state.inputIsFocused&&
                            <div id={'suggestSearch'}>
                                {this.state.results.map(result =>
                                    <div key={result.id} id={'suggest'}>
                                        <Link key={result.id} to={`/InformationPage/${result.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                                 alt={result.title}/>
                                            <div className={'suggestionLabel'}>
                                                <span key={result.id}>{result.title}</span>
                                                <span>({result.release_date?result.release_date.slice(0,-6):''})</span>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        }
                      </div>

                      <div className={'personal'}>
                        <button><Link to={"/Cabinet"}>Sign In</Link></button>
                      </div>
                  </div>
              </header>

              <div className={'Content'}>
                  <Route path={'/InformationPage/:id'} component={InformationPage}/>
              </div>

              <footer>

              </footer>
          </Router>
      )
  };
}

export default App;
