/// <reference types="cypress" />

Cypress.Commands.add('randomRating', function(min,max) {
    return Math.floor(Math.random() * (max - min) + min)
  })

Cypress.Commands.add('getProductReviewsWooCommerce', function(token,max){
    cy.request({
        method: "GET",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + "?per_page=" + max,
        headers: {
            Authorization: token
        },failOnStatusCode: false
    })
})


Cypress.Commands.add('createProductReviewWooCommerce', function(token, product_id, review, reviewer, reviewer_email, rating){
    cy.request({
        method: "POST",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews"),
        headers: {
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        },failOnStatusCode: false
    })
})

Cypress.Commands.add('editProductReviewWooCommerce', function(token, product_id, review, reviewer, reviewer_email, rating, id){
    cy.request({
        method: "PUT",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + '/' + id,
        headers: {
            Authorization: token,
        },
        body: {
            "product_id": product_id,
            "review": review,
            "reviewer": reviewer,
            "reviewer_email": reviewer_email,
            "rating": rating
        }
        ,failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteProductReviewWooCommerce', function(token, id){
    var force=true
    cy.request({
        method: "DELETE",
        url: Cypress.env("wooCommerce") + Cypress.env("productReviews") + '/' + id + "?force="+force,
        headers: {
            Authorization: token,
        },
        failOnStatusCode: false        
    })
})