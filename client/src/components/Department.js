import React from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';
import Departments from './Departments';
import { Header, Button, } from 'semantic-ui-react';
import { Link, } from 'react-router-dom';

class Department extends React.Component {
    state = { department: {}, departments: [], };

    componentDidMount() {
      const { id, } = this.props.match.params;
      axios.get(`/api/departments/${id}`)
        .then( res => this.setState({ department: res.data, }))
      axios.get(`/api/departments/${id}/departments`)
        .then( res => this.setState({ departments: res.data, }))
    }
  
    handleDelete = (id) => {
      const remove = window.confirm("Are you sure you want to delete this department?")
      if (remove)
        axios.delete(`/api/departments/${id}`)
          .then( res => this.props.history.push('/departments'))
    }
  
    renderDepartments = () => {
      return this.state.departments.map( i => (
        <Department key={i.id} {...i} remove={this.removeDepartment} update={this.updateDepartment}/>
      ))
    }
  
    updateDepartment = (id) => {
      const bId = this.props.match.params.id;
      axios.put(`/api/departments/${bId}/departments/${id}`)
        .then( res => {
          const departments = this.state.departments.map( t => {
            if (t.id === id)
              return res.data;
            return t;
          });
          this.setState({ departments });
        })
    }
  
    removeDepartment = (id) => {
      const remove = window.confirm("Are you sure you want to delete this department?");
      const bId = this.props.match.params.id;
      if (remove)
        axios.delete(`/api/department/${bId}/departments/${id}`)
          .then( res => {
            const departments = this.state.departments.filter( i => {
              if (i.id !== id) 
                return i;  
              return null;
            });
            this.setState({ departments, });
          })
    }
  
    addDepartment = (department) => {
      axios.post(`/api/departments/${this.props.match.params.id}/departments`, { department })
        .then(res => {
          this.setState({ departments: [res.data, ...this.state.departments], showForm: false})
        })
    }
  
  
    DepartmentForm = () => {
      return <DepartmentForm add={this.addList} />
    }
  
    toggleForm = () => {
      this.setState(state => {
        return { showForm: !state.showForm }
        })
    }
  
  
    render () {
      const { department: { id, title, }, showForm } = this.state;
      return (
        <div>
          <Header >{title}</Header>
            <div>
              <Link to={`/departments/${id}/edit`}>
                <Button 
                 
                  icon='edit' 
                />
              </Link>
              <Button 
                onClick={() => this.handleDelete(id)}
              />
            </div>
          <br />
          <div>
            <Button onClick={this.toggleForm.params}  >{ showForm ? 'hide' :'Add department'}</Button>
            {showForm ? this.departmentForm() : this.renderDepartments()}
          </div>
        </div>
      )
    }
  
  }



export default Department;