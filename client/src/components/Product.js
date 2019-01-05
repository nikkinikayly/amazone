import React from 'react'
import axios from 'axios'
import ProductForm from './ProductForm';
import Reviews from './Reviews';
import { Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  state = { product: {}, edit: false }

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ product: res.data })
      })
  }

  toggleEdit = () => {
    this.setState(state => {
      return { edit: !this.state.edit }
    })
  }

  showProduct = () => {
    const { product: { name, description, price, stock } } = this.state
    return (
      <div style={{padding:'5px}'}}>
        <Header as="h2" color="purple">Product name: {name} </Header>
        <Header as="h3" color="blue">Description product: {description}</Header>
        <Header as="h4" color="blue">Price product: ${price}</Header>
        <Header as="h4" color="blue">QTY product: {stock}</Header>
      </div>
    )
  }


  edit = () => {
    return <ProductForm  {...this.state.product}  submit={this.submit}/>
  }

  submit = (product) => {
    axios.put(`/api/departments/${product.department_id}/products/${product.id}`, product)
    .then(res => {
      this.setState({ product: res.data, edit: false })
    })
  }

render() {
    const { edit } = this.state
    return (
        <div style={{textAlign: 'center'}}>
        <Segment style={{margin: '15px'}}>
            {edit ? this.edit() : this.showProduct()}
            <div style={{margin: '15px'}}>
            <button onClick={this.toggleEdit}>{ edit? 'Cancel' : 'Edit Product'}</button>
            </div>
        </Segment>
        <Segment>
            <Link to={`/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}/reviews/`}>View Reviews</Link>
        </Segment>
        </div>
    )
}
}
export default Product;