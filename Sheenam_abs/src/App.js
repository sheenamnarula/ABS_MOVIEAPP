import React, { Component } from 'react';
import './App.css';
import './index.css';
import $ from 'jquery';
import MovieResultsComponent from './MovieResultsComponent.js';



class App extends Component 
{
  constructor()
  {
    super();
    this.state={"name":"","movie":[],"tb":false};
    this.handleChange=this.handleChange.bind(this);
    this.fetchMovieList=this.fetchMovieList.bind(this);
  }

  handleChange(e)
  {
    this.setState({name: e.target.value});
  }
  fetchMovieList(moviename) 
  {
    if(moviename=="")
    {
     var movieName = "titanic"
    }
    else
    {
   var movieName = moviename;
}
  
  var path = 'http://www.omdbapi.com/?s='+ movieName;
    this.setState({tb: true});
    $.ajax({
    
    url: path,
    type: "GET",
    crossDomain: true,
    dataType: 'JSON',

    success : function(data){

    console.log(data.Search);
    this.setState({movie:data.Search});
  
    }.bind(this),
    error: function(err){
    console.log("error in data fetching ");
    }
    });
  }
  



  render() {
    return (
      <div className="App">
      <h1 id = "heading">Movie Search</h1>
            <input id="search" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Type here"/>
            <button type="submit" id="btn" onClick={() => {this.fetchMovieList(this.state.name)}}>Search</button>
            <MovieResultsComponent movie={this.state.movie} tb={this.state.tb} />

        </div>
    );
  }
}

export default App;
 