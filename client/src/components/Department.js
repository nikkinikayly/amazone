import React from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';
import { Segment } from 'semantic-ui-react';
import ProductForm from './ProductForm';
import Products from './Products';

class Department extends React.Component {
  state = { department: {}, products: [], edit: false, showForm: false, }
    
  componentDidMount() {
      axios.get(`/api/departments/${this.props.match.params.id}`)
      .then(res => {
          this.setState({ department: res.data })
      });
      axios.get(`/api/departments/${this.props.match.params.id}/products`)
      .then(res => {
          this.setState({ products: res.data })
      })
  }

  toggleEdit = () => {
      this.setState(state => {
          return { edit: !this.state.edit }
      })
  }

  showDepartment = () => {
      const { department: { title } } = this.state
      return (
          <div style={{padding: '5px'}}>
              <h1>{title}</h1>
          </div>
      )
  }

  edit = () => {
      return <DepartmentForm {...this.state.department} submit={this.submit} />
  }

  submit = (department) => {
      axios.put(`/api/departments/${this.props.match.params.id}`, { department })
      .then(res => {
          this.setState({ department: res.data, edit: false})
      })
  }

  toggleForm = () => {
      this.setState( state => {
          return { showForm: !state.showForm}
      })
  }

  form = () => {
      return <ProductForm submit={this.submit} />
  }


  render() {
      const { edit } = this.state
      return (
          <div style={{textAlign: 'center'}}>
          <Segment style={{margin: '15px'}}>
              {edit ? this.edit() : this.showDepartment()}
              <button onClick={this.toggleEdit}>{ edit? 'Cancel' : 'Edit Department'}</button>
          </Segment>
          <Segment>
              {/* <Link to={`/departments/${this.props.match.params.id}/products/`}>View Products</Link> */}
              <Products products={this.state.products} id={this.state.department.id}/>
          </Segment>
          </div>
      )
  }

  }



export default Department;