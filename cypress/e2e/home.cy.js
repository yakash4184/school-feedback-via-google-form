describe('Feedback Form Test', () => {
  it('fills and submits the form', () => {
    cy.visit('https://school-feedback-via-google-form.vercel.app/teacher-feedback/feedback.html'); // अपना सही URL लगाओ
    
    cy.get('#startBtn').click();
    // स्टूडेंट डिटेल्स भरना
    cy.get('#studentName').type('Akash Yadav');
    cy.get('#studentClass').type('10th');
    cy.get('#studentSection').select('A');

    // रेटिंग बटन (मान लो 5 बटन हैं, 1 से 5 तक)
    function fillFeedback() {
    cy.get('.rating[data-field="rating"] button').eq(4).click(); // 5-star
    cy.get('.rating[data-field="clarity"] button').eq(3).click(); // 4-star
    cy.get('.rating[data-field="behaviour"] button').eq(4).click(); // 5-star
    
    // फीडबैक टेक्स्ट
    cy.get('#comments').type('बहुत अच्छे तरीके से पढ़ाते हैं।');
    
  }
  function nextOrSubmit(){
    cy.get('body').then($body => {
      // if($body.find('#nextBtn').length){
      if($body.find('#nextBtn:visible').length){
        cy.get('#nextBtn').click();
        fillFeedback();
        nextOrSubmit();
      }else{
        cy.get('#submitBtn').click();
      }
    });
  }

  fillFeedback();
  nextOrSubmit();

  cy.contains('Feedback submitted!');
});
});
