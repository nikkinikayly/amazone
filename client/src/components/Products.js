import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import { Button, Icon, Grid, Card, Header } from 'semantic-ui-react'
 
class Products extends React.Component {
    state = { products: [], showForm: false }
  
    // componentDidMount() {
    //     axios.get(`/api/departments/${this.props.match.params.department_id}/products`)
    //     .then( res => {
    //       this.setState({ products: res.data });
    //     })
    //     .catch( err => {
    //       console.log(err);
    //     })
    // }

    toggleForm = () => {
        this.setState(state => {
          return { showForm: !state.showForm }
        })
      }
    
      form = () => {
        return <ProductForm submit={this.submit} />
      }

      listProducts = () => {
        return this.props.products.map(p => {
          return (
            <div style={{margin: '15px'}}>
               <Grid.Column style={{margin: '15px'}}>
               <div key={p.id}>
                   <Card>
                   <Card.Content>
                       <Header as="h3">
                           <Link
                               to={`products/${p.id}`}
                               >{p.name}</Link>
                       </Header>
                       <p>{p.description}</p>
                       <p>{p.price}</p>
                       <p>{p.stock}</p>
                   </Card.Content>
                   <Card.Content>
                   <Button
                       icon
                       color="purple"
                       size="small"
                       onClick={() => this.deleteProduct(p.id)}
                       style={{marginLeft: "16px"}}
                   >
                       <Icon name="trash" />
                   </Button>
                   </Card.Content>
                   </Card>
               </div>
               </Grid.Column>
            </div>
           )
        })
      }

      submit = (product) => { 
        debugger
        axios.post(`/api/departments/${this.props.id}/products`, {product})
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
            <div style={{margin: '15px'}}>
              <div style={{margin: '15px'}}>
                <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Add Product' }</button>
                </div>
                <div style={{margin: '15px'}}>
                <Grid columns="four">{showForm ? this.form() : this.listProducts()}</Grid>
                </div>
            </div>
        )
    }
};


export default Products;


