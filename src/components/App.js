import React from 'react';
import '../App.css';
import Input from './Input';
import Select from './Select'
import InformationPages from './InformationPage'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends React.Component{
    state = {
        inputValue:'',
        selectedValue:'',
        titles:[],
        posters:[],
        id:'',
    };

    handleInput(event){
        let value=event.target.value;
        this.setState({inputValue:value},()=>{
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=6ed6e56030be8bc7d1821d5b302e302e&language=en-US&query=${this.state.inputValue}&page=1&include_adult=false`)
                .then(information=>information.json())
                .then(posts=>{
                    let result=posts.results;
                    let originalTitle = result.map(element=>element.original_title);
                    this.setState({titles:originalTitle});
                    let posters=result.map(element=>element.poster_path);
                    this.setState({posters:posters});
                    let id=result.map(element=>element.id);
                })
        });
    }

    getValue=(event)=>this.setState({selectedValue:event.target.value});

  render(){
      return (
          <Router>
            <div className={'App'}>
                <div className={'Nav'}>
                <Link to={"/"}>Home</Link>
                <Route exact path={"/"}/>
                </div>


                <Input onChange={event=>this.handleInput(event)}/>
                <Select onChange={event=>this.getValue(event)} titles={this.state.titles}/>



                <button><Link to={"/InformationPage"}>Show Information</Link></button>
                <Route path={"/InformationPage/:id"} component={InformationPages}/>
            </div>
          </Router>
  );
}
}

export default App;
