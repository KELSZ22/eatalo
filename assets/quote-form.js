// import { Component } from '@theme/component';

// /**
//  * A custom element that manages the quote form with multi-step functionality.
//  *
//  * @typedef {object} QuoteFormRefs
//  * @property {HTMLFormElement} form - The form element.
//  * @property {HTMLElement} step1 - Step 1 container.
//  * @property {HTMLElement} step2 - Step 2 container.
//  * @property {HTMLElement} step3 - Step 3 container.
//  * @property {HTMLButtonElement} nextButton - Next button.
//  * @property {HTMLInputElement} nameInput - Name input.
//  * @property {HTMLInputElement} companyInput - Company input.
//  * @property {HTMLInputElement} phoneInput - Phone input.
//  * @property {HTMLInputElement} emailInput - Email input.
//  * @property {HTMLInputElement} addressInput - Address input.
//  * @property {HTMLInputElement} suburbInput - Suburb input.
//  * @property {HTMLInputElement} postcodeInput - Postcode input.
//  * @property {HTMLInputElement} attendeesInput - Attendees input.
//  * @property {HTMLInputElement} delivery1Input - Delivery #1 input.
//  * @property {HTMLInputElement} eventDateInput - Event date input.
//  * @property {HTMLInputElement} timeInput - Time input.
//  * @property {HTMLElement} nameError - Name error container.
//  * @property {HTMLElement} companyError - Company error container.
//  * @property {HTMLElement} phoneError - Phone error container.
//  * @property {HTMLElement} emailError - Email error container.
//  * @property {HTMLElement} addressError - Address error container.
//  * @property {HTMLElement} suburbError - Suburb error container.
//  * @property {HTMLElement} postcodeError - Postcode error container.
//  * @property {HTMLElement} attendeesError - Attendees error container.
//  * @property {HTMLElement} delivery1Error - Delivery #1 error container.
//  * @property {HTMLElement} eventDateError - Event date error container.
//  * @property {HTMLElement} timeError - Time error container.
//  * @property {HTMLElement} budgetError - Budget error container.
//  * @property {HTMLElement} eventTypeError - Event type error container.
//  * @property {HTMLElement} foodStyleError - Food style error container.
//  * @property {HTMLElement} cutleryError - Cutlery error container.
//  * @property {HTMLElement} eventCategoryError - Event category error container.
//  * @property {HTMLElement} drinksError - Drinks error container.
//  * @property {HTMLButtonElement} previousButton - Previous button.
//  * @property {HTMLElement} budgetInputWrapper - Budget input wrapper container.
//  * @property {HTMLTextAreaElement} dietaryInput - Dietary requirements textarea.
//  * @property {HTMLTextAreaElement} otherDetailsInput - Other details textarea.
//  * @property {HTMLElement} recaptchaWrapper - reCAPTCHA wrapper container.
//  * @property {HTMLElement} recaptchaContainer - reCAPTCHA container.
//  * @property {HTMLElement} recaptchaError - reCAPTCHA error container.
//  * @property {HTMLButtonElement} previousButtonStep3 - Previous button for step 3.
//  * @property {HTMLButtonElement} submitButton - Submit form button.
//  *
//  * @extends {Component<QuoteFormRefs>}
//  */
// class QuoteFormComponent extends Component {
//   requiredRefs = ['form', 'step1', 'step2', 'step3', 'nextButton'];

//   connectedCallback() {
//     super.connectedCallback();
//     this.currentStep = 1;
//     this.deliveryDates = [];
//     this.recaptchaWidgetId = null;
//     this.recaptchaVerified = false;
//     // Initialize step visibility
//     this.updateStepDisplay();
//     // Set up budget radio button listeners
//     this.setupBudgetListeners();
//     // Set up form submission
//     this.setupFormSubmission();
//     // Set up reCAPTCHA callback
//     this.setupRecaptcha();
//   }

//   /**
//    * Sets up event listeners for budget radio buttons
//    */
//   setupBudgetListeners() {
//     const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
//     budgetRadios.forEach(radio => {
//       radio.addEventListener('change', () => {
//         this.handleBudgetChange();
//       });
//     });
//   }

//   /**
//    * Shows/hides budget input field based on selection
//    */
//   handleBudgetChange() {
//     const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
//     const selectedValue = Array.from(budgetRadios).find(radio => radio.checked)?.value;
//     const budgetInputWrapper = this.refs.budgetInputWrapper;

//     if (budgetInputWrapper) {
//       if (selectedValue === 'per_person' || selectedValue === 'total_budget') {
//         budgetInputWrapper.hidden = false;
//         budgetInputWrapper.style.display = 'flex';
//         if (this.refs.eventBudgetInput) {
//           this.refs.eventBudgetInput.required = true;
//           this.refs.eventBudgetInput.setAttribute('aria-required', 'true');
//         }
//       } else {
//         budgetInputWrapper.hidden = true;
//         budgetInputWrapper.style.display = 'none';
//         if (this.refs.eventBudgetInput) {
//           this.refs.eventBudgetInput.required = false;
//           this.refs.eventBudgetInput.removeAttribute('aria-required');
//           this.refs.eventBudgetInput.value = '';
//         }
//       }
//     }
//   }

//   /**
//    * Validates all fields in step 1
//    * @returns {boolean} True if all fields are valid
//    */
//   validateStep1() {
//     const fields = [
//       { input: this.refs.nameInput, error: this.refs.nameError, name: 'name' },
//       { input: this.refs.companyInput, error: this.refs.companyError, name: 'company' },
//       { input: this.refs.phoneInput, error: this.refs.phoneError, name: 'phone' },
//       { input: this.refs.emailInput, error: this.refs.emailError, name: 'email' },
//       { input: this.refs.addressInput, error: this.refs.addressError, name: 'address' },
//       { input: this.refs.suburbInput, error: this.refs.suburbError, name: 'suburb' },
//       { input: this.refs.postcodeInput, error: this.refs.postcodeError, name: 'postcode' },
//       { input: this.refs.attendeesInput, error: this.refs.attendeesError, name: 'attendees' },
//       { input: this.refs.delivery1Input, error: this.refs.delivery1Error, name: 'delivery_1' },
//       { input: this.refs.eventDateInput, error: this.refs.eventDateError, name: 'event_date' },
//       { input: this.refs.timeInput, error: this.refs.timeError, name: 'time' },
//     ];

//     let isValid = true;

//     fields.forEach(({ input, error, name }) => {
//       if (!input) return;

//       const value = input.value.trim();
//       const isEmpty = value === '';

//       if (isEmpty) {
//         input.setAttribute('aria-invalid', 'true');
//         if (error) {
//           error.hidden = false;
//         }
//         isValid = false;
//       } else {
//         input.removeAttribute('aria-invalid');
//         if (error) {
//           error.hidden = true;
//         }
//       }

//       // Email validation
//       if (name === 'email' && !isEmpty) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(value)) {
//           input.setAttribute('aria-invalid', 'true');
//           if (error) {
//             error.hidden = false;
//             const errorSpan = error.querySelector('span');
//             if (errorSpan) {
//               errorSpan.textContent = 'Please enter a valid email address';
//             }
//           }
//           isValid = false;
//         }
//       }

//       // Number validation for attendees
//       if (name === 'attendees' && !isEmpty) {
//         const numValue = parseInt(value, 10);
//         if (isNaN(numValue) || numValue < 1) {
//           input.setAttribute('aria-invalid', 'true');
//           if (error) {
//             error.hidden = false;
//             const errorSpan = error.querySelector('span');
//             if (errorSpan) {
//               errorSpan.textContent = 'Please enter a valid number';
//             }
//           }
//           isValid = false;
//         }
//       }
//     });

//     return isValid;
//   }

//   /**
//    * Validates all fields in step 2
//    * @returns {boolean} True if all fields are valid
//    */
//   validateStep2() {
//     let isValid = true;

//     // Validate budget type (at least one radio must be selected)
//     const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
//     const budgetSelected = Array.from(budgetRadios).some(radio => radio.checked);
//     const selectedBudgetValue = Array.from(budgetRadios).find(radio => radio.checked)?.value;
    
//     if (!budgetSelected) {
//       if (this.refs.budgetError) {
//         this.refs.budgetError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.budgetError) {
//         this.refs.budgetError.hidden = true;
//       }
      
//       // Validate budget input only if "Per Person" or "Total Budget" is selected
//       if ((selectedBudgetValue === 'per_person' || selectedBudgetValue === 'total_budget') && this.refs.eventBudgetInput) {
//         const budgetValue = this.refs.eventBudgetInput.value.trim();
//         if (budgetValue === '') {
//           if (this.refs.budgetError) {
//             this.refs.budgetError.hidden = false;
//             const errorSpan = this.refs.budgetError.querySelector('span');
//             if (errorSpan) {
//               errorSpan.textContent = 'Please enter your event budget';
//             }
//           }
//           isValid = false;
//         }
//       }
//     }

//     // Validate event type (at least one checkbox must be selected)
//     const eventTypeCheckboxes = this.querySelectorAll('input[name="event_type"]:checked');
//     if (eventTypeCheckboxes.length === 0) {
//       if (this.refs.eventTypeError) {
//         this.refs.eventTypeError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.eventTypeError) {
//         this.refs.eventTypeError.hidden = true;
//       }
//     }

//     // Validate food style (at least one checkbox must be selected)
//     const foodStyleCheckboxes = this.querySelectorAll('input[name="food_style"]:checked');
//     if (foodStyleCheckboxes.length === 0) {
//       if (this.refs.foodStyleError) {
//         this.refs.foodStyleError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.foodStyleError) {
//         this.refs.foodStyleError.hidden = true;
//       }
//     }

//     // Validate cutlery and plates
//     const cutleryRadios = this.querySelectorAll('input[name="cutlery_plates"]');
//     const cutlerySelected = Array.from(cutleryRadios).some(radio => radio.checked);
//     if (!cutlerySelected) {
//       if (this.refs.cutleryError) {
//         this.refs.cutleryError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.cutleryError) {
//         this.refs.cutleryError.hidden = true;
//       }
//     }

//     // Validate event category
//     const eventCategoryRadios = this.querySelectorAll('input[name="event_category"]');
//     const eventCategorySelected = Array.from(eventCategoryRadios).some(radio => radio.checked);
//     if (!eventCategorySelected) {
//       if (this.refs.eventCategoryError) {
//         this.refs.eventCategoryError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.eventCategoryError) {
//         this.refs.eventCategoryError.hidden = true;
//       }
//     }

//     // Validate drinks required
//     const drinksRadios = this.querySelectorAll('input[name="drinks_required"]');
//     const drinksSelected = Array.from(drinksRadios).some(radio => radio.checked);
//     if (!drinksSelected) {
//       if (this.refs.drinksError) {
//         this.refs.drinksError.hidden = false;
//       }
//       isValid = false;
//     } else {
//       if (this.refs.drinksError) {
//         this.refs.drinksError.hidden = true;
//       }
//     }

//     return isValid;
//   }

//   /**
//    * Moves to the next step
//    */
//   nextStep = () => {
//     if (this.currentStep === 1) {
//       if (!this.validateStep1()) {
//         // Scroll to first error
//         const firstError = this.querySelector('.quote-modal__error:not([hidden])');
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//         }
//         return;
//       }
//       // Move to step 2
//       this.currentStep = 2;
//       this.updateStepDisplay();
//     } else if (this.currentStep === 2) {
//       if (!this.validateStep2()) {
//         // Scroll to first error
//         const firstError = this.querySelector('.quote-modal__error:not([hidden])');
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//         }
//         return;
//       }
//       // Move to step 3
//       this.currentStep = 3;
//       this.updateStepDisplay();
//       // Render reCAPTCHA when step 3 is shown
//       setTimeout(() => this.renderRecaptcha(), 100);
//     }
//   };

//   /**
//    * Moves to the previous step
//    */
//   previousStep = () => {
//     if (this.currentStep === 2) {
//       this.currentStep = 1;
//       this.updateStepDisplay();
//     } else if (this.currentStep === 3) {
//       this.currentStep = 2;
//       this.updateStepDisplay();
//     }
//   };

//   /**
//    * Updates the display to show the current step
//    */
//   updateStepDisplay() {
//     // Update step visibility
//     [this.refs.step1, this.refs.step2, this.refs.step3].forEach((step, index) => {
//       if (step) {
//         if (index + 1 === this.currentStep) {
//           step.hidden = false;
//           step.style.display = 'flex';
//         } else {
//           step.hidden = true;
//           step.style.display = 'none';
//         }
//       }
//     });

//     // Update progress indicator - highlight all completed steps plus current step
//     // Progress indicator is outside the component, so we need to search from the parent wrapper
//     const modalWrapper = this.closest('.quote-modal__wrapper');
//     if (modalWrapper) {
//       const progressSteps = modalWrapper.querySelectorAll('.quote-modal__progress-step');
//       progressSteps.forEach((step) => {
//         const stepNumber = parseInt(step.getAttribute('data-progress-step'), 10);
//         if (stepNumber <= this.currentStep) {
//           step.classList.add('quote-modal__progress-step--active');
//         } else {
//           step.classList.remove('quote-modal__progress-step--active');
//         }
//       });
//     }
//   }

//   /**
//    * Adds a new delivery date field
//    */
//   addDeliveryDate = () => {
//     this.deliveryDates.push({
//       id: Date.now(),
//       date: '',
//       time: ''
//     });
//     // TODO: Render additional delivery date fields dynamically
//     console.log('Add delivery date clicked', this.deliveryDates);
//   };

//   /**
//    * Listens for modal close to reset reCAPTCHA state.
//    */
//   setupRecaptcha() {
//     const modal = document.getElementById('quote-modal');
//     if (modal) {
//       modal.addEventListener('dialog:close', () => this.resetRecaptcha());
//     }
//   }

//   /**
//    * Explicitly renders the reCAPTCHA v2 checkbox widget.
//    * Waits for the API if it hasn't loaded yet.
//    */
//   renderRecaptcha() {
//     if (this.recaptchaWidgetId !== null) return;
//     if (!this.refs.recaptchaContainer) return;

//     const render = () => {
//       if (this.recaptchaWidgetId !== null) return;
//       const siteKey = this.refs.recaptchaContainer.getAttribute('data-sitekey');
//       if (!siteKey) return;

//       try {
//         this.recaptchaWidgetId = grecaptcha.render(this.refs.recaptchaContainer, {
//           sitekey: siteKey,
//           callback: () => {
//             this.recaptchaVerified = true;
//             this.updateSubmitButton();
//           },
//           'expired-callback': () => {
//             this.recaptchaVerified = false;
//             this.updateSubmitButton();
//           },
//           'error-callback': () => {
//             this.recaptchaVerified = false;
//             this.updateSubmitButton();
//           },
//         });
//       } catch (e) {
//         console.error('reCAPTCHA render error:', e);
//       }
//     };

//     if (window.recaptchaApiReady) {
//       render();
//     } else {
//       document.addEventListener('recaptcha:ready', render, { once: true });
//     }
//   }

//   /**
//    * Enables or disables the submit button based on reCAPTCHA state.
//    */
//   updateSubmitButton() {
//     if (this.refs.submitButton) {
//       this.refs.submitButton.disabled = !this.recaptchaVerified;
//     }
//   }

//   /**
//    * Resets reCAPTCHA widget and submit button on modal close.
//    */
//   resetRecaptcha() {
//     if (this.recaptchaWidgetId !== null && typeof grecaptcha !== 'undefined') {
//       try { grecaptcha.reset(this.recaptchaWidgetId); } catch (_) {}
//     }
//     this.recaptchaVerified = false;
//     this.updateSubmitButton();
//   }

//   /**
//    * Sets up form submission handler
//    */
//   setupFormSubmission() {
//     if (this.refs.form) {
//       this.refs.form.addEventListener('submit', this.handleFormSubmit);
//     }
//   }

//   /**
//    * Handles form submission after reCAPTCHA checkbox is verified.
//    */
//   handleFormSubmit = (event) => {
//     event.preventDefault();

//     if (!this.recaptchaVerified) {
//       if (this.refs.recaptchaError) {
//         this.refs.recaptchaError.hidden = false;
//       }
//       return;
//     }

//     const formData = new FormData(this.refs.form);

//     // TODO: Send form data to your backend/email service
//     console.log('Form submitted with data:', Object.fromEntries(formData));

//     alert('Thank you! Your quote request has been submitted successfully.');

//     const modal = document.getElementById('quote-modal');
//     if (modal) modal.closeDialog();
//   };
// }

// if (!customElements.get('quote-form-component')) {
//   customElements.define('quote-form-component', QuoteFormComponent);
// }

// // Function to open the modal (can be called from anywhere)
// window.openQuoteModal = function() {
//   const modal = document.getElementById('quote-modal');
//   if (modal && modal.refs?.dialog) {
//     modal.showDialog();
//   }
// };

import { Component } from "@theme/component";

/**
 * A custom element that manages the quote form with multi-step functionality.
 *
 * @typedef {object} QuoteFormRefs
 * @property {HTMLFormElement} form - The form element.
 * @property {HTMLElement} step1 - Step 1 container.
 * @property {HTMLElement} step2 - Step 2 container.
 * @property {HTMLElement} step3 - Step 3 container.
 * @property {HTMLButtonElement} nextButton - Next button.
 * @property {HTMLInputElement} nameInput - Name input.
 * @property {HTMLInputElement} companyInput - Company input.
 * @property {HTMLInputElement} phoneInput - Phone input.
 * @property {HTMLInputElement} emailInput - Email input.
 * @property {HTMLInputElement} addressInput - Address input.
 * @property {HTMLInputElement} suburbInput - Suburb input.
 * @property {HTMLInputElement} postcodeInput - Postcode input.
 * @property {HTMLInputElement} attendeesInput - Attendees input.
 * @property {HTMLInputElement} delivery1Input - Delivery #1 input.
 * @property {HTMLInputElement} eventDateInput - Event date input.
 * @property {HTMLInputElement} timeInput - Time input.
 * @property {HTMLElement} nameError - Name error container.
 * @property {HTMLElement} companyError - Company error container.
 * @property {HTMLElement} phoneError - Phone error container.
 * @property {HTMLElement} emailError - Email error container.
 * @property {HTMLElement} addressError - Address error container.
 * @property {HTMLElement} suburbError - Suburb error container.
 * @property {HTMLElement} postcodeError - Postcode error container.
 * @property {HTMLElement} attendeesError - Attendees error container.
 * @property {HTMLElement} delivery1Error - Delivery #1 error container.
 * @property {HTMLElement} eventDateError - Event date error container.
 * @property {HTMLElement} timeError - Time error container.
 * @property {HTMLElement} budgetError - Budget error container.
 * @property {HTMLElement} eventTypeError - Event type error container.
 * @property {HTMLElement} foodStyleError - Food style error container.
 * @property {HTMLElement} cutleryError - Cutlery error container.
 * @property {HTMLElement} eventCategoryError - Event category error container.
 * @property {HTMLElement} drinksError - Drinks error container.
 * @property {HTMLButtonElement} previousButton - Previous button.
 * @property {HTMLElement} budgetInputWrapper - Budget input wrapper container.
 * @property {HTMLTextAreaElement} dietaryInput - Dietary requirements textarea.
 * @property {HTMLTextAreaElement} otherDetailsInput - Other details textarea.
 * @property {HTMLElement} recaptchaWrapper - reCAPTCHA wrapper container.
 * @property {HTMLElement} recaptchaContainer - reCAPTCHA container.
 * @property {HTMLElement} recaptchaError - reCAPTCHA error container.
 * @property {HTMLButtonElement} previousButtonStep3 - Previous button for step 3.
 * @property {HTMLButtonElement} submitButton - Submit form button.
 * @property {HTMLElement} submitMessage - Inline status message element.
 *
 * @extends {Component<QuoteFormRefs>}
 */
class QuoteFormComponent extends Component {
  requiredRefs = ["form", "step1", "step2", "step3", "nextButton"];

  connectedCallback() {
    super.connectedCallback();
    this.currentStep = 1;
    this.deliveryDates = [];
    this.updateStepDisplay();
    this.setupBudgetListeners();
    this.setupFormSubmission();
  }

  /**
   * Sets up event listeners for budget radio buttons
   */
  setupBudgetListeners() {
    const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
    budgetRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        this.handleBudgetChange();
      });
    });
  }

  /**
   * Shows/hides budget input field based on selection
   */
  handleBudgetChange() {
    const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
    const selectedValue = Array.from(budgetRadios).find(
      (radio) => radio.checked,
    )?.value;
    const budgetInputWrapper = this.refs.budgetInputWrapper;

    if (budgetInputWrapper) {
      if (selectedValue === "per_person" || selectedValue === "total_budget") {
        budgetInputWrapper.hidden = false;
        budgetInputWrapper.style.display = "flex";
        if (this.refs.eventBudgetInput) {
          this.refs.eventBudgetInput.required = true;
          this.refs.eventBudgetInput.setAttribute("aria-required", "true");
        }
      } else {
        budgetInputWrapper.hidden = true;
        budgetInputWrapper.style.display = "none";
        if (this.refs.eventBudgetInput) {
          this.refs.eventBudgetInput.required = false;
          this.refs.eventBudgetInput.removeAttribute("aria-required");
          this.refs.eventBudgetInput.value = "";
        }
      }
    }
  }

  /**
   * Validates all fields in step 1
   * @returns {boolean} True if all fields are valid
   */
  validateStep1() {
    const fields = [
      { input: this.refs.nameInput, error: this.refs.nameError, name: "name" },
      {
        input: this.refs.companyInput,
        error: this.refs.companyError,
        name: "company",
      },
      {
        input: this.refs.phoneInput,
        error: this.refs.phoneError,
        name: "phone",
      },
      {
        input: this.refs.emailInput,
        error: this.refs.emailError,
        name: "email",
      },
      {
        input: this.refs.addressInput,
        error: this.refs.addressError,
        name: "address",
      },
      {
        input: this.refs.suburbInput,
        error: this.refs.suburbError,
        name: "suburb",
      },
      {
        input: this.refs.postcodeInput,
        error: this.refs.postcodeError,
        name: "postcode",
      },
      {
        input: this.refs.attendeesInput,
        error: this.refs.attendeesError,
        name: "attendees",
      },
      {
        input: this.refs.delivery1Input,
        error: this.refs.delivery1Error,
        name: "delivery_1",
      },
      {
        input: this.refs.eventDateInput,
        error: this.refs.eventDateError,
        name: "event_date",
      },
      { input: this.refs.timeInput, error: this.refs.timeError, name: "time" },
    ];

    let isValid = true;

    fields.forEach(({ input, error, name }) => {
      if (!input) return;

      const value = input.value.trim();
      const isEmpty = value === "";

      if (isEmpty) {
        input.setAttribute("aria-invalid", "true");
        if (error) {
          error.hidden = false;
        }
        isValid = false;
      } else {
        input.removeAttribute("aria-invalid");
        if (error) {
          error.hidden = true;
        }
      }

      if (name === "email" && !isEmpty) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          input.setAttribute("aria-invalid", "true");
          if (error) {
            error.hidden = false;
            const errorSpan = error.querySelector("span");
            if (errorSpan) {
              errorSpan.textContent = "Please enter a valid email address";
            }
          }
          isValid = false;
        }
      }

      if (name === "attendees" && !isEmpty) {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 1) {
          input.setAttribute("aria-invalid", "true");
          if (error) {
            error.hidden = false;
            const errorSpan = error.querySelector("span");
            if (errorSpan) {
              errorSpan.textContent = "Please enter a valid number";
            }
          }
          isValid = false;
        }
      }
    });

    return isValid;
  }

  /**
   * Validates all fields in step 2
   * @returns {boolean} True if all fields are valid
   */
  validateStep2() {
    let isValid = true;

    const budgetRadios = this.querySelectorAll('input[name="budget_type"]');
    const budgetSelected = Array.from(budgetRadios).some(
      (radio) => radio.checked,
    );
    const selectedBudgetValue = Array.from(budgetRadios).find(
      (radio) => radio.checked,
    )?.value;

    if (!budgetSelected) {
      if (this.refs.budgetError) {
        this.refs.budgetError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.budgetError) {
        this.refs.budgetError.hidden = true;
      }

      if (
        (selectedBudgetValue === "per_person" ||
          selectedBudgetValue === "total_budget") &&
        this.refs.eventBudgetInput
      ) {
        const budgetValue = this.refs.eventBudgetInput.value.trim();
        if (budgetValue === "") {
          if (this.refs.budgetError) {
            this.refs.budgetError.hidden = false;
            const errorSpan = this.refs.budgetError.querySelector("span");
            if (errorSpan) {
              errorSpan.textContent = "Please enter your event budget";
            }
          }
          isValid = false;
        }
      }
    }

    const eventTypeCheckboxes = this.querySelectorAll(
      'input[name="event_type"]:checked',
    );
    if (eventTypeCheckboxes.length === 0) {
      if (this.refs.eventTypeError) {
        this.refs.eventTypeError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.eventTypeError) {
        this.refs.eventTypeError.hidden = true;
      }
    }

    const foodStyleCheckboxes = this.querySelectorAll(
      'input[name="food_style"]:checked',
    );
    if (foodStyleCheckboxes.length === 0) {
      if (this.refs.foodStyleError) {
        this.refs.foodStyleError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.foodStyleError) {
        this.refs.foodStyleError.hidden = true;
      }
    }

    const cutleryRadios = this.querySelectorAll('input[name="cutlery_plates"]');
    const cutlerySelected = Array.from(cutleryRadios).some(
      (radio) => radio.checked,
    );
    if (!cutlerySelected) {
      if (this.refs.cutleryError) {
        this.refs.cutleryError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.cutleryError) {
        this.refs.cutleryError.hidden = true;
      }
    }

    const eventCategoryRadios = this.querySelectorAll(
      'input[name="event_category"]',
    );
    const eventCategorySelected = Array.from(eventCategoryRadios).some(
      (radio) => radio.checked,
    );
    if (!eventCategorySelected) {
      if (this.refs.eventCategoryError) {
        this.refs.eventCategoryError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.eventCategoryError) {
        this.refs.eventCategoryError.hidden = true;
      }
    }

    const drinksRadios = this.querySelectorAll('input[name="drinks_required"]');
    const drinksSelected = Array.from(drinksRadios).some(
      (radio) => radio.checked,
    );
    if (!drinksSelected) {
      if (this.refs.drinksError) {
        this.refs.drinksError.hidden = false;
      }
      isValid = false;
    } else {
      if (this.refs.drinksError) {
        this.refs.drinksError.hidden = true;
      }
    }

    return isValid;
  }

  /**
   * Moves to the next step
   */
  nextStep = () => {
    if (this.currentStep === 1) {
      if (!this.validateStep1()) {
        const firstError = this.querySelector(
          ".quote-modal__error:not([hidden])",
        );
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        return;
      }
      this.currentStep = 2;
      this.updateStepDisplay();
    } else if (this.currentStep === 2) {
      if (!this.validateStep2()) {
        const firstError = this.querySelector(
          ".quote-modal__error:not([hidden])",
        );
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        return;
      }
      this.currentStep = 3;
      this.updateStepDisplay();
    }
  };

  /**
   * Moves to the previous step
   */
  previousStep = () => {
    if (this.currentStep === 2) {
      this.currentStep = 1;
      this.updateStepDisplay();
    } else if (this.currentStep === 3) {
      this.currentStep = 2;
      this.updateStepDisplay();
    }
  };

  /**
   * Goes directly to a specific step number.
   * @param {number} step
   */
  goToStep(step) {
    this.currentStep = step;
    this.updateStepDisplay();
  }

  /**
   * Updates the display to show the current step
   */
  updateStepDisplay() {
    [this.refs.step1, this.refs.step2, this.refs.step3].forEach(
      (step, index) => {
        if (step) {
          if (index + 1 === this.currentStep) {
            step.hidden = false;
            step.style.display = "flex";
          } else {
            step.hidden = true;
            step.style.display = "none";
          }
        }
      },
    );

    const modalWrapper = this.closest(".quote-modal__wrapper");
    if (modalWrapper) {
      const progressSteps = modalWrapper.querySelectorAll(
        ".quote-modal__progress-step",
      );
      progressSteps.forEach((step) => {
        const stepNumber = parseInt(
          step.getAttribute("data-progress-step"),
          10,
        );
        if (stepNumber <= this.currentStep) {
          step.classList.add("quote-modal__progress-step--active");
        } else {
          step.classList.remove("quote-modal__progress-step--active");
        }
      });
    }
  }

  /**
   * Adds a new delivery date field
   */
  addDeliveryDate = () => {
    this.deliveryDates.push({
      id: Date.now(),
      date: "",
      time: "",
    });
    console.log("Add delivery date clicked", this.deliveryDates);
  };

  /**
   * Sets up form submission handler
   */
  setupFormSubmission() {
    if (this.refs.form) {
      this.refs.form.addEventListener("submit", this.handleFormSubmit);
    }
  }

  /**
   * Handles form submission with native browser submit.
   * Shopify.captcha.protect injects the CAPTCHA token first, then we let the
   * browser do a normal POST to /contact. Shopify will redirect to /challenge
   * if needed (user solves CAPTCHA there), then back to the page with
   * ?contact_posted=true which triggers the success banner on page load.
   * @param {SubmitEvent} event
   */
  handleFormSubmit = async (event) => {
    event.preventDefault();

    this.setSubmitMessage("", "hidden");

    const inIframe = (() => {
      try { return window.self !== window.top; } catch (_) { return true; }
    })();
    const inDesignMode =
      document.documentElement?.classList?.contains("shopify-design-mode") || false;

    if (inIframe || inDesignMode) {
      this.setSubmitMessage(
        "This form can\u2019t be submitted inside the theme editor. Open the preview in a new tab.",
        "error",
      );
      return;
    }

    this.prepareShopifyContactFields();

    const formEl = this.refs.form;
    if (!formEl) {
      this.setSubmitMessage("Something went wrong. Please refresh and try again.", "error");
      return;
    }

    const submitBtn = /** @type {HTMLButtonElement|null} */ (this.refs.submitButton);
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting\u2026"; }

    /** @type {any} */
    const shopifyCaptcha = /** @type {any} */ (window)?.Shopify?.captcha;
    if (shopifyCaptcha && typeof shopifyCaptcha.protect === "function") {
      shopifyCaptcha.protect(formEl, () => {
        formEl.submit();
      });
    } else {
      formEl.submit();
    }
  };

  /**
   * Shows or hides an inline status message inside the modal.
   * @param {string} message
   * @param {"success"|"error"|"hidden"} variant
   */
  setSubmitMessage(message, variant = "hidden") {
    /** @type {HTMLElement | null} */
    const el = /** @type {any} */ (this.refs)?.submitMessage || null;
    if (!el) return;
    el.textContent = message || "";
    el.hidden = variant === "hidden";
    el.classList.remove("quote-modal__submit-message--success", "quote-modal__submit-message--error");
    if (variant === "success") el.classList.add("quote-modal__submit-message--success");
    if (variant === "error") el.classList.add("quote-modal__submit-message--error");
  }

  /**
   * Populates Shopify's built-in contact form hidden fields before submit.
   */
  prepareShopifyContactFields() {
    const formEl = this.refs.form;
    if (!formEl) throw new Error("Quote form element not found");

    const raw = new FormData(formEl);

    const name = String(raw.get("name") || "").trim();
    const email = String(raw.get("email") || "").trim();
    const company = String(raw.get("company") || "").trim();
    const phoneCode = String(raw.get("phone_code") || "").trim();
    const phone = String(raw.get("phone") || "").trim();
    const address = String(raw.get("address") || "").trim();
    const suburb = String(raw.get("suburb") || "").trim();
    const postcode = String(raw.get("postcode") || "").trim();
    const attendees = String(raw.get("attendees") || "").trim();
    const eventDate = String(raw.get("event_date") || "").trim();
    const time = String(raw.get("time") || "").trim();
    const dietary = String(raw.get("dietary_requirements") || "").trim();
    const otherDetails = String(raw.get("other_details") || "").trim();

    const eventTypes = raw.getAll("event_type").map(String);
    const foodStyles = raw.getAll("food_style").map(String);

    const budgetType = String(raw.get("budget_type") || "").trim();
    const eventBudget = String(raw.get("event_budget") || "").trim();
    const cutleryPlates = String(raw.get("cutlery_plates") || "").trim();
    const eventCategory = String(raw.get("event_category") || "").trim();
    const drinksRequired = String(raw.get("drinks_required") || "").trim();

    const bodyLines = [
      "Quote request (Get Quote modal)",
      "",
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${[phoneCode, phone].filter(Boolean).join(" ")}`,
      `Address: ${address}`,
      `Suburb: ${suburb}`,
      `Postcode: ${postcode}`,
      `Attendees: ${attendees}`,
      `Event date: ${eventDate}`,
      `Event time: ${time}`,
      "",
      `Budget type: ${budgetType}`,
      `Event budget: ${eventBudget}`,
      `Event type(s): ${eventTypes.join(", ")}`,
      `Food style(s): ${foodStyles.join(", ")}`,
      `Cutlery & plates: ${cutleryPlates}`,
      `Event category: ${eventCategory}`,
      `Drinks required: ${drinksRequired}`,
      "",
      `Dietary requirements: ${dietary}`,
      `Other details: ${otherDetails}`,
    ];

    /** @param {string} selector @param {string} value */
    const setHidden = (selector, value) => {
      const input = formEl.querySelector(selector);
      if (input) input.value = value;
    };

    setHidden('input[name="contact[name]"]', name || company || "Quote request");
    setHidden('input[name="contact[email]"]', email);
    setHidden(
      'input[name="contact[phone]"]',
      [phoneCode, phone].filter(Boolean).join(" "),
    );
    setHidden('textarea[name="contact[body]"]', bodyLines.join("\n"));
  }
}

if (!customElements.get("quote-form-component")) {
  customElements.define("quote-form-component", QuoteFormComponent);
}

window.openQuoteModal = function () {
  const modal = document.getElementById("quote-modal");
  if (modal && modal.refs?.dialog) {
    modal.showDialog();
  }
};

