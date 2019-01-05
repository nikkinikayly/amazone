import React from 'react'
import axios from 'axios'
import ProductForm from './ProductForm';
import Reviews from './Reviews';

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
      <div>
        <h1>Product name: {name}</h1>
        <h3>Description product: {description}</h3>
        <h3>Price product: {price} Price</h3>
        <h3>QTY product: {stock}</h3>
      </div>
    )
  }

  edit = () => {
    return <ProductForm  {...this.state.product}  submit={this.submit}/>
  }

  submit = (product) => {
    axios.put(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.id}`)
    .then(res => {
      this.setState({ product: res.data, edit: false })
    })
  }

  render() {
    const { edit } = this.state
    return (
      <div>
        {edit ? this.edit() : this.showProduct()}
        <button onClick={this.toggleEdit}>{ edit ? 'Cancel' : 'Edit' }</button>
        <Reviews {...this.props} />
      </div>
    )
  }

}

export default Product