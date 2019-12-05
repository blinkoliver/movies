import React from 'react'

class Name extends React.Component{
    constructor(props){
        super (props);
        this.state={

        };
    };

    render() {
        return(
            <div className={'Container'}>
                <div className={'TitleBlock'}>
                    <span>zalup</span>
                    <div style={{color:'red', height:'200px', width:'200px'}}>her</div>
                </div>
            </div>
        )
    }
}

export default Name