/// <reference types="cypress" />
import tokenFixture from '../../../fixtures/token.json'
import productReviewFixture from '../../../fixtures/product-reviews.json'
import { faker } from '@faker-js/faker/locale/pt_BR'

Cypress.Commands.add('getProductReviewsWooCommerce', function (max) {
    cy.request({
        method: "GET",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + "?per_page=" + max,
        headers: {
            Authorization: tokenFixture.token
        }, failOnStatusCode: false
    })
})


Cypress.Commands.add('createProductReviewWooCommerce', function (product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
        method: "POST",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews"),
        headers: {
            Authorization: tokenFixture.token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }, failOnStatusCode: false
    })
})

Cypress.Commands.add('editProductReviewWooCommerce', function (review_id, review, rating) {
    cy.request({
        method: "PUT",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + '/' + review_id,
        headers: {
            Authorization: tokenFixture.token,
        },
        body: {

            "review": review,
            "rating": rating
        }
        , failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteProductReviewWooCommerce', function (id) {
    var force = true
    cy.request({
        method: "DELETE",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + '/' + id + "?force=" + force,
        headers: {
            Authorization: tokenFixture.token,
        },
        failOnStatusCode: false
    })
})