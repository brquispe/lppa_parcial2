import { API_URL } from "./script.js";

class Auth {
  #LOGIN_KEY = 'isLoggedIn';
  #isLoggedIn;
  /** @type {{email: string | null}} */
  #userDetail

  constructor() {
    this.#isLoggedIn = this.isLogged;
    if (this.#isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem(this.#LOGIN_KEY) ?? '')
      this.#userDetail = userData
    }
  }

  /**
   * @param {{email: string, password: string}} data
   */
  async login(data) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    this.#userDetail = {
      email: data.email
    }
    localStorage.setItem(this.#LOGIN_KEY, JSON.stringify(this.#userDetail));
  }

  logout() {
    localStorage.removeItem(this.#LOGIN_KEY);
  }

  get isLogged() {
    const isLoggedIn = localStorage.getItem(this.#LOGIN_KEY);
    return !!isLoggedIn;
  }

  get userDetail() {
    return this.#userDetail
  }
}

export const auth = new Auth();
