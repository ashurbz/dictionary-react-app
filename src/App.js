import React, { Component } from 'react';
import './App.css';
import LinearProgress  from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      items: [],
      loader:false
    }
  }

  onChange = e => {
    this.setState({
      data: e,
    })
  };

  
  endari = () => {
    this.setState({
      ...this.state,
      loader:true})
    const { data } = this.state;
    axios.post('http://localhost:5000/definition', {
          e: data
      })
      .then(({ data }) => {
        let meaning = [];
        let definition = [];
        let bothCat = {}
        console.log(data.results[0].lexicalEntries)
        data.results[0].lexicalEntries.forEach(element => {
          element.entries.forEach(sens => {
            sens.senses.forEach(def => {
              meaning.push([element.lexicalCategory, def])
            })
          })
        });

      
        
      
        definition.push(meaning);
        console.log(meaning)

        this.setState({
          items: meaning,
          loader:false
        })
       
      })
      .catch(err => {
        this.setState({
          ...this.state,
          loader:false
        })
        console.log(err);
      })

  };
  
  

  render() {
    const { items } = this.state;
    console.log(this.state.loader)
    return (
      <div>
        <div className="App">
          <header className="App-header">
            
            <h2>Dictionary</h2>
            <input

            className={"input"}
            onChange={e => this.onChange(e.target.value)}
            placeholder={"Enter word..."}
           ></input>
            
             
           
            <Button
              onClick={() => this.endari()}
              color={"secondary"}
              variant="contained"
              style={{marginTop:"10px"}}
            >
              
              Search
            </Button>

            {this.state.loader?<div style={{width:"100vw",padding:" 50px 0"}}><LinearProgress color="secondary" /></div>:<div>
              {items.map(ele => {
                return (<div>
                  <h2>category : Noun</h2>
                  <div>
                    <h2>definition</h2>
                  {ele[1].definitions[0]}
                  </div>
                      <div>
                        <h2>example</h2>
                        {ele[1].examples[0].text}
                      </div>
                    <div>  
                      <h2>category : Verb</h2>
                  <div>
                    <h2>definition</h2>
                  {ele[1].definitions[0]}
                  </div>
                  <div>
                    <h2>example</h2>
                    {ele[1].examples[0].text}
                  </div>
                  </div>
                  </div>
                  )
              })}
            </div>}
          </header>
        </div>
      </div>
    );
  }
}

export default App;