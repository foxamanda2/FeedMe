import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export function Restaurant() {
  return (
    <>
      <div className="Restaurants">
        <div className="Search">
          <input type="Text" placeholder="Search" />
        </div>
        <section>
          <a href="https://www.eatatcali.com/">
            <h2>Cali Bowl: South Tampa</h2>
          </a>
          <p>$$</p>
          <p>
            A hip restaurant that promotes sustainable food as well as
            acceptance for all diets.
          </p>
          <address> 217 S Dale Mabry Hwy, Tampa, FL 33609</address>
          <p>(813) 305-2473</p>
          <p>Hours: 10am-9pm</p>
          <button>Leave a Review</button>
        </section>
        <section>
          <a href="https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic">
            <h2>Farmacy Vegan Kitchen + Bakery</h2>
          </a>
          <p>$$</p>
          <p>
            This urban spot serves all kinds of all vegan comfort food. From mac
            and cheese to a philly cheese steak made from impossible meat, you
            are sure to find something delicious.
          </p>
          <address> 803 N Tampa St, Tampa, Florida 33602</address>
          <p>(786) 681-1644</p>
          <p>Hours: 11am-4pm</p>
          <button>Leave a Review</button>
        </section>
        <section>
          <a href="https://www.ilovesweetsoul.com/">
            <h2>Sweet Soul SoHo</h2>
          </a>
          <p>$$</p>
          <p>
            A little hole in the wall located in SoHo, this smoothie bowl spot
            is a must try for those with a sweet tooth wanting to stay healthy.
            They have superfood smoothies, bowls, vegan soft serve, and even
            vegan nutella.
          </p>
          <address> 1101 S Howard Ave, Tampa, FL 33606</address>
          <p>813) 575-7100</p>
          <p>Hours: 9am-9pm</p>
          <button>Leave a Review</button>
        </section>
      </div>
    </>
  )
}
