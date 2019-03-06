import React from 'react'

export default function CartItem({item,value}) {
    const {id,title,img,price,total,count} = item;
    const {increment,decrement,removeItem} = value;
  return (
      <div className="row my-5 text-capitalize text-center">
        <br /> 
        <div className="col-10 mx-auto col-lg-2">
            <img src={img} className="img-fluid" style={{width:"5rem",height:"5rem"}} alt="product" />
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <span className="d-lg-none">product: </span>{title}
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <span className="d-lg-none">price: </span>{price}
        </div>
        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
            <div className="d-flex justify-content-center">
                <div>
                    <span className="btn btn-danger mx-1" onClick={()=>decrement(id)}>-</span>
                    <span className="btn mx-1">{count}</span>
                    <span className="btn btn-success mx-1" onClick={()=>increment(id)}>+</span>
                </div>
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <div className="cart-icon" onClick={()=>removeItem(id)}>
                <i className="fas fa-trash"></i>remove 
            </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
            <strong className="text-muted">item total: R{total}</strong>
        </div>
    </div>
  )
}
