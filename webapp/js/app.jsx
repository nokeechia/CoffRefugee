"use strict"

const React = require("react");
const Button = require("react-bootstrap/lib/Button");
const ButtonGroup = require("react-bootstrap/lib/ButtonGroup");
const Panel = require("react-bootstrap/lib/Panel");
const Jumbotron = require("react-bootstrap/lib/Jumbotron");
const Table = require("react-bootstrap/lib/Table");
const Modal = require("react-bootstrap/lib/Modal")
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
      return <Button onClick={this.props.handleClick} bsStyle={this.props.bsStyle} bsSize="large" block>
            {this.props.children}
         </Button>
   }
}

BigButton.defaultProps = {
   bsStyle: "primary",
}

class ItemButton extends React.Component {
   render() {
      return <div className="btn-group">
         <Button onClick={this.props.handleClick}>{this.props.children}</Button>
      </div>
   }
}

class CurrentTransaction extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selection: {}
      }
   }

   handleSubmit() {
      console.log('OH YEAH');
      // Show a popup to propose coupon
      // Update final price
      // Submit transaction
   }

   render() {
      let handleItemSelection = id => {
         var selection = this.state.selection
         if(typeof selection[id]==='undefined') {
            selection[id] = {
               quantity: 1, 
            }   
         } else {
            selection[id].quantity += 1;
         }
         this.setState({selection: selection})
      } 
      let formatString = item => item.name+' - '+item.price+'.-';
      var itemButtons = []; 
      
      for(var itemKey in this.props.availableItems) {
         var item = this.props.availableItems[itemKey];
         itemButtons.push(<ItemButton key={itemKey} handleClick={handleItemSelection.bind(null,itemKey)}>
            { formatString(item) }
         </ItemButton>) 
      }

      var rows = []; 
      var total = 0;
      for(var itemKey in this.state.selection) {
         var item = this.props.availableItems[itemKey];
         var selection = this.state.selection[itemKey];
         var itemTotal = selection.quantity*item.price;
         total += itemTotal;
         rows.push(<tr key={itemKey}>
            <td>{itemKey}</td>
            <td>{item.name}</td>          
            <td>{item.price.toFixed(2)}</td>          
            <td>{selection.quantity}</td>          
            <td>{itemTotal.toFixed(2)}</td>          
         </tr>)
      }
      return <div>
         <h3>Transaction in progress</h3>
         <ButtonGroup justified>
            {itemButtons}
         </ButtonGroup>
            
         <br/>
         <div>
            <Table striped bordered condensed hover>
               <thead>
                  <tr key='first'><th>ID</th><th>Name</th><th>Unit Price</th><th>Quantity</th><th>Total Price</th></tr>
               </thead>
               <tbody>
                  {rows}
               </tbody>
               <tfoot>
                  <tr key='last'><th colSpan={4}>Total</th><th>{total.toFixed(2)}</th></tr>
               </tfoot>
            </Table>
         </div>
         <br/>
         <div>
            <BigButton handleClick={this.handleSubmit.bind(this)}>"Submit transaction"</BigButton>
            <br/>
            <BigButton handleClick={this.props.handleCancel} bsStyle="danger">
               Cancel transaction
            </BigButton>
         </div>
      </div>
           
   }
}

CurrentTransaction.defaultProps = {
   availableItems: {
      123: { name:'Coffee',price:1.80}, 
      342: { name:'Orange Juice',price:5.0}, 
      567: { name:'Croissant',price:3.80}, 
      367: { name:'Bretzel',price:3.80}, 
   }
}

class TransactionContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = { transactionInProgress:false}
   }
   render() {
      let cancelTransaction = () => this.setState({transactionInProgress:false});
      let newTransaction = () => this.setState({transactionInProgress:true});

      var transactElem = null;
      if(this.state.transactionInProgress) {
         // A transaction is in progress
         transactElem = <CurrentTransaction handleCancel={cancelTransaction} />
      } else {
         // Propose to create a new transaction
          transactElem = <BigButton handleClick={newTransaction}>New Transaction</BigButton>
      }
      return <Panel className="semi-transparent">
         {transactElem}
      </Panel> 
   }
}

class Footer extends React.Component {
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
         <TransactionContainer />
       </div>
       <div className="container">
         <Footer /> 
       </div>
    </div>
  }
};

React.render(<Page/>,document.getElementById('container'));
// Render the page as soon as the page loads, to show all information already present

