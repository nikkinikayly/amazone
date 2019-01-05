import React from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import {Header, Segment, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class Reviews extends React.Component {
    state = { reviews: [], showForm: false, edit: false }

    componentDidMount() {
        axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews`)
        .then(res => {
            this.setState({ reviews: res.data })
        })
    }

    toggleForm = () => {
        this.setState( state => {
            return { showForm: !state.showForm }
        } )
    }

    edit = () => {
        return <ReviewForm {...this.state.review} submit={this.submit} />
    }

    form = () => {
        return <ReviewForm submit={this.submit} />
    }

    submit = (review) => {
        axios.post(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews`, {review})
        .then( res => {
            this.setState({reviews: [res.data, ...this.state.reviews], showForm: false})
        })
    }

    renderReviews = () => {
        return this.state.reviews.map(p => {
            return (
                <div key={p.id}>
                    <Segment style={{textAlign: 'left'}}>
                        <Header as="h2">{p.subject}</Header>
                        <Header as="h3">Stars: {p.stars}</Header>
                        <p>{p.body}</p>
                        <p style={{color: 'grey'}}>{p.date}</p>
                    <Button>
                        <Link to={`/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews/${p.id}`}>
                        Edit
                        </Link>
                    </Button>
                    <Button
                        icon 
                        color="red"
                        size="small"
                        onClick={() => this.deleteReview(p.id)}
                    >
                    <Icon name="trash" />
                    </Button>
                    </Segment>
                    </div>
            )
        })
    }

    deleteReview = (id) => {
        axios.delete(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews/${id}`)
        .then ( res => {
            const { reviews } = this.state
            this.setState({ reviews: reviews.filter( t => t.id !== id)})
        } )
    }


    render () {
        const { showForm } = this.state
        return (
            <div style={{textAlign:'center'}}>
            {/* <Header as="h1">{this.props.name}</Header> */}
            <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Add Review' }</button>
            {showForm ? this.form() : this.renderReviews()}
            </div>
        )
    }
};

export default Reviews;