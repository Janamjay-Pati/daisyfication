import { Injectable } from '@angular/core';
import { auth } from './firebase.service'; // Import the initialized auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Sign up
  async signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign in
  async signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign out
  async logout(): Promise<void> {
    return signOut(auth);
  }
}