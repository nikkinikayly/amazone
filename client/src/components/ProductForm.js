import React, { Component } from 'react';
// import { Form } from 'semantic-ui-react';

class ProductForm extends Component {
  defaultValues = { name: '', description: '', price: '', stock: ''}
  state = {...this.defaultValues}

  componentDidMount() {
    if(this.props.id) {
      this.setState({...this.props})
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({ [name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const product = { ...this.state }
    this.props.submit(product)
    this.setState({ ...this.defaultValues })
  }

  render (){
    return(
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          required
        />
           <input
          name="price"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handleChange}
          required
        />
           <input
          name="stock"
          placeholder="Stock"
          value={this.state.stock}
          onChange={this.handleChange}
          required
        />
        <button>Submit</button>
      </form>
    )
  }
}

export default ProductForm;