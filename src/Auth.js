class Auth {
    static #isAuthed
    constructor() {
        Auth.#isAuthed = false;
    }
    logIn() {
        Auth.#isAuthed = true;

    }
    logOut() {
        Auth.#isAuthed = false;

    }
    isAuthed() { return Auth.#isAuthed }
}
export default new Auth();