import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import List from './List'

class App extends Component{
    constructor(){
        super()
        this.state = {
            categories: [],
            // products: []
        }
        this.createCategory = this.createCategory.bind(this)
        // this.createProducts = this.createProducts.bind(this)
        this.destroyCategory = this.destroyCategory.bind(this)
    }

    createCategory(){
        axios.post('/api/categories')
        .then( res => res.data )
        .then( category => {
            const categories = this.state.categories
            categories.push(category)
            this.setState({ categories })
        })
    }

    destroyCategory(id){
        axios.delete(`/api/categories/${id}`)
        .then( ()=> {
            let categories = this.state.categories
            categories = categories.filter( category => category.id !== id )
            this.setState({ categories })
        })
    }

    // createProducts(){
    //     console.log('here')
    //     axios.post('/api/products')
    //     .then( res => res.data )
    //     .then( product => {
    //         const products = this.state.products
    //         products.push(product)
    //         this.setState({ products })
    //     })
    // }

    componentDidMount(){
        axios.get('/api/categories')
            .then( res => res.data)
            .then( categories => this.setState({categories: categories}))
        // axios.get('/api/products')
        //     .then( res => res.data)
        //     .then( products => this.setState({products: products}))
    }
    

    render(){
        // const {categories} = this.state
        const {createCategory, destroyCategory} = this
        // const {createProducts} = this
        return (
            <div>
                <h1>Acme Categories and Products by Faker</h1>
                <button onClick={() => createCategory()}> Create Category </button>
                <List items = {this.state} destroyCategory={destroyCategory} />
            </div>
        )
    }
}

export default App
