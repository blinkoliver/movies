import React from "react";

class InformationPage extends React.Component{

    componentDidMount() {
        const movieId=this.props.match.params.id
    }

    render(){
        return(
            <div className={'App'}>
                <div className={'App-header'}>
                    <p>efsf</p>
            {this.props.posters.map(element=> <img
                    key={element}
                    src={`https://image.tmdb.org/t/p/w200${element}`}
                />)}
                </div>
            </div>
        )
    }

}

export default InformationPage