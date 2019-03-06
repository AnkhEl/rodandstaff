import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';

const ProductContext = React.createContext();

//Provider and Consumer are included in the context
//Provider will give us the information for our applications
//Consumer allows us to use the information provided by our provider

class ProductProvider extends Component {
    
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTotal: 0,
        cartTax: 0.1
    }

    increment = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = this.getItem(id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count += 1;
        product.total = product.count * product.price;
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        },()=>{
            this.addTotals();
        })
    }

    decrement = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = this.getItem(id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count -= 1;
    
        if(product.count === 0){
         
                this.removeItem(id);   
        }
        else{
            
            product.total = product.count * product.price;
            this.setState(()=>{
                return {
                    cart: [...tempCart]
                }
            },()=>{
                this.addTotals();
            })
        }
    }

    removeItem = (id)=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);  //return all items having their id's not equal to the current id
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(()=>{
            return {
                products: [...tempProducts],
                cart: [...tempCart]
            }
        },()=>{
            this.addTotals()
        })

    }

    // clearCart = ()=>{
    //     this.setState((prev)=>{
    //         let tempState = {...prev};   
    //         tempState.cart.map((item)=>{
    //             item.inCart = item.inCart?false:false;
    //             item.count = 0;
    //             item.total = 0;
    //             return null;
    //         })
    //         tempState = [];
    //         return {
    //             cart: tempState
    //         }
    //     })
    // }

    clearCart = ()=>{
        this.setState(()=>{
            return {
                cart: []
            }
        }, ()=>{
            this.setProducts();
            this.addTotals();
        });
    }

    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map((item)=>{
            return subTotal+= item.total;
        });
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    getItem(id){
        const product = this.state.products.find((item) => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                detailProduct:product
            }
        })
    }
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return {
                products: tempProducts,
                cart: [...this.state.cart,product]
            }
        },()=>this.addTotals());
    }
    componentDidMount(){
        this.setProducts();
    }
  
    //since the objects are nested inside an array they will be passed by reference and we need to get their
    //values instead of getting their reference. 
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach((item) => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        })

        this.setState(()=>{
            return {products: tempProducts}
        })
    }

    openModal = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                modalProduct: product,
                modalOpen: true,
            }
        })
    }

    closeModal = ()=>{
        this.setState(()=>{
            return {
                modalOpen: false
            }
        })
    }


  render() {
    return (

        <ProductContext.Provider value={{

            ...this.state,
            handleDetail: this.handleDetail,
            addToCart: this.addToCart,
            openModal: this.openModal,
            closeModal: this.closeModal,
            increment: this.increment,
            decrement: this.decrement,
            removeItem: this.removeItem,
            clearCart: this.clearCart

        }}>
            {this.props.children}
        </ProductContext.Provider>
     
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};