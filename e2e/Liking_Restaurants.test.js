const assert = require('assert');
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorit');
});
Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#dataresto');
  I.see('Belum ada Restaurant favorit.', '.no-restaurant-text');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('resto-list', 10)
  I.seeElement('resto-list');

  const restaurantName = locate('.card-title h3').first();
  const getRestaurantName = await I.grabTextFrom(restaurantName);

  const detailRestaurantButton = locate('resto-list a').first();
  I.click(detailRestaurantButton);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');

  I.seeElement('resto-list');
  const likedRestaurantTitle = await I.grabTextFrom('.card-title h3');

  assert.strictEqual(getRestaurantName, likedRestaurantTitle);
})
