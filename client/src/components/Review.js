import React from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

class Review extends React.Component {
    state = { review: {}, edit: false, showForm: false };

    componentDidMount() {
        axios.get(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ review:res.data })
          })
      }

      toggleEdit = () => {
        this.setState(state => {
            return { edit: !this.state.edit }
        })
    };

    changeRating = ( rating ) => {
      let review = this.state.review;
      review.stars = rating;
      this.setState(review)
    //  todo: update review within DB
    };

    showReview = () => {
        const { review: { subject, body, stars, date } } = this.state;
        return (
            <div>
                <h1>{subject}</h1>
                <p>{body}</p>
                <p>{stars}</p>
                <p>{date}</p>
            </div>
        )
    };

    edit = () => {
        return <ReviewForm {...this.state.review} submit={this.submit} />
    };

    submit = (review) => {
        axios.put(`/api/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews/${this.props.match.params.id}`, {review})
        .then( res => {
            this.setState({ review: res.data, edit: false })
        })
    };

    render () {
        const { review: { subject, body, stars, date } } = this.state;
        return (
            <div style={{textAlign:'center'}}>
                <Segment>
                <h1>{subject}</h1>
                <p>{body}</p>
                {/*<p>{stars}</p>*/}
                <StarRatings
                  rating={stars}
                  // changeRating={this.changeRating}
                  starRatedColor="purple"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                />
                <p>{date}</p>
                <button><Link to={`/departments/${this.props.match.params.department_id}/products/${this.props.match.params.product_id}/reviews`}>Back to Reviews</Link></button>
                </Segment>
                <Segment>
                    <h1>Edit Form Here</h1>
                <ReviewForm key={this.state.review.id} {...this.state.review} submit={this.submit}/>
                </Segment>
            </div>
        )
    }
}

export default Review;