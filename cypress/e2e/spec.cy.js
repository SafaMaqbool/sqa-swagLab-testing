describe('Verify Login Functionality', () => {
  it('should login with valid credentials (standard_user)', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.get('#user-name').should('be.visible').type('standard_user');
    cy.get('#password').should('be.visible').type('secret_sauce');
    cy.get('#login-button').should('be.visible').click();
    
  })
})
describe('Verify Login Functionality', () => {
  it('should login with valid credentials (locked_out_user)', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.get('#user-name').should('be.visible').type('locked_out_user');
    cy.get('#password').should('be.visible').type('secret_sauce');
    cy.get('#login-button').should('be.visible').click();
    
  })
})
describe('Verify Login Functionality', () => {
  it('should login with valid credentials (problem_user)', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.get('#user-name').should('be.visible').type('problem_user');
    cy.get('#password').should('be.visible').type('secret_sauce');
    cy.get('#login-button').should('be.visible').click();
    
  })
})

describe('Verify Login Functionality', () => {
  it('should login with valid credentials (performance_glitch_user)', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.get('#user-name').should('be.visible').type('performance_glitch_user');
    cy.get('#password').should('be.visible').type('secret_sauce');
    cy.get('#login-button').should('be.visible').click();
    
  })
})
describe('Verify Logout Functionality', () => {
  it('should log out successfully', () => {
   
    cy.visit(' https://www.saucedemo.com/v1/inventory.html ')

    // Perform any actions needed to log in (if applicable) 

    // Click the logout link in the sidebar menu
    cy.get('#logout_sidebar_link').click({ force: true });
    // cy.get('#logout_sidebar_link').scrollIntoView().click();
    // cy.get('#logout_sidebar_link').should('be.enabled').click();
    // cy.get('#logout_sidebar_link', { timeout: 10000 }).click();
    cy.url().should('include', '/index.html');
   
  });
});

describe('Verify Product Sorting', () => {
  it('should display products in alphabetical order', () => {
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

    // Select the 'A to Z' sorting option
    cy.get('#inventory_container select').select('az');

    // Wait for the product names to be visible
    cy.get('.inventory_item_name')
      .should('be.visible')
      .invoke('text')
      .then((productNames) => {
        // Convert the product names to an array and check if it's sorted
        //basically we are taking the text which is the name of products and then comparing it to 
        //original which is on page. if it matches means they were in alphabetical order and the test pass
        const sortedProductNames = [...productNames.split('\n')].sort();
        expect(productNames.split('\n')).to.deep.equal(sortedProductNames);
      });
  });
});
describe('Verify Cart Addition',()=>{
  it('should add a product to cart',()=>{
    cy.visit('https://www.saucedemo.com/v1/inventory.html')
    cy.get('.inventory_item button').first().click()
    cy.get('.shopping_cart_badge').should('have.text','1')
  })
});

describe('Remove from Cart', () => {
  it('should remove an item from the cart', () => {
    // Visit the inventory page and add an item to the cart
    cy.visit('https://www.saucedemo.com/v1/inventory.html');
    cy.get('.inventory_item button').first().click(); // Assuming there's an "Add to Cart" button

    // Navigate to the cart
    cy.get('.shopping_cart_badge').click();

    // Verify that the cart is not empty
    cy.get('.shopping_cart_badge').should('not.contain', 'Your cart is empty');

    // Remove an item from the cart
    cy.get('.cart_list').first().find('.cart_button').click(); // Assuming there's a "Remove" button

    // Verify that the cart is now empty or updated
    // You might need to adjust this assertion based on your application's behavior
    cy.get('.fa-layers-counter').should('not.exist');
  });
});

describe('Verify Checkout Process',()=>{
  it('should navigate to the checkout page',()=>{
    cy.visit('https://www.saucedemo.com/v1/inventory.html')
    cy.get('.shopping_cart_link').click()
    cy.url().should('include','/v1/cart.html')
  })
})

describe('Invalid Login Credentials', () => {
  it('should show an error message for invalid credentials', () => {
    cy.visit('https://www.saucedemo.com/v1/index.html');

    // Wait for the login button to become visible before proceeding
    cy.get('#login-button').should('be.visible');

    // Now you can interact with the login form
    cy.get('#user-name').type('invalid_username');
    cy.get('#password').type('invalid_password');
    cy.get('#login-button').click();
    cy.get('.error-button').should('be.visible');
    cy.url().should('eq', 'https://www.saucedemo.com/v1/index.html');
    
  });
});

describe('Display Product Details Page', () => {
  it('should display product details page', () => {
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

  

    // Click on the first inventory item
    cy.get('.inventory_item_img').first().click();

    // Wait for the URL to include '/inventory-item.html'
    cy.url().should('include', '/inventory-item.html');
  });
});
describe('Filter Functionality',()=>{
  it('should display products based on applied filter',()=>{
    cy.visit('https://www.saucedemo.com/v1/inventory.html')
    cy.get('.product_sort_container').select('lohi')
     // Get the prices and convert them to an array of numbers
     cy.get('.inventory_item_price')
     .invoke('text')
     .then((priceText) => {  //taking the text invoked previously
       const prices = priceText.split('\n').map(price => parseFloat(price.replace('$', ''))); //splitting it
       // Check if the prices are sorted in ascending order
       expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
  })
})
})

describe('Generate Invoice', () => {
  it('should generate an invoice', () => {
    // Visit the inventory page and add an item to the cart
    cy.visit('https://www.saucedemo.com/v1/inventory.html');
    cy.get('body')
  });
});

