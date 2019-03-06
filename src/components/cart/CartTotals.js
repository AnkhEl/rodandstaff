import React from 'react'
import {Link} from 'react-router-dom';
import PaypalButton from './PayPalButton';
export default function CartTotals({value,history}) {
    const {cartSubTotal,cartTotal,cartTax,clearCart} = value;
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                    <button className="btn btn-outline-danger text-uppercase mb-3 px-5" onClick={()=>clearCart()}>clear cart</button>
                </Link>
                <h5>
                  <span className="text-title">subtotal: R{cartSubTotal}</span>
                </h5>
                <h5>
                  <span className="text-title">tax: {cartTax}</span>
                </h5>
                <h5>
                  <span className="text-title">Total: R{cartTotal}</span>
                </h5>
                <PaypalButton total={cartTotal} clearCart={clearCart} history={history} />
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}
