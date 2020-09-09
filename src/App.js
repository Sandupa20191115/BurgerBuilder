import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder';

class App extends Component{
  render(){
    return(
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }

export default App;
