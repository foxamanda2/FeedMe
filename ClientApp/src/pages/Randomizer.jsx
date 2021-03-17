import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// function RandomRest(props) {
//   return (
//     <section className="RandomRest">
//       <a href="https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic">
//         <h2>{props.name}</h2>
//       </a>
//       <p>$$</p>
//       <p>
//         This urban spot serves all kinds of all vegan comfort food. From mac and
//         cheese to a philly cheese steak made from impossible meat, you are sure
//         to find something delicious.
//       </p>
//       <address> 803 N Tampa St, Tampa, Florida 33602</address>
//       <p>(786) 681-1644</p>
//       <p>Hours: 11am-4pm</p>
//       <div className="stars">
//         <span style={{ '--rating': 4.7 }}></span>(2)
//       </div>
//     </section>
//   )
// }
export function Randomizer() {
  const [randRestaurant, setRandRestaurants] = useState([])
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
          <button
            className="Random"
            // onClick={function (event) {
            //   setDietTypes()
            // }}
          >
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
          <span style={{ '--rating': 4.7 }}></span>(2)
        </div>
      </section>
      {/* <article>
        <p className="Map">Map</p>
      </article> */}
      {/* <footer>
        <Link to="/">Go Home</Link>
      </footer> */}
    </>
  )
}
