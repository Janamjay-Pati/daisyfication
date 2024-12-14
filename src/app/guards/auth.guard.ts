import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { auth } from '../services/firebase.service'; // Import the initialized auth instance

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router); // Inject Router to handle navigation
  const user = auth.currentUser; // Check the current user's authentication status

  if (user) {
    return true; // Allow access if the user is logged in
  }

  // Redirect to login page if not authenticated
  await router.navigate(['/auth']);
  return false;
};