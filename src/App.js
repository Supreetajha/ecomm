import Container from 'react-bootstrap/Container'
import { HashRouter, Route } from 'react-router-dom'
//My components
import Header from './Components/Header'
import Footer from './Components/Footer'
//My Screens
import Homescreen from './Screens/Homescreen'
import Productscreen from './Screens/Productscreen'
import Cartscreen from './Screens/Cartscreen'
import Loginscreen from './Screens/Loginscreen'
import Registerscreen from './Screens/Registerscreen'
import Profilescreen from './Screens/Profilescreen'
import Shippingscreen from './Screens/Shippingscreen'
import Paymentscreen from './Screens/Paymentscreen'
import PlaceOrderscreen from './Screens/PlaceOrderscreen'
import Orderscreen from './Screens/Orderscreen'
import UserListscreen from './Screens/UserListscreen'
import UserEditscreen from './Screens/UserEditscreen'
import ProductListscreen from './Screens/ProductListscreen'
import ProductEditscreen from './Screens/ProductEditscreen'
import OrderListscreen from './Screens/OrderListscreen'


function App() {
  return (
    <HashRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Homescreen} exact />
          <Route path="/product/:id" component={Productscreen} />
          <Route path="/cart/:id?" component={Cartscreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/register" component={Registerscreen} />
          <Route path="/profile" component={Profilescreen} />
          <Route path="/shipping" component={Shippingscreen} />
          <Route path="/payment" component={Paymentscreen} />
          <Route path="/placeorder" component={PlaceOrderscreen} />
          <Route path="/order/:id?" component={Orderscreen} />

          <Route path="/admin/userlist" component={UserListscreen} />
          <Route path="/admin/user/:id/edit" component={UserEditscreen} />

          <Route path="/admin/productlist" component={ProductListscreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditscreen} />

          <Route path="/admin/orderlist" component={OrderListscreen} />

        </Container>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
