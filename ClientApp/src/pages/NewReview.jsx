import React, { useState } from 'react'

function NewReviewModal(props) {
  return <div className="modal">You pressed me</div>
}
export function NewReview() {
  const [userPressedNew, setUserPressedNew] = useState(true)

  return (
    <>
      {userPressedNew ? <NewReviewModal /> : <> </>}
      <button
        onClick={function (event) {
          event.preventDefault()

          setUserPressedNew(true)
        }}
      >
        New Review
      </button>
    </>
  )
}
