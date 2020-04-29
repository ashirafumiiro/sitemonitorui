import React, {Component} from 'react';
//import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js'
import  'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './dashboard.css';
import ContentArea from "./ContentArea";


class App extends Component{

    render() {
    let name = "Eaton towers";
    return (

        <div className="App">
          <ContentArea companyName={name}>

          </ContentArea>

        </div>
    );
  }
}

export default App;
