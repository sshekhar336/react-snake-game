import React, { Component } from 'react'
import Snake from '../Snake/Snake';
import './SnakeGame.css';
import Food from '../Food/Food';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
}

class SnakeGame extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fooddots: getRandomCoordinates(),
            snakedots: [
                [0, 50],
                [2, 50]
            ],
            speed: 200,
            direction: "RIGHT",
            gamePause: 0,
        }
    }

    componentDidMount() {
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onKeyDown;
        if (window.innerWidth > 768) {
            document.getElementById("buttons").style.display = "none";
        }
    }

    componentDidUpdate() {
        this.checkIfOutOfArea();
        this.checkIfCollapsed();
        this.checkIfEat();
    }

    onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({ direction: 'UP' });
                break;
            case 40:
                this.setState({ direction: 'DOWN' });
                break;
            case 37:
                this.setState({ direction: 'LEFT' });
                break;
            case 39:
                this.setState({ direction: 'RIGHT' });
                break;
        }
    }

    moveSnake = () => {
        if (this.state.gamePause == 1) {
            let dots = [...this.state.snakedots];
            let headOfSnake = dots[dots.length - 1];

            switch (this.state.direction) {
                case 'RIGHT':
                    headOfSnake = [headOfSnake[0] + 2, headOfSnake[1]];
                    break;
                case 'LEFT':
                    headOfSnake = [headOfSnake[0] - 2, headOfSnake[1]];
                    break;
                case 'DOWN':
                    headOfSnake = [headOfSnake[0], headOfSnake[1] + 2];
                    break;
                case 'UP':
                    headOfSnake = [headOfSnake[0], headOfSnake[1] - 2];
                    break;
            }
            dots.push(headOfSnake);
            dots.shift();
            this.setState({
                snakedots: dots
            })
        }
    }

    checkIfOutOfArea = () => {
        // console.log("Outttttttts");
        let headOfSnake = this.state.snakedots[this.state.snakedots.length - 1];
        if (headOfSnake[0] >= 100 || headOfSnake[0] < 0 || headOfSnake[1] >= 100 || headOfSnake[1] < 0) {
            this.gameOver();
        }
    }

    checkIfCollapsed = () => {
        // console.log("Collllllllllll");
        let snake = [...this.state.snakedots];
        let headOfSnake = snake[snake.length - 1];
        snake.pop()
        snake.forEach(dot => {
            if (headOfSnake[0] === dot[0] && headOfSnake[1] === dot[1]) {
                this.gameOver();
            }
        })
    }

    checkIfEat() {
        let headOfSnake = this.state.snakedots[this.state.snakedots.length - 1];
        let fooddots = this.state.fooddots;
        if (headOfSnake[0] === fooddots[0] && headOfSnake[1] === fooddots[1]) {
            this.setState({
                fooddots: getRandomCoordinates()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakedots];
        newSnake.unshift([])
        this.setState({
            snakedots: newSnake
        })
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 20
            })
        }
    }

    gameOver = () => {
        console.log("Game Over!!")
        alert(`Game Over. Snake length is ${this.state.snakedots.length}`);
        this.setState({
            fooddots: getRandomCoordinates(),
            snakedots: [
                [0, 50],
                [2, 50]
            ],
            speed: 200,
            direction: "RIGHT",
            gamePause: 0,
        })

    }

    gamePause = () => {
        (this.state.gamePause == 0) ? (
            this.setState((prev) => (
                {
                    gamePause: 1,
                }
            ))
        ) : (
                alert("Game is Paused!! Press OK to Continue...")

            )
    }

    onButtonDown = (val) => {
        switch (val) {
            case 38:
                this.setState({ direction: 'UP' });
                break;
            case 40:
                this.setState({ direction: 'DOWN' });
                break;
            case 37:
                this.setState({ direction: 'LEFT' });
                break;
            case 39:
                this.setState({ direction: 'RIGHT' });
                break;
        }
    }

    render() {
        var windowHeight = window.innerHeight;
        const divStyle = {
            height: windowHeight,
            overflow: "hidden",
        }

        return (
            <div className="gameContainer" style={divStyle}>
                <div className="gameTitle">
                    <h1>Snake Game</h1>
                </div>
                <div className="gamebox">
                    <Snake snakedots={this.state.snakedots}></Snake>
                    <Food fooddots={this.state.fooddots}></Food>
                </div>


                <div className="startAndPausebtn">
                    {
                        (this.state.gamePause == 0) ?
                            <button className="btn" onClick={this.gamePause}>Start</button>
                            :
                            <button className="btn" onClick={this.gamePause}>Pause</button>
                    }

                </div>
                <div id="buttons">

                    <div className="up">
                        <button className="btn" onClick={() => this.onButtonDown(38)}>UP</button>
                    </div>
                    <div className="left">
                        <button className="btn" onClick={() => this.onButtonDown(37)}>LEFT</button>
                    </div>
                    <div className="right">
                        <button className="btn" onClick={() => this.onButtonDown(39)}>RIGHT</button>
                    </div>
                    <div className="down">
                        <button className="btn" onClick={() => this.onButtonDown(40)}>Down</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default SnakeGame
