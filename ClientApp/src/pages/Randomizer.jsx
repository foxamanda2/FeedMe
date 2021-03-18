import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Randomizer() {
  const [randRestaurant, setRandRestaurants] = useState({
    id: null,
    name: '',
    description: '',
    address: '',
    phoneNum: '',
    typeOfFood: '',
    priceRange: '',
    dietaryMenu: null,
    website: '',
    openLate: null,
    openEarly: null,
    reviews: [],
  })
  const [dietTypes, setDietTypes] = useState([])

  // search Parameters
  const [selectedDiet, setSelectedDiet] = useState('')
  // const [typeOfFood, setTypeOfFood] = useState('')

  const params = useParams()

  let id = Number(params.id)

  useEffect(() => {
    async function fetchRestaurant() {
      const response = await fetch(`/api/Restaurants/random`)
      const apiData = await response.json()

      setRandRestaurants(apiData)
    }
    fetchRestaurant()
  }, [id])

  async function handleRandRestaurant(event) {
    event.preventDefault()

    const response = await fetch(`/api/Restaurants/random`)
    const apiData = await response.json()

    setRandRestaurants(apiData)
  }

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
      <aside>
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
          <option>Open Early</option>
          <option>Open Late</option>
        </select>
        <select>
          <option>Mexican</option>
          <option>Comfort</option>
        </select>
        <footer>
          {/* Need to create a random Link */}
          <button className="Random" onClick={handleRandRestaurant}>
            Randomizer
          </button>
        </footer>
      </aside>

      <section className="RandomRest" key={randRestaurant.id}>
        {/* <a {randRestaurant.website}> */}
        <h2>{randRestaurant.name}</h2>
        {/* </a> */}
        <p>{randRestaurant.priceRange}</p>
        <p>{randRestaurant.description}</p>
        <address> {randRestaurant.address}</address>
        <p>{randRestaurant.phoneNum}</p>
        <div className="stars">
          <Link to={`/restaurants/${randRestaurant.id}`}>
            <span style={{ '--rating': 4.7 }}></span>
            {randRestaurant.reviews.length}
          </Link>
        </div>
      </section>
    </>
  )
}
