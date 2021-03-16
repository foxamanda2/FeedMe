import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Reviews() {
  const params = useParams()

  console.log(params)

  const [restaurantReview, setRestaurantReview] = useState({
    name: '',
    telephone: '',
    reviews: [
      {
        summary: '',
        body: '',
        stars: '',
      },
    ],
  })
  const id = Number(params.id)

  useEffect(() => {
    async function fetchRestaurant() {
      const response = await fetch(`/api/Restaurants/${id}`)
      const apiData = await response.json()

      setRestaurantReview(apiData)
    }
    fetchRestaurant()
  }, [id])

  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
  return (
    <>
      <h1>{restaurantReview.name}</h1>

      <ul className="reviews">
        {restaurantReview.reviews.map(function (review) {
          return (
            <li>
              <div className="stars">
                <span style={{ '--rating': 4.7 }}></span>(2)
              </div>
              <div className="summary">{review.summary}</div>
              <div className="body">{review.body}</div>
              <div className="created">{review.created}</div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
