import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Stars } from '../components/Stars'

export function Randomizer() {
  // Setting state for Random Restaurants
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

  const params = useParams()

  let id = Number(params.id)

  // search Parameters for Randomizer
  // const [dietTypes, setDietTypes] = useState([])
  // const [selectedDiet, setSelectedDiet] = useState('')
  // const [typeOfFood, setTypeOfFood] = useState('')
  // const [restaurants, setRestaurants] = useState([])

  // useEffect(() => {
  //   async function fetchRestaurant() {
  //     const response = await fetch('/api/Restaurants')

  //     const apiData = await response.json()

  //     setRestaurants(apiData)
  //   }
  //   fetchRestaurant()
  // }, [])

  // Pulling a random restaurant
  useEffect(() => {
    async function fetchRandomRestaurant() {
      let url = '/api/Restaurants/random'
      // url += `?typeOfFood=${typeOfFood}`

      const response = await fetch(url)

      const apiData = await response.json()

      setRandRestaurants(apiData)
    }
    fetchRandomRestaurant()
  }, [id])

  // Handler to select a new random restaurant---Additionally going to add the search parameters
  async function handleRandRestaurant(event) {
    event.preventDefault()

    let url = '/api/Restaurants/random'
    // url += `?typeOfFood=${typeOfFood}`

    const response = await fetch(url)

    const apiData = await response.json()

    setRandRestaurants(apiData)
  }

  //
  // const typesOfFood = [
  //   ...new Set(restaurants.map((restaurant) => restaurant.typeOfFood)),
  // ]

  // useEffect(() => {
  //   async function fetchDietType() {
  //     const url = '/api/DietTypes'

  //     const response = await fetch(url)
  //     const json = await response.json()

  //     setDietTypes(json)
  //   }

  //   fetchDietType()
  // }, [])

  return (
    <>
      <aside>
        {/* <select
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
        </select>*/}
        {/* <select
          value={typeOfFood}
          onChange={function (event) {
            setTypeOfFood(event.target.value)
          }}
        >
          <option value="">Type Of Food</option>
          {typesOfFood.map(function (typeOfFood) {
            return (
              <option key={typeOfFood} value={typeOfFood}>
                {typeOfFood}
              </option>
            )
          })}
        </select> */}

        <footer>
          <button className="Random" onClick={handleRandRestaurant}>
            Randomizer
          </button>
        </footer>
      </aside>

      <section className="RandomRest" key={randRestaurant.id}>
        <a href={randRestaurant.website}>
          <h2>{randRestaurant.name}</h2>
        </a>
        <p>
          {randRestaurant.priceRange} {randRestaurant.typeOfFood}
        </p>
        <p>{randRestaurant.description}</p>
        <address> {randRestaurant.address}</address>
        <p>{randRestaurant.phoneNum}</p>
        <p className="allCheck">
          Dietary Menu:
          <input
            type="checkbox"
            checked={randRestaurant.dietaryMenu}
            readOnly
          />
        </p>
        <Link to={`/restaurants/${randRestaurant.id}`}>
          <Stars restaurant={randRestaurant} />
        </Link>
      </section>
    </>
  )
}
