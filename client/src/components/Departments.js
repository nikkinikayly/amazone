import React from 'react';
import { Link, } from 'react-router-dom';
import { Header, Segment, Button, Icon, Card, Grid } from 'semantic-ui-react';
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
    return <DepartmentForm submit={this.submit} />
  };

  submit = (department) => {
    axios.post(`/api/departments`, { department })
        .then(res => {
          this.setState({ departments: [res.data, ...this.state.departments], showForm: false})
        })
  };

  deleteDepartment = (id) => {
    axios.delete(`/api/departments/${id}`)
        .then(res => {
          const {departments} = this.state;
          this.setState({departments: departments.filter(t => t.id !== id)})
        });
  };

  renderDepartments = () => {
    return this.state.departments.map (b => {
      return (
            <Grid.Column key={b.id}>
              <Card>
                <Card.Content>
                  <Link to={`/departments/${b.id}`}>
                    <Header as= 'h3'>{b.title}</Header>
                  </Link>
                </Card.Content>
                <Card.Content>
                  <Button
                      icon
                      color="purple"
                      size="small"
                      onClick={() => this.deleteDepartment(b.id)}
                      style={{marginLeft: "16px"}}>
                      <Icon name="trash" />
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          )
      })
  };

  render() {
    const {showForm} = this.state;
    return (
      <div style={{margin: '15px'}}>
        <Segment style={{textAlign:'center'}}>
            <Header as="h1">Departments</Header>
        </Segment>
        <Segment style={{textAlign:'center'}}>
          <Button onClick={this.toggleForm} >
            <Icon name={showForm ? 'minus' : 'add'} />
            Add Department
          </Button>
          { showForm ? this.form() : ''}
        </Segment>
        <div>
          <Grid columns="four">
          { this.renderDepartments() }
          </Grid>
        </div>
      </div>
    )
  }

}


export default Departments;