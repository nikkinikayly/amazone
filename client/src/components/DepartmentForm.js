import React from 'react';
import { Form } from 'semantic-ui-react';

class DepartmentForm extends React.Component {
    state = { title: ""};
   
    componentDidMount() {
      if (this.props.id)
        this.setState({ title: this.props.title });
    }
   
    handleSubmit = (e) => {
      e.preventDefault();
      if (this.props.id) {
        this.props.edit({id: this.props.id, ...this.state});
      } else {
        this.props.addDepartment(this.state.title);
      }
      this.setState({ title: "" });
    };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  };

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Title"
            label="Title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <Form.Button>Create New Department</Form.Button>
      </Form>
    )
  }
}

export default DepartmentForm;