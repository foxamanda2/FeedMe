import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function Reviews() {
  const params = useParams()

  console.log(params)

  const [restaurant, setRestaurant] = useState({
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

      setRestaurant(apiData)
    }
    fetchRestaurant()
  }, [id])

  console.log(restaurant)

  const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`
  return (
    <>
      <h1>{restaurant.name}</h1>
      <div className="stars">
        <span style={{ '--rating': 4.7 }}></span>(2)
      </div>
      <p>lipsum asdarhwlkutlkglasgFLJSAGFKAJSGF</p>
      <p>Paragraph herekjzehfslkajhfsalkhglaskhg</p>
      <p>Created at: 8237198264</p>
    </>
  )
}
