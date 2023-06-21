class NewsletterCapture extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.addSubmitListener();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          input[type="email"] {
            margin-bottom: 10px;
            padding: 5px;
            width: 200px;
          }
          input[type="submit"] {
            padding: 5px 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
          }
        </style>
        <form id="newsletter-form">
          <label for="email">Email:</label>
          <input type="email" id="email" required>
          <input type="submit" value="Subscribe">
        </form>
        <p>By submitting this form, you accept the <a href="#">Terms and Conditions</a>.</p>
      `;
    }
  
    addSubmitListener() {
      const form = this.shadowRoot.getElementById('newsletter-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = this.shadowRoot.getElementById('email').value;
        this.submitForm(email);
      });
    }
  
    submitForm(email) {
      const url = 'https://test.de/form';
      const requestData = { email };
      fetch(url, {
        method: 'PUT',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          console.log('Form submitted successfully');
          // You can add additional actions upon successful submission
        } else {
          console.error('Error submitting form');
          // You can handle the error case here
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        // You can handle the error case here
      });
    }
  }
  
  customElements.define('newsletter-capture', NewsletterCapture);

export default NewsletterCapture;
