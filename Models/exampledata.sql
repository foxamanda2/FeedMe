 TRUNCATE TABLE "Restaurants", "Reviews" RESTART IDENTITY;
 TRUNCATE TABLE "RestaurantDietTypes" RESTART IDENTITY;


INSERT INTO "Restaurants" ("Name", "Description", "Address", "PhoneNum", "TypeOfFood", "PriceRange", "DietaryMenu", "Website","OpenLate","OpenEarly") VALUES ('Cali Bowl: South Tampa', 'A hip restaurant that promotes sustainable food as well as acceptance for all diets.', '217 S Dale Mabry Hwy, Tampa, FL 33609', '(813) 305-2473','American Latin','$$', true, 'https://www.eatatcali.com/',false, false);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "PhoneNum", "TypeOfFood", "PriceRange", "DietaryMenu", "Website","OpenLate","OpenEarly") VALUES ('Farmacy Vegan Kitchen + Bakery', 'This urban spot serves all kinds of all vegan comfort food. From mac and cheese to a philly cheese steak made from impossible meat, you are sure to find something delicious.', '803 N Tampa St, Tampa, Florida 33602', '(786) 681-1644','Comfort Food','$$', true, 'https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic',false, false);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "PhoneNum", "TypeOfFood", "PriceRange", "DietaryMenu", "Website","OpenLate","OpenEarly") VALUES ('Sweet Soul SoHo', 'A little hole in the wall located in SoHo, this smoothie bowl spot is a must try for those with a sweet tooth wanting to stay healthy. They have superfood smoothies, bowls, vegan soft serve, and even vegan nutella.', '1101 S Howard Ave, Tampa, FL 33606', '(813) 575-7100','Dessert','$$', true, 'https://www.ilovesweetsoul.com/',false, true);
INSERT INTO "Restaurants" ("Name", "Description", "Address", "PhoneNum", "TypeOfFood", "PriceRange", "DietaryMenu", "Website","OpenLate","OpenEarly") VALUES ('Dharma Fine Vittles: Tampa', 'Located inside an modern urban food court this spot is a must try. They have all kinds of gourmet comfort foods. Their mac and cheese is to die for. ', '1910 N Ola Ave Suite 113, Tampa, FL 33602', '(813) 803-9998','Comfort','$$', true, 'https://dharmafinevittles.com/',true, true);

INSERT INTO "Reviews" ("RestaurantId", "Created", "Summary", "Body", "Stars") VALUES (1, '2021-03-12 14:23:55', 'Great Variety', 'This food not only tastes healthy, but it also has a great variety for everyone!', 5);
INSERT INTO "Reviews" ("RestaurantId", "Created", "Summary", "Body", "Stars") VALUES (1, '2021-03-12 18:23:55', 'Diet Friendly', 'As soon as you order your food the waiter asks you if you have any dietary restrictions. They do a great job at making their ingridients clear on the menu.', 5);

-- VALUES ('Dharma Fine Vittles: Tampa', 'Located inside an modern urban food court this spot is a must try. They have all kinds of gourmet comfort foods. Their mac and cheese is to die for. ', '1910 N Ola Ave Suite 113, Tampa, FL 33602', '(813) 803-9998','Comfort','$$', true, 'https://dharmafinevittles.com/',true, true);

INSERT INTO "Diets" ( "Diet") VALUES ('Vegan');
INSERT INTO "Diets" ( "Diet") VALUES ('Gluten Free');
INSERT INTO "Diets" ( "Diet") VALUES ('Vegetarian');

INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (1,1);
INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (2,1);
INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (3,1);

INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (1,2);

INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (1,3);

INSERT INTO "RestaurantDietTypes" ("DietTypeId", "RestaurantId") VALUES (1,4);

    --           {
    --   id: 1,
    --   name: 'Cali Bowl: South Tampa',
    --   description:
    --     'A hip restaurant that promotes sustainable food as well as acceptance for all diets.',
    --   address: '217 S Dale Mabry Hwy, Tampa, FL 33609',
    --   phoneNum: '(813) 305-2473',
    --   typeOfFood: 'American Latin',
    --   priceRange: '$$',
    --   dietaryMenu: true,
    --   website: 'https://www.eatatcali.com/',
    --   openLate: false,
    --   openEarly: false,
    -- },
    -- {
    --   id: 2,
    --   name: 'Farmacy Vegan Kitchen + Bakery',
    --   description:
    --     'This urban spot serves all kinds of all vegan comfort food. From mac and cheese to a philly cheese steak made from impossible meat, you are sure to find something delicious.',
    --   address: '803 N Tampa St, Tampa, Florida 33602',
    --   phoneNum: '(786) 681-1644',
    --   typeOfFood: 'Comfort',
    --   priceRange: '$$',
    --   dietaryMenu: true,
    --   website:
    --     'https://farmacyvegankitchen.com/?utm_source=GMBlisting&utm_medium=organic',
    --   openLate: false,
    --   openEarly: false,
    -- },