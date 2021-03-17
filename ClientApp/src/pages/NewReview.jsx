import React, { useState } from 'react'

function NewReviewModal(props) {
  return <div className="review-modal">You pressed me</div>
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
