// lib/storage.ts
"use client";

import { User, AuthState, Client, Professional, ContactRecord } from "./types";

const STORAGE_KEYS = {
  USERS: "laburapp_users",
  AUTH: "laburapp_auth",
  CONTACTS: "laburapp_contacts",
} as const;

// Helper to check if we're on the client side
const isClient = typeof window !== "undefined";

export const storage = {
  // Get all users
  getUsers(): User[] {
    if (!isClient) return [];
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  // Save all users
  setUsers(users: User[]): void {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Add a new user
  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.setUsers(users);
  },

  // Get user by email
  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find((u) => u.email === email) || null;
  },

  // Get user by ID
  getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find((u) => u.id === id) || null;
  },

  // Update user
  updateUser(id: string, updates: Partial<User>): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates } as User;
      this.setUsers(users);
      
      // If this is the current user, update auth state
      const auth = this.getAuth();
      if (auth.user?.id === id) {
        this.setAuth({ ...auth, user: users[index] });
      }
    }
  },

  // Get auth state
  getAuth(): AuthState {
    if (!isClient) return { isAuthenticated: false, user: null };
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data ? JSON.parse(data) : { isAuthenticated: false, user: null };
  },

  // Set auth state
  setAuth(auth: AuthState): void {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  },

  // Login
  login(email: string, password: string): { success: boolean; user?: User; error?: string } {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }
    
    if (user.password !== password) {
      return { success: false, error: "Contraseña incorrecta" };
    }
    
    this.setAuth({ isAuthenticated: true, user });
    return { success: true, user };
  },

  // Logout
  logout(): void {
    this.setAuth({ isAuthenticated: false, user: null });
  },

  // Check if email exists
  emailExists(email: string): boolean {
    return this.getUserByEmail(email) !== null;
  },

  // Get all professionals (for search page)
  getProfessionals(): Professional[] {
    const users = this.getUsers();
    return users.filter((u): u is Professional => u.type === "professional");
  },

  // Contacts storage (client -> professionals messages)
  getContacts(): ContactRecord[] {
    if (!isClient) return [];
    const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    return data ? JSON.parse(data) : [];
  },

  setContacts(items: ContactRecord[]): void {
    if (!isClient) return;
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(items));
  },

  addContact(record: Omit<ContactRecord, "id">): ContactRecord {
    const contacts = this.getContacts();
    const id = "c_" + Math.random().toString(36).slice(2, 9);
    const item: ContactRecord = { id, ...record } as ContactRecord;
    contacts.unshift(item);
    this.setContacts(contacts);
    return item;
  },

  getContactsForClient(clientId: string): ContactRecord[] {
    return this.getContacts().filter((c) => c.clientId === clientId);
  },
};
