const assert = require('assert');
Feature('CustomerReview');

Before(({ I }) => {
    I.amOnPage('/');

    I.seeElement('resto-list');
    const detailRestaurantButton = locate('resto-list a').first();
    I.click(detailRestaurantButton);
});
Scenario('Add empty feedback from empty field', async ({ I }) => {
    I.seeElement('form');
    I.fillField('name', '');
    I.fillField('review', '');
    I.click('.form__submit');

    I.see('Name and Review cannot be empty.', '.alert-error');
});
Scenario('Add Feedback To Restaurant', async ({ I }) => {
    I.seeElement('form');
    I.fillField('name', 'Thahirudin');
    I.fillField('review', 'Mantap');
    I.click('.form__submit');
    I.see('Mantap', '.ulasan__review p');
});
