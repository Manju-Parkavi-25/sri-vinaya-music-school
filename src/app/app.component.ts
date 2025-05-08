import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sri Vinaya School of Music';
   // Form declaration
   contactForm: FormGroup;
   submitted = false;
   formSuccess = false;
   
   /**
    * Constructor initializes form builder
    * @param fb - FormBuilder service injected via dependency injection
    */
   constructor(private fb: FormBuilder) {
     // Initialize the contact form with empty values
     this.contactForm = this.fb.group({
       name: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       phone: ['', Validators.required],
       subject: ['', Validators.required],
       message: ['', Validators.required]
     });
   }
 
   /**
    * Lifecycle hook that runs when component initializes
    */
   ngOnInit(): void {
     // Add Bootstrap script dynamically to ensure carousel functionality
     this.loadBootstrapScript();
     
     // Add event listener for smooth scrolling on page load
     this.setupSmoothScrolling();
     
     // Setup the navbar scroll effect
     this.setupNavbarScroll();
   }
 
   /**
    * Getter for easy access to form fields
    */
   get f() {
     return this.contactForm.controls;
   }
 
   /**
    * Handle form submission
    */
   onSubmit(): void {
     this.submitted = true;
 
     // Stop if form is invalid
     if (this.contactForm.invalid) {
       return;
     }
 
     // In a real application, you would send this data to your backend
     console.log('Form submitted:', this.contactForm.value);
     
     // Show success message and reset form
     this.formSuccess = true;
     setTimeout(() => {
       this.formSuccess = false;
       this.submitted = false;
       this.contactForm.reset();
     }, 3000);
   }
 
   /**
    * Scroll to a specific section
    * @param sectionId - ID of the section to scroll to
    */
   scrollToSection(sectionId: string): void {
     const element = document.getElementById(sectionId);
     if (element) {
       element.scrollIntoView({ behavior: 'smooth' });
     }
   }
 
   /**
    * Initialize smooth scrolling for all anchor links
    */
   private setupSmoothScrolling(): void {
     document.addEventListener('DOMContentLoaded', () => {
       // Get all anchor links
       const links = document.querySelectorAll('a[href^="#"]');
       
       // Add click event listener to each link
       links.forEach(link => {
         link.addEventListener('click', (e) => {
           e.preventDefault();
           
           // Get the target element
           const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
           if (targetId) {
             const targetElement = document.getElementById(targetId);
             if (targetElement) {
               // Scroll to the element
               targetElement.scrollIntoView({ behavior: 'smooth' });
             }
           }
         });
       });
     });
   }
 
   /**
    * Load Bootstrap JS dynamically
    * Note: In a production app, you'd likely include this in angular.json
    */
   private loadBootstrapScript(): void {
     const script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
     script.integrity = 'sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4';
     script.crossOrigin = 'anonymous';
     document.body.appendChild(script);
   }

   /**
 * Setup navbar scroll effect - changes navbar appearance on scroll
 */
private setupNavbarScroll(): void {
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  });
}
}
