/// <reference types="cypress" />
import tokenFixture from '../../fixtures/token.json'
import productReviewFixture from '../../fixtures/product-reviews.json'
import statusFixture from '../../fixtures/status.json'
import productReviewWooCommerceSchema from '../../contracts/product-review-contract'
import deletedProductReviewWooCommerceSchema from '../../contracts/deleted-product-review-contract'
import { faker } from '@faker-js/faker/locale/pt_BR'

describe('Product Reviews', () => {

  it('Deve listar os reviews (max 25)', () => {
    cy.getProductReviewsWooCommerce(25
    ).then((getProductReviewsResponse) => {
      expect(getProductReviewsResponse).to.exist
      expect(getProductReviewsResponse.body).to.have.length.greaterThan(0)
      expect(getProductReviewsResponse.status).to.eq(statusFixture.ok)
      if (getProductReviewsResponse.body.length > 0) {
        for (var i = 0; i < getProductReviewsResponse.body.length; i++) {
          return productReviewWooCommerceSchema.validateAsync(getProductReviewsResponse.body[i])
        }
      }

    })
  })

  it('Deve criar review', () => {
    var product_id = productReviewFixture.productReview.product_id[Math.floor(Math.random() * productReviewFixture.productReview.product_id.length)]
    var review = faker.lorem.lines(1)
    var reviewer = faker.name.firstName()
    var reviewer_email = faker.internet.email(reviewer)
    var rating = Math.floor(Math.random() * 5)

    cy.createProductReviewWooCommerce(
      product_id,
      review,
      reviewer,
      reviewer_email,
      rating
    ).then((postCreateProductReviewResponse) => {
      expect(postCreateProductReviewResponse.status).to.eq(statusFixture.created)
      expect(postCreateProductReviewResponse.body.product_id).to.eq(product_id)
      expect(postCreateProductReviewResponse.body.review).to.eq(review)
      expect(postCreateProductReviewResponse.body.reviewer).to.eq(reviewer)
      expect(postCreateProductReviewResponse.body.reviewer_email).to.eq(reviewer_email)
      expect(postCreateProductReviewResponse.body.rating).to.eq(rating)
      return productReviewWooCommerceSchema.validateAsync(postCreateProductReviewResponse.body),

        cy.deleteProductReviewWooCommerce(postCreateProductReviewResponse.body.id)
    })
  })


  it('Deve editar review', () => {
    var product_id = productReviewFixture.productReview.product_id[Math.floor(Math.random() * productReviewFixture.productReview.product_id.length)]
    var review = faker.lorem.lines(1)
    var reviewer = faker.name.firstName()
    var reviewer_email = faker.internet.email(reviewer)
    var rating = Math.floor(Math.random() * 6)

    cy.createProductReviewWooCommerce(
      product_id,
      review,
      reviewer,
      reviewer_email,
      rating,
    ).then((postCreateProductReviewResponse) => {
      var editedReview = faker.lorem.lines(1)
      var editedRating = Math.floor((Math.random() * 5) + 1)

      cy.editProductReviewWooCommerce(
        postCreateProductReviewResponse.body.id,
        editedReview,
        editedRating,
      ).then((putEditProductReviewResponse) => {
        expect(putEditProductReviewResponse.status).to.eq(statusFixture.ok)
        expect(putEditProductReviewResponse.body.product_id).to.eq(product_id)
        expect(putEditProductReviewResponse.body.review).to.eq(editedReview)
        expect(putEditProductReviewResponse.body.reviewer).to.eq(reviewer)
        expect(putEditProductReviewResponse.body.reviewer_email).to.eq(reviewer_email)
        expect(putEditProductReviewResponse.body.rating).to.eq(editedRating)
        return productReviewWooCommerceSchema.validateAsync(putEditProductReviewResponse.body),

          cy.deleteProductReviewWooCommerce(putEditProductReviewResponse.body.id)
      })
    })
  })


  it('Deve deletar review', () => {
    var product_id = productReviewFixture.productReview.product_id[Math.floor(Math.random() * productReviewFixture.productReview.product_id.length)]
    var review = faker.lorem.lines(1)
    var reviewer = faker.name.firstName()
    var reviewer_email = faker.internet.email(reviewer)
    var rating = Math.floor(Math.random() * 5)

    cy.createProductReviewWooCommerce(
      product_id,
      review,
      reviewer,
      reviewer_email,
      rating,
    ).then((postCreateProductReviewResponse) => {

      cy.deleteProductReviewWooCommerce(postCreateProductReviewResponse.body.id
      ).then((deleteProductReviewResponse) => {
        expect(deleteProductReviewResponse.status).to.eq(statusFixture.ok)
        expect(deleteProductReviewResponse.body.deleted).to.eq(true)
        expect(deleteProductReviewResponse.body.previous.id).to.eq(postCreateProductReviewResponse.body.id)
        return deletedProductReviewWooCommerceSchema.validateAsync(deleteProductReviewResponse.body)
      })

    })
  })

  it('Deve deletar review editada', () => {
    var product_id = productReviewFixture.productReview.product_id[Math.floor(Math.random() * productReviewFixture.productReview.product_id.length)]
    var review = faker.lorem.lines(1)
    var reviewer = faker.name.firstName()
    var reviewer_email = faker.internet.email(reviewer)
    var rating = Math.floor(Math.random() * 5)

    cy.createProductReviewWooCommerce(
      product_id,
      review,
      reviewer,
      reviewer_email,
      rating,
    ).then((postCreateProductReviewResponse) => {
      var editedReview = faker.lorem.lines(1)
      var editedRating = Math.floor((Math.random() * 5) + 1)

      cy.editProductReviewWooCommerce(
        postCreateProductReviewResponse.body.id,
        editedReview,
        editedRating,
      ).then((putEditProductReviewResponse) => {

        cy.deleteProductReviewWooCommerce(putEditProductReviewResponse.body.id
        ).then((deleteProductReviewResponse) => {
          expect(deleteProductReviewResponse.status).to.eq(statusFixture.ok)
          expect(deleteProductReviewResponse.body.deleted).to.eq(true)
          expect(deleteProductReviewResponse.body.previous.id).to.eq(putEditProductReviewResponse.body.id)
          expect(deleteProductReviewResponse.body.previous.review).to.eq(putEditProductReviewResponse.body.review)
          return deletedProductReviewWooCommerceSchema.validateAsync(deleteProductReviewResponse.body)
        })
      })
    })
  })

  it.skip('Obter produtos', () => {
    var products = { "product_id": [] }
    cy.request({
      method: "GET",
      url: Cypress.env("wooCommerce") + Cypress.env("products") + "?per_page=100&orderby=id&order=asc"
      , headers: {
        Authorization: tokenFixture.token
      }, failOnStatusCode: false
    }).then((getProductsResponse) => {
      cy.log(getProductsResponse.body.length)
      if (getProductsResponse.body.length > 0) {
        for (var i = 0; i < getProductsResponse.body.length; i++) {
          products.product_id.push(getProductsResponse.body[i].id)
        }
        cy.writeFile('cypress/fixtures/products2.json', { products })

      }
    })
  })

  it.skip('Reviews em produtos', () => {
    cy.reload
    var review = faker.lorem.lines(1)
    var reviewer = faker.name.firstName()
    var reviewer_email = faker.internet.email(reviewer)
    var rating = Math.floor(Math.random() * 5)
    for (var i = 0; i < productsFixture.products.product_id.length; i++) {
      cy.createProductReviewWooCommerce(
        tokenFixture.token,
        productsFixture.products.product_id[i],
        review,
        reviewer,
        reviewer_email,
        rating,
      ).then((createResponse) => {
        if (createResponse.status == statusFixture.created) {
          cy.log("Criada review para produto ID " + createResponse.body.product_id)
          expect(createResponse.status).to.eq(statusFixture.created)
          var editedReview = faker.lorem.lines(1)
          var editedRating = Math.floor((Math.random() * 5) + 1)
          var review_id = createResponse.body.id
          var product_id = createResponse.body.product_id
          cy.editProductReviewWooCommerce(
            tokenFixture.token,
            product_id,
            editedReview,
            reviewer,
            reviewer_email,
            editedRating,
            review_id
          ).then((editResponse) => {
            if (editResponse.status == statusFixture.ok) {
              expect(editResponse.status).to.eq(statusFixture.ok)
              cy.deleteProductReviewWooCommerce(
                tokenFixture.token,
                review_id
              ).then((deleteProductReviewResponse) => {
                expect(deleteProductReviewResponse.status).to.eq(statusFixture.ok)
                return deletedProductReviewWooCommerceSchema.validateAsync(deleteProductReviewResponse.body)
              })
            }
          })
        }
      })
    }
  })



})