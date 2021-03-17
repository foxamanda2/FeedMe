import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NewReviewModal(props) {
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')

  function submitNewReview(event) {
    event.preventDefault()

    console.log(`Make new thing ${summary} ${body}`)
  }

  return (
    <div className="review-modal">
      <form className="newReview">
        <p>New Review</p>

        <fieldset>
          <input
            name="summary"
            type="text"
            placeholder="Title"
            value={summary}
            onChange={function (event) {
              setSummary(event.target.value)
            }}
          />
        </fieldset>

        <fieldset>
          <input
            name="body"
            type="text"
            placeholder="Review"
            value={body}
            onChange={function (event) {
              setBody(event.target.value)
            }}
          />
        </fieldset>

        <fieldset>
          <div className="stars">
            <span style={{ '--rating': 4.7 }}></span>(2)
          </div>
        </fieldset>

        <fieldset>
          <div>Created at</div>
        </fieldset>

        <fieldset>
          <Link to="#">
            <button className="submit" onClick={submitNewReview}>
              Submit
            </button>
          </Link>
        </fieldset>

        <fieldset>
          <a href="/" className="home">
            Home
          </a>
        </fieldset>
      </form>
    </div>
  )
}
export function NewReview() {
  const [userPressedNew, setUserPressedNew] = useState(true)

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
