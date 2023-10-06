import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  get(key: string): string | null {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('Error getting from local storage', e);
      return null;
    }
  }

  set(key: string, info: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(info));
    } catch (e) {
      console.error('Error saving to local storage', e);
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
