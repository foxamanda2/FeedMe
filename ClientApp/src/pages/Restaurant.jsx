import React, { useEffect, useState } from 'react'

function SingleRestaurantFromList(props) {
  return (
    <li>
      <a href={props.website}>
        <h2>{props.name}</h2>
      </a>
      <p>$$</p>
      <p>{props.description}</p>
      <address> {props.address}</address>
      <p>{props.phoneNum}</p>
      <button>Leave a Review</button>
    </li>
  )
}

export function Restaurant() {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Cali Bowl: South Tampa',
      description:
        'A hip restaurant that promotes sustainable food as well as acceptance for all diets.',
      address: '217 S Dale Mabry Hwy, Tampa, FL 33609',
      phoneNum: '(813) 305-2473',
      typeOfFood: 'American Latin',
      priceRange: '$$',
      dietaryMenu: true,
      website: 'https://www.eatatcali.com/',
      openLate: false,
      openEarly: false,
    },
    {
      id: 2,
      name: 'Farmacy Vegan Kitchen + Bakery',
      description:
        'This urban spot serves all kinds of all vegan comfort food. From mac and cheese to a philly cheese steak made from impossible meat, you are sure to find something delicious.',
      address: '803 N Tampa St, Tampa, Florida 33602',
      phoneNum: '(786) 681-1644',
      typeOfFood: 'Comfort',
      priceRange: '$$',
      dietaryMenu: true,
      website:
        'https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic',
      openLate: false,
      openEarly: false,
    },
  ])
  return (
    <>
      <div className="Restaurants">
        <button>Add Restaurant</button>
        <div className="Search">
          <input type="Text" placeholder="Search" />
        </div>
        <ul className="results">
          {restaurants.map(function (restaurant) {
            return (
              <SingleRestaurantFromList
                key={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                address={restaurant.address}
                phoneNum={restaurant.phoneNum}
                website={restaurant.website}
              />
            )
          })}
        </ul>
        {/* <li>
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
          </li>
          <li>
            <a href="https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic">
              <h2>Farmacy Vegan Kitchen + Bakery</h2>
            </a>
            <p>$$</p>
            <p>
              This urban spot serves all kinds of all vegan comfort food. From
              mac and cheese to a philly cheese steak made from impossible meat,
              you are sure to find something delicious.
            </p>
            <address> 803 N Tampa St, Tampa, Florida 33602</address>
            <p>(786) 681-1644</p>
            <p>Hours: 11am-4pm</p>
            <button>Leave a Review</button>
          </li>
          <li>
            <a href="https://www.ilovesweetsoul.com/">
              <h2>Sweet Soul SoHo</h2>
            </a>
            <p>$$</p>
            <p>
              A little hole in the wall located in SoHo, this smoothie bowl spot
              is a must try for those with a sweet tooth wanting to stay
              healthy. They have superfood smoothies, bowls, vegan soft serve,
              and even vegan nutella.
            </p>
            <address> 1101 S Howard Ave, Tampa, FL 33606</address>
            <p>813) 575-7100</p>
            <p>Hours: 9am-9pm</p>
            <button>Leave a Review</button>
          </li>
        </ul> */}
      </div>
    </>
  )
}
