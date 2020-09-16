// main app
class App extends React.Component {
  constructor() {
    super();
  }

  // parse the data and send it to the server
  send(event) {

    // can access array of all fields using event.target
    let userInfo =
      _.chain(event.target)
        .filter(field => {
          return field.name;
        })
        .map(field => {
          return _.pick(field, 'name', 'value');
        })
        .value();

    // send data to server
    axios.post('/submit', userInfo)
    .then(res => {
      console.log('Sent data to server!');
    })
    .catch(err => {
      console.log(err);
    });

    // disable page reloading
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Checkout />
        <Identifier next={this.send} />
        <Address next={this.send} />
        <Payment next={this.send} />
      </div>
    );
  }
};

// checkout page
let Checkout = ({ next }) => {
  return (
    <button id="checkout" onClick={next}>Checkout!</button>
  )
}

// user info form
let Identifier = ({ next }) => {

  return (
    <form onSubmit={next}>
      <fieldset className="account-info">
        <legend>Account Details</legend>

        <label htmlFor="first-name">First Name</label>
        <input type="text" name="first-name" required></input>

        <label htmlFor="last-name">Last Name</label>
        <input type="text" name="last-name" required></input>

        <label htmlFor="email-address">Email</label>
        <input type="email" name="email-address" required></input>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" required></input>
        <input type="btn" type="submit" name="submit" value="Next"></input>
      </fieldset>
    </form>
  );
}

// address form
let Address = ({ next }) => {

  return (
    <form onSubmit={next}>
      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="line-1">Line 1</label>
        <input type="text" name="line-1" required></input>

        <label htmlFor="line-2">Line 2</label>
        <input type="text" name="line-2"></input>

        <label htmlFor="state">State</label>
        <select required>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>

        <label htmlFor="zip">Zip Code</label>
        <input type="text" name="zip" required></input>

        <input type="btn" type="submit" name="submit" value="Next"></input>
      </fieldset>
    </form>
  );
}

// payment and submit form
let Payment = ({ next }) => {
  return (
    <form onSubmit={next}>
      <fieldset className="Payment">
        <legend>Payment</legend>

        <label htmlFor="credit-card">Credit Card #</label>
        <input type="text" name="credit-card" required></input>

        <label htmlFor="expiration">Expiration Date</label>
        <input type="date" name="expiration" required></input>

        <label htmlFor="cvv">CVV</label>
        <input type="text" name="cvv" required></input>

        <input type="btn" type="submit" name="submit" value="Submit Payment"></input>
      </fieldset>
    </form>
  );
}

// render page onload
window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('app'));
}