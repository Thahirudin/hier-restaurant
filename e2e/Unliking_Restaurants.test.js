/* eslint-disable no-undef */
const assert = require('assert')

Feature('UnlikingRestaurant')

Before(({ I }) => {
  I.amOnPage('/#/favorit')
})

Scenario('unliking one restaurant', async ({ I }) => {
  I.seeElement('.data-resto');
  I.see('Belum ada Restaurant favorit.', '.no-restaurant-text');
  I.amOnPage('/');

  I.seeElement('resto-list');

  const restaurantName = locate('.card-title h3').first();
  const getRestaurantName = await I.grabTextFrom(restaurantName);

  const detailRestaurantButton = locate('resto-list a').first();
  I.click(detailRestaurantButton);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');

  I.seeElement('resto-list');
  const unlikedRestaurantTitle = await I.grabTextFrom('.card-title h3');

  assert.strictEqual(getRestaurantName, unlikedRestaurantTitle);
  I.seeElement('resto-list');

  I.click(detailRestaurantButton);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  
  I.seeElement('#dataresto');
  I.see('Belum ada Restaurant favorit.', '.no-restaurant-text');
})
