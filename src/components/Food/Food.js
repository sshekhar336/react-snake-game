import React, { Component } from 'react'

import './Food.css'

export class Food extends Component {
    render() {
        const style={
            left: `${this.props.fooddots[0]}%`,
            top: `${this.props.fooddots[1]}%`
        }
        return (
            <div>
                <div className="food" style={style}></div>
            </div>
        )
    }
}

export default Food
