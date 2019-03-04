import React, {Component} from 'react'
import axios from 'axios'

class List extends Component{
// const List = ( { items } ) => {
    constructor(){
        super()
        this.state = {
            products: []
        }
        this.createProducts = this.createProducts.bind(this)
        this.destroyProducts = this.destroyProducts.bind(this)

    }

    createProducts(id){
        axios.post(`/api/products/${id}`)
        .then( res => res.data )
        .then( product => {
            const products = this.state.products
            products.push(product)
            this.setState({ products })
        })
    }
    destroyProducts(id){
        axios.delete(`/api/products/${id}`)
        .then( ()=> {
            let products = this.state.products
            products = products.filter( product => product.id !== id )
            this.setState({ products })
        })
    }

    componentDidMount(){
        axios.get('/api/products')
            .then( res => res.data)
            .then( products => this.setState({products: products}))
    }
    render(){

    const { categories } = this.props.items
    const { destroyCategory } = this.props
    // const { products } = this.props.items
    const {createProducts, destroyProducts} = this
    return (
        <ul>
            {
                categories.map( (category) => {
                    return (
                        <div key={ category.id }>
                        <li> {category.name} <button type ="submit" onClick={ () => createProducts(category.id)}>+</button> <button onClick={ () => destroyCategory(category.id)}>x</button> </li>
                        <ul>
                        {
                            this.state.products.filter( (product) => product.categoryId === category.id).map( (product) => {
                                return (
                                    <li key={product.id}>{product.name} <button type ="submit" onClick={() => destroyProducts(product.id)}>x</button></li>
                                )
                            })
                        }
                        </ul>
                        </div>
                    )
                })
            }
        </ul>
    )
    }
}

export default List;
