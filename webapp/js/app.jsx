"use strict"

const $ = require("jquery")
const React = require("react");
const Alert = require("react-bootstrap/lib/Alert")
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
         <h1>Retail App<br/><small>Coffees on hold: {this.props.coffeesOnHold}</small></h1>
         
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

class TransactionConfirmationModal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         coffeeOnHold:false,
         alertContent: "",
      }
   }
   render() {
      let totalToPay = this.props.total;
      if(this.state.coffeeOnHold) {
         totalToPay += this.props.coffeePrice;
      }
      let handleYesClick = () => this.setState({coffeeOnHold:true});
      let handleNoClick = () => this.setState({coffeeOnHold:false});
      let startTransaction = () => {
         $.ajax({
            url: '/addTransaction', 
            method: 'POST', 
            data: {
               originalPrice: this.props.total,  
               coffeeOnHold: this.state.coffeeOnHold, 
               totalPaid: totalToPay, 
            }, 
            success: m => {
               this.setState({
                  alertContent: <Alert dismissAfter={2000} bsStyle='success'>Success!</Alert>
               })
               renderPage(m)
               window.setTimeout(this.props.handleClose,2500);
               window.setTimeout(this.props.handleCancel,2700);
            }, 
            error: e => {
               this.setState({
                  alertContent: <Alert dismissAfter={2000} bsStyle='danger'>Error: {e}</Alert>
               })
               window.setTimeout(this.props.handleClose,2500)
            }
         },this)
      }
      let alert = null; 
      if(this.state.alertContent!=="") {
         alert = this.state.alertContent;
      }
      return <Modal show={this.props.show} onHide={this.props.handleClose}>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Confirm Payment</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p>Total to pay: <strong>{this.props.total.toFixed(2)} CHF</strong> </p>
            <p>Would you want to put a coffee on hold for a person in need? </p> 
            <ButtonGroup>
               <Button 
                  bsStyle={this.state.coffeeOnHold?"primary":"default"} 
                  onClick={handleYesClick}>Yes ({this.props.coffeePrice+'.-'})</Button>
               <Button 
                  bsStyle={this.state.coffeeOnHold?"default":"primary"} 
                  onClick={handleNoClick}>No (0.-)</Button>
            </ButtonGroup>
            <br/>
            {alert}
         </Modal.Body>
         <Modal.Footer>
            <Button bsStyle='success' onClick={startTransaction}>Pay ({totalToPay.toFixed(2)})</Button>
            <Button onClick={this.props.handleClose}>Close</Button>
         </Modal.Footer>
      </Modal> 
   }
}
TransactionConfirmationModal.defaultProps = {
   total: 0, 
   coffeePrice: 2.80,
   show: false, 
}

class CurrentTransaction extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selection: {},
         showConfirmModal: false,
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
         this.setState({selection: selection});
      } 
      let formatString = item => (item.name+' - '+item.price+'.-');
      let handleSubmit = () => this.setState({showConfirmModal: true});
      let handleCloseModal = () => this.setState({showConfirmModal: false});
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
            <BigButton handleClick={handleSubmit}>Submit transaction</BigButton>
            <br/>
            <BigButton handleClick={this.props.handleCancel} bsStyle="danger">
               Cancel transaction
            </BigButton>
         </div>
         <TransactionConfirmationModal 
            total={total}
            handleCancel={this.props.handleCancel}
            show={this.state.showConfirmModal} 
            handleClose={handleCloseModal}
            />
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

class VoucherContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         showRedeemModal: false,
         alertContent: null, 
      }
   }
   render() {
      let showModal = () => this.setState({showRedeemModal: true});
      let hideModal = () => this.setState({showRedeemModal: false});
      let handleConfirm = () => {
         $.ajax({
            url: '/redeemCoffeeOnHold', 
            method: 'POST', 
            success: m => {
               this.setState({
                  alertContent: <Alert dismissAfter={2000} bsStyle='success'>Success!</Alert>
               })
               renderPage(m);
               window.setTimeout(hideModal,2500)
            }, 
            error: e => {
               this.setState({
                  alertContent: <Alert dismissAfter={2000} bsStyle='danger'>Error: {e}</Alert>
               })
               window.setTimeout(hideModal,2500)
            }
         },this)
      }
      return <div>
         <BigButton handleClick={showModal}>Redeem Voucher in Pool</BigButton>
         <Modal show={this.state.showRedeemModal} onHide={hideModal}>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title">Confirm Gift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <p>Current number of coffees on hold: <strong>{this.props.coffeesInPool}</strong> </p>
               <p>Are you sure you want a coffee from the pool? </p> 
               {this.state.alertContent}
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={handleConfirm} bsStyle='success'>Yes! Get a coffee!</Button>
               <Button onClick={this.props.handleClose}>Abandon</Button>
            </Modal.Footer>
         </Modal>
      </div>
   }
}
VoucherContainer.defaultProps = {coffeesInPool: 7,}

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
          transactElem = <div>
               <BigButton handleClick={newTransaction}>New Transaction</BigButton>
               <br/>
               <VoucherContainer coffeesInPool={this.props.coffeesOnHold}/>
            </div>
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
   console.log('on hold: '+this.props.coffeesOnHold)
    return <div>
       <div className="container bodyContainer">
         <Header coffeesOnHold={this.props.coffeesOnHold}/>
         <TransactionContainer />
       </div>
       <div className="container">
         <Footer /> 
       </div>
    </div>
  }
};
Page.defaultProps = {
   coffeesOnHold: ""
}

React.render(<Page/>,document.getElementById('container'));
// Render the page as soon as the page loads, to show all information already present

let renderPage = d => React.render(<Page coffeesOnHold={d}/>,document.getElementById('container'))
$.get('/coffeesOnHold',renderPage)
window.setInterval(() => $.get('/coffeesOnHold',renderPage),2000);
