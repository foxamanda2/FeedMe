import React from 'react'
import AboutMe from '../AboutMe.jpg'

export function About() {
  return (
    <>
      <div className="about">
        <h1>Our Table</h1>
        <img src={AboutMe} alt="Creator" />
        <p>
          Thank you so much for visiting Feed Me. I made this app with the
          intentions of creating a safe space for people with dietary
          restrictions to find reliable restaurants.
        </p>
        <p>
          I have eaten many meals when creating this full stack website and
          really hope it brings you as much peace as it has me.
        </p>
      </div>
    </>
  )
}
