import React from 'react';
import { Form, Button, Select } from 'semantic-ui-react';

class ReviewForm extends React.Component {
    defaultValues = { subject: '', body: '', stars: '', date: '' };
    state = { subject: '', body: '', stars: '', date: '' };

    componentDidMount() {
        if (this.props.id) {
            this.setState({...this.props})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const review = {...this.state}
        this.props.submit(review)
        this.setState({...this.defaultValues})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value, })
    }

    render () {
        const starOptions = [
            {key: '1', text: '1', value: '1'},
            {key: '2', text: '2', value: '2'},
            {key: '3', text: '3', value: '3'},
            {key: '4', text: '4', value: '4'}
        ]
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Subject</label>
                    <input 
                    name="subject"
                    placeholder="Subject"
                    value={this.state.subject}
                    onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.TextArea>
                    <label>Body</label>
                    <input 
                    type=""
                    name="body"
                    placeholder="Your Review Here"
                    value={this.state.body}
                    onChange={this.handleChange} 
                    />
                    </Form.TextArea>
                    <Button type='submit'>Submit</Button>
                    <Form.Field
                        control={Select}
                        option={starOptions}
                        label={{ children: 'Stars', htmlFor: 'form-select-control-gender' }}
                        placeholder= 'Stars'
                        name="stars"
                        value={this.state.stars}
                        onChange={this.handleChange}
                    >
                    </Form.Field>
                    <Form.Field>
                    <label>Date</label>
                    <input 
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    onChange={this.handleChange}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
};

export default ReviewForm;