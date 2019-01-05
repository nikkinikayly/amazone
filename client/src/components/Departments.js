import React from 'react';
import Department from './Department';
import DepartmentForm from './DepartmentForm';
import { Link, } from 'react-router-dom';
import {  Button, Item, Icon  } from 'semantic-ui-react';
import axios from 'axios';

class Departments extends React.Component {
    state = { departments: [], };

  componentDidMount() {
    axios.get('/api/departments')
      .then( res => this.setState({ departments: res.data, }));
  }

  renderBoards = () => {
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
  }

  render() {
    return (
      <div>
        <h1>departments</h1>
        <br />
        <Link to="/departments/new">
          <Button >
            <Icon title='add' />
            Add Department
          </Button>
        </Link>
        <br />
        
        <Item>
          { this.renderDepartments() }
        </Item>
      </div>
    )
  }

}



export default Departments;