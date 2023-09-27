import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(keyToken: string, keyId: string, token: unknown, id: unknown): void {
    try {
      localStorage.setItem(keyToken, JSON.stringify(token));
      localStorage.setItem(keyId, JSON.stringify(id));
    } catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('Error getting from local storage', e);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from to local storage', e);
    }
  }
}
