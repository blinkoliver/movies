import React from 'react';
import '../App.css';
import Input from './Input';
import InformationPages from './InformationPage'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends React.Component{
    state = {
        inputValue:'',
        selectedValue:'',
        results:[]
    };

    handleInput(event){
        let value=event.target.value;
        this.setState({inputValue:value},()=>{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&query=${this.state.inputValue}&page=1&include_adult=false`)
                .then(information=>information.json())
                .then(posts=>{
                    let results=posts.results;
                    results.map(element=>element.results);
                    this.setState({results:results});
                    // console.log(this)
                })
        });
    }

  render(){
      return (
          <Router>
            <div className={'App'}>

                <Link to={"/"}>Home</Link>
                <Route exact path={"/"}/>

                <Input onChange={event=>this.handleInput(event)}/>

                    {this.state.results.map(result=>
                        <Link key={result.id} to={`InformationPage/${result.id}`}>
                            <p key={result.id}>{result.title}</p>
                        </Link>
                    )}

                <Route path={`/<InformationPage/>/:id`}/>

            </div>
        </Router>
      )
  };
}

export default App;
