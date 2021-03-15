import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SingleRestaurantFromList(props) {
  return (
    <li key={props.id}>
      <a href={props.website}>
        <h2>{props.name}</h2>
      </a>
      <p>$$</p>
      <p>{props.description}</p>
      <address> {props.address}</address>
      <p>{props.phoneNum}</p>
      <p className="stars">
        <span style={{ '--rating': 4.7 }}></span>({props.reviewCount})
      </p>
      <button>Leave a Review</button>
    </li>
  )
}

export function Restaurant() {
  const [restaurants, setRestaurants] = useState([])

  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    async function fetchRestaurants() {
      const url =
        filterText.length === 0
          ? '/api/Restaurants'
          : `/api/Restaurants?filter=${filterText}`

      const response = await fetch(url)
      const json = await response.json()

      setRestaurants(json)
    }

    fetchRestaurants()
  }, [filterText])

  return (
    <>
      <div className="Restaurants">
        <div className="Search">
          <input
            type="Text"
            placeholder="Search"
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />
          <Link to="/new">
            <button>Add Restaurant</button>
          </Link>
        </div>
        <ul className="results">
          {restaurants.map(function (restaurant) {
            return (
              <SingleRestaurantFromList
                key={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                address={restaurant.address}
                phoneNum={restaurant.phoneNum}
                website={restaurant.website}
                reviewCount={restaurant.reviews.length}
                // Should display open late, early, and dietary menu
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}
