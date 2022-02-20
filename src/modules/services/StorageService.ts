export default class StorageService {
  /*
  Responsibilities:
    1. Direct access to localStorage
    2. CRUD on localStorage
    3. Everything must come through this layer to CRUD on localStorage
  */

  #storage: Storage;

  constructor(storage: Storage) {
    this.#storage = storage;
  }

  getItem(key: string): string | null {
    return this.#storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.#storage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.#storage.removeItem(key);
  }
}
