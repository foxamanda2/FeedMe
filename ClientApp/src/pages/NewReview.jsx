import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Restaurant } from './Restaurant'

export function NewReviewModal(props) {
  const restaurant = props.restaurant

  const [newReview, setNewReview] = useState({
    summary: '',
    body: '',
    stars: 0,
    restaurantId: restaurant.id,
  })

  function handleNewReviewText(event) {
    const name = event.target.name
    const value = event.target.value
    setNewReview({ ...newReview, [name]: value })
  }

  function handleStarButton(newStars) {
    setNewReview({ ...newReview, stars: newStars })
  }

  // console.log(restaurant)

  async function submitNewReview(event) {
    event.preventDefault()

    const response = await fetch('/api/Reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })

    props.closeModal()
  }

  console.log(newReview)

  return (
    <div className="review-modal">
      <form className="newReview">
        <p>Review:</p>
        <p>{restaurant.name} </p>

        <fieldset>
          <input
            name="summary"
            type="text"
            placeholder="Title"
            value={newReview.summary}
            onChange={handleNewReviewText}
          />
        </fieldset>

        <fieldset>
          <textarea
            name="body"
            placeholder="Review"
            value={newReview.body}
            onChange={handleNewReviewText}
          />
        </fieldset>

        <fieldset className="rating">
          <input
            id="star-rating=1"
            type="radio"
            name="stars"
            checked={newReview.stars === 1}
            onChange={() => handleStarButton(1)}
          />
          <input
            id="star-rating=2"
            type="radio"
            name="stars"
            checked={newReview.stars === 2}
            onChange={() => handleStarButton(2)}
          />
          <input
            id="star-rating=3"
            type="radio"
            name="stars"
            checked={newReview.stars === 3}
            onChange={() => handleStarButton(3)}
          />
          <input
            id="star-rating=4"
            type="radio"
            name="stars"
            checked={newReview.stars === 4}
            onChange={() => handleStarButton(4)}
          />
          <input
            id="star-rating=5"
            type="radio"
            name="stars"
            checked={newReview.stars === 5}
            onChange={() => handleStarButton(5)}
          />
        </fieldset>

        {/* <div className="stars">
          <span style={{ '--rating': 4.7 }}></span>(2)
          </div> */}

        <fieldset>
          <Link to="#">
            <button className="submit" onClick={submitNewReview}>
              Submit
            </button>
          </Link>
        </fieldset>

        <fieldset>
          <p className="home" onClick={props.closeModal}>
            Back
          </p>
        </fieldset>
      </form>
    </div>
  )
}
