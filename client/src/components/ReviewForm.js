import React from 'react';
import StarRatings from 'react-star-ratings';

class ReviewForm extends React.Component {
    defaultValues = { subject: '', body: '', stars: 0, date: '' };
    state = { subject: '', body: '', stars: 0, date: '' };

    componentDidMount() {
        if (this.props.id) {
            this.setState({...this.props})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const review = {...this.state};
        this.props.submit(review);
        this.setState({...this.state})
    };

    changeRating = ( rating ) => {
      this.setState({stars: rating})
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value, })
    };

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
              <StarRatings
                  rating={this.state.stars}
                  changeRating={this.changeRating}
                  starRatedColor="purple"
                  numberOfStars={5}
                  name='start'
                  starDimension="20px"
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
}

export default ReviewForm;