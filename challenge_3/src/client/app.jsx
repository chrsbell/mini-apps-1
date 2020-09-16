// main app
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p>Hello</p>
    );
  }
};

// checkout page
let Checkout = ({nextCallback}) => {

}

// user info form
let Identifier = ({nextCallback}) => {

}

// address form
let Address = ({nextCallback}) => {

}

// payment and submit form
let Payment = ({nextCallback}) => {

}

// render page onload
window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
}