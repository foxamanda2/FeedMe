import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import format from 'date-fns/format'

export function Reviews() {
  const params = useParams()

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
      <section className="allReviews">
        <h1>{restaurantReview.name}</h1>
        <ul className="reviews">
          {restaurantReview.reviews.map(function (reviews) {
            return (
              <li key={reviews.id}>
                <div className="summary">{reviews.summary}</div>
                <span className="stars" style={{ '--rating': 4.7 }}>
                  ({reviews.stars})
                </span>
                <div className="body">{reviews.body}</div>
                {reviews.created ? (
                  <time>{format(new Date(reviews.created), dateFormat)}</time>
                ) : (
                  <div>{reviews.created}</div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
