import React from 'react';
// import { Form, Button, Select } from 'semantic-ui-react';

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
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                name="subject"
                placeholder="Subject"
                value={this.state.subject}
                onChange={this.handleChange}
                />
                <input 
                type="textArea"
                name="body"
                placeholder="Review"
                value={this.state.body}
                onChange={this.handleChange}
                />
                <input 
                name="stars"
                placeholder="Stars"
                value={this.state.stars}
                onChange={this.handleChange}
                />
                <input 
                name="date"
                placeholder="Date"
                value={this.state.date}
                onChange={this.handleChange}
                />
                <button>Submit</button>
            </form>
        )
    }
};

export default ReviewForm;