import React from 'react'

export function NewReview() {
  return (
    <>
      <p>New Review</p>
      <textarea type="text" placeholder="Summary" name="Summary" />

      <textarea type="text" placeholder="Review Body" name="Review Body" />
      <p>Created at:</p>
    </>
  )
}
