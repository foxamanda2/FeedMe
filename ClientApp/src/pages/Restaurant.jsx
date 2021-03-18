import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NewReviewModal } from './NewReview'

function SingleRestaurantFromList(props) {
  const [userPressedNew, setUserPressedNew] = useState(false)

  const restaurant = props.restaurant

  function closeModal() {
    setUserPressedNew(false)
  }

  return (
    <li key={restaurant.id}>
      <a href={restaurant.website}>
        <h2>{restaurant.name}</h2>
      </a>
      <p>
        <Link className="button" to={`/restaurants/${restaurant.id}/edit`}>
          Edit
        </Link>
      </p>
      <p>$$</p>
      <p>{restaurant.description}</p>
      <address> {restaurant.address}</address>
      <p>{restaurant.phoneNum}</p>
      <p>
        Dietary Menu:
        <input type="checkbox" checked={restaurant.dietaryMenu} readOnly />
      </p>
      <p className="stars">
        <Link to={`/restaurants/${restaurant.id}`}>
          <span style={{ '--rating': 4.7 }}></span>({restaurant.reviews.length})
        </Link>
      </p>
      {userPressedNew ? (
        <NewReviewModal closeModal={closeModal} restaurant={restaurant} />
      ) : (
        <></>
      )}
      <button
        onClick={function (event) {
          event.preventDefault()

          setUserPressedNew(true)
        }}
      >
        New Review
      </button>
    </li>
  )
}

export function Restaurant() {
  const [restaurants, setRestaurants] = useState([])
  const [dietTypes, setDietTypes] = useState([])
  const [filterText, setFilterText] = useState('')

  // Search parameters
  const [selectedDiet, setSelectedDiet] = useState('')
  const [typeOfFood, setTypeOfFood] = useState('')

  // const params = useParams()
  // const id = params.id

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

  useEffect(() => {
    async function fetchDietType() {
      const url = '/api/DietTypes'

      const response = await fetch(url)
      const json = await response.json()

      setDietTypes(json)
    }

    fetchDietType()
  }, [])

  return (
    <>
      <div className="Restaurants">
        <select
          value={selectedDiet}
          onChange={function (event) {
            setSelectedDiet(event.target.value)
          }}
        >
          <option value="">Diet Type</option>
          {dietTypes.map(function (diet) {
            return (
              <option key={diet.id} value={diet.diet}>
                {diet.diet}
              </option>
            )
          })}
        </select>
        <select>
          <option value="">Hours</option>
          <option value="true">Open Early</option>
          <option value="true">Open Late</option>
        </select>
        <select
          value={typeOfFood}
          onChange={function (event) {
            setTypeOfFood(event.target.value)
          }}
        >
          <option value="">Type Of Food</option>
          {restaurants.map(function (type) {
            return (
              <option key={type.id} value={type.typeOfFood}>
                {type.typeOfFood}
              </option>
            )
          })}
        </select>
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
                restaurant={restaurant}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}
