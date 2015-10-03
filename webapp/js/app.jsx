
"use strict"

const React = require("react");
const Button = require("react-bootstrap/lib/Button");
const Panel = require("react-bootstrap/lib/Panel");
const Jumbotron = require("react-bootstrap/lib/Jumbotron");
// React components

class Header extends React.Component {
   render() {
      const style = {
         marginTop: 20,
         fontSize:'2em',
         paddingLeft: 20,
      }
      return <Jumbotron style={style} bsSize='large' className="semi-transparent">
         <h1>Retail App<br/><small>Transaction manager</small></h1>
      </Jumbotron>
   }
}

class BigButton extends React.Component {
   render() {
      return <form action={this.props.link} method="get">
         <Button type="submit" bsStyle="primary" bsSize="large" block>
            {this.props.text}
         </Button>
      </form>
   
   }
}

class Transaction extends React.Component {
   render() {
      return <Panel className="semi-transparent">
         Transaction logic goes here!
      </Panel> 
   }
}

class Source extends React.Component {
   render() {
      return <Panel className="semi-transparent text-center">
         HackZurich 2015 - Proof of Concept - 
         Original Theme: <a href="https://bootswatch.com/readable/">Readable</a> 
      </Panel>
   }
}

class Page extends React.Component {
  // The main component that contains the whole page. 
  render() {
    return <div>
       <div className="container bodyContainer">
         <Header />
         <Transaction />
       </div>
       <div className="container">
         <Source /> 
       </div>
    </div>
  }
};

React.render(<Page/>,document.getElementById('container'));
// Render the page as soon as the page loads, to show all information already present

