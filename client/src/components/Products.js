import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import { Button, Icon } from 'semantic-ui-react'
 
class Products extends React.Component {
    state = { products: [], showForm: true }
  
    componentDidMount() {
        axios.get(`/api/departments/${this.props.match.params.department_id}/products`)
        .then( res => {
          this.setState({ products: res.data });
        })
        .catch( err => {
          console.log(err);
        })
    }

    toggleForm = () => {
        this.setState(state => {
          return { showForm: !state.showForm }
        })
      }
    
      form = () => {
        return <ProductForm submit={this.submit} />
      }

      listProducts = () => {
        return this.state.products.map(p => {
          return (
            <div>
              <Link key={p.id} to={`/departments/${this.props.match.params.department_id}/products/${p.id}`}> {p.name} </Link>

              <Button
                       icon
                       color="blue"
                       size="small"
                       onClick={() => this.deleteProduct(p.id)}
                   >
                   <Icon name="trash" />
                   </Button>
            </div>
           )
        })
      }

      submit = (product) => { 
        axios.post(`/api/departments/${this.props.match.params.department_id}/products`, {product})
          .then( res => {
            const { products } = this.state
            this.setState({ products: [...products, res.data]})
          })
          .catch( err => {
            console.log(err)
          })
      }

      deleteProduct = (id) => {
        axios.delete(`/api/departments/${this.props.match.params.department_id}/products/${id}`)
        .then ( res => {
            const { products } = this.state
            this.setState({ products: products.filter( t => t.id===!id )})
        } )
    }
    

    render () {
        const { showForm } = this.state
        return (
            <div>
                <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show'}</button>
                {showForm ? this.form() : this.listProducts()}
            </div>
        )
    }
};


export default Products;


