import React from 'react'
import AboutMe from '../AboutMe.jpg'
import GitHub from '../GitHub.png'
import Linkedin from '../Linkedin.png'

export function About() {
  return (
    <>
      <div className="about">
        <div>
          <h1>
            <a href="https://github.com/foxamanda2">
              <img src={GitHub} alt="GitHub" className="git" />
            </a>
            <a href="https://www.linkedin.com/in/fox-amanda/">
              <img src={Linkedin} alt="Linkedin" className="linkedin" />
            </a>
          </h1>
          <figure>
            <img src={AboutMe} alt="Creator" />
            <figcaption>Creator: Amanda Fox</figcaption>
          </figure>
        </div>
        <p>
          Thank you so much for visiting Feed Me. I made this app with the
          intentions of creating a safe space for people with dietary
          restrictions to find reliable restaurants.
        </p>

        <p>
          I am a recent graduate from Suncoast Developers Guild. I love solving
          problems in a creative and effective way. What inspires me is
          minimalist design with a focus in user interface.
        </p>

        <p>
          I have eaten many meals when creating this full stack website and
          really hope it brings you as much peace as it has me.
        </p>
      </div>
    </>
  )
}
