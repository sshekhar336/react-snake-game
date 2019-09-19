import React, { Component } from 'react'

import './Snake.css';

class Snake extends Component {
    render() {
        return (
            <div>
                {
                    this.props.snakedots &&
                    this.props.snakedots.map((dot,index)=>{
                        const style = {
                            left:`${dot[0]}%`,
                            top:`${dot[1]}%`
                        }
                        return(
                            <div className="snake-dot" key={index} style={style}></div>
                        )
                        
                    })
                }
            </div>
        )
    }
}

export default Snake
