class StorageService {
  /*
  Responsibilities:
    1. Direct access to LocalStorage
    2. CRUD on LocalStorage
    3. Everything must come through this layer to CRUD on LocalStorage
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

  clear(): void {
    this.#storage.clear();
  }

  getLength(): number {
    return this.#storage.length;
  }
}

export default StorageService;
