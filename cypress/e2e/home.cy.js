describe('Feedback Form Test', () => {
  it('fills and submits the form', () => {
    cy.intercept('POST', '**/forms/**', { statusCode: 200 }).as('formSubmit');
    cy.visit('/teacher-feedback/feedback.html');

    cy.get('#startBtn').click();

    // Fill student details
    cy.get('#studentName').type('Akash Yadav');
    cy.get('#studentClass').select('Class 10');
    cy.get('#studentSection').select('A');

    const fillFeedback = () => {
      cy.get('.rating[data-field="rating"] button').eq(4).click();    // 5-star
      cy.get('.rating[data-field="clarity"] button').eq(3).click();   // 4-star
      cy.get('.rating[data-field="behaviour"] button').eq(4).click(); // 5-star
      cy.get('#comments').clear().type('Teaches very well and is supportive.');
    };

    const goNextOrSubmit = () => {
      fillFeedback();

      return cy.get('#nextBtn').then(($btn) => {
        if ($btn.is(':visible')) {
          cy.wrap($btn).click();
          return goNextOrSubmit(); // important: return the recursion
        }
        return cy.get('#submitBtn').click();
      });
    };

    // Start the loop and wait for it
    return goNextOrSubmit().then(() => {
      cy.get('#successPanel', { timeout: 20000 }).should('be.visible');
      cy.contains('Feedback submitted!').should('be.visible');
    });
  });
});
