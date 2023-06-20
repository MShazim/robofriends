import React , { Component } from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';



class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        window.addEventListener("scroll", this.scrollFunction);
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {this.setState({ robots: users})});   
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        if (event.target.value.length === 0) {
        document.getElementById("footer").style.marginTop = "auto"
        } else {
            document.getElementById("footer").style.marginTop = "45%"
        } 
    }

    scrollFunction = () => {
        if (document.documentElement.scrollTop > 50) {
        document.getElementById("title").className = "f2";
        } else {
            document.getElementById("title").className = "f1";
        }
    }
    
    render() {
        const { robots , searchfield} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?
        <h1 id="title">Loading...</h1> :
        (
            <div className="tc">
                <div id="header">
                    <h1 id="title" className="f1">RoboFriends</h1>
                    <SearchBox searchChange= {this.onSearchChange}/>
                </div>

                <ErrorBoundary>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundary>

                <div id="footer">
                    <p>Copyright © 2023 ZeroToMastery. All rights reserved.</p>
                    <p>Developed by: MShazim | GitHub</p>
                </div>
            </div>
        );
    }
}


export default App; 