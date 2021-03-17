import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function NewReviewModal() {
  const params = useParams()
  const id = Number(params.id)

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
    reviews: [],
  })

  const [newReview, setNewReview] = useState({
    summary: '',
    body: '',
    stars: 0,
    restaurantId: id,
  })

  useEffect(() => {
    async function fetchRestaurant() {
      const response = await fetch(`/api/Restaurants/${id}`)
      const apiData = await response.json()

      setRestaurant(apiData)
    }

    fetchRestaurant()
  }, [id])

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
    setNewReview({
      ...newReview,
      body: '',
      summary: '',
      stars: 0,
    })
  }

  console.log(newReview)

  return (
    <div className="review-modal">
      <form className="newReview">
        <p>New Review:{restaurant.name}</p>

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

        <fieldset>
          <input
            id="star-rating=1"
            type="radio"
            name="stars"
            checked={newReview.stars === 1}
            onChange={() => handleStarButton(4)}
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
          <a href="/all">
            <p className="home">Back</p>
          </a>
        </fieldset>
      </form>
    </div>
  )
}
export function NewReview() {
  const [userPressedNew, setUserPressedNew] = useState(false)

  return (
    <>
      {userPressedNew ? <NewReviewModal /> : <></>}
      <button
        onClick={function (event) {
          event.preventDefault()

          setUserPressedNew(true)
        }}
      >
        New Review Here
      </button>
    </>
  )
}
