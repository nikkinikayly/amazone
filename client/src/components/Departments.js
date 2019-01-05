import React from 'react';
import { Link, } from 'react-router-dom';
import {  Button, Item, Icon, Divider  } from 'semantic-ui-react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';


class Departments extends React.Component {
    state = { departments: [], showForm: false };

  componentDidMount() {
    axios.get('/api/departments')
      .then( res => this.setState({ departments: res.data, }));
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm}
    })
  };

  form = () => {
    return <DepartmentForm addDepartment={this.addDepartment} />
  };

  addDepartment = (title) => {
    axios.post(`/api/departments`, { title })
        .then(res => {
          this.setState({ departments: [res.data, ...this.state.departments], showForm: false})
        })
  };

  renderDepartments = () => {
    return this.state.departments.map (b => (
      <Item key={b.id}>
        <div>
          <Link to={`/departments/${b.id}`}>
          </Link>
        </div>
        <Item.Content>
          <Item.Header>{b.title}</Item.Header>
        </Item.Content>
      </Item>
    ))
  };

  render() {
    const {showForm} = this.state;
    return (
      <div>
        <h1>Departments</h1>
        <Divider/>
          <Button onClick={this.toggleForm} >
            <Icon name={showForm ? 'minus' : 'add'} />
            Add Department
          </Button>
          { showForm ? this.form() : ''}
        <Divider/>
        <Item>
          { this.renderDepartments() }
        </Item>
      </div>
    )
  }

}


export default Departments;