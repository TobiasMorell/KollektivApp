import App from './components/app.js';
import { route } from 'preact-router';

export default class Backend {
	/**
	 * Sends a request to the backend.
     * @param url {string} - The url to send the url to.
     * @param httpMethod {string} - The method to send to
     * @param form {FormData} - The body to send with the request.
     * @param isJson {boolean} - A flag to indicate that we expect a JSON result
     * @returns {Promise<Response | never>}
     * @private
     */
	static async _osteRequest(url, httpMethod, form = null, isJson = false) {
		let res = await fetch(url,
			{
				method: httpMethod,
				mode: 'cors',
				redirect: 'follow',
				/*cache: 'no-cache',*/
				credentials: 'include',
				body: form
			});

		if (res.ok) {
			let parsedResponse;
			if (isJson)
				parsedResponse = await res.json();
			else
				parsedResponse = await res.text();
			return parsedResponse;
		}

		if (res.status === 401) {
			route('/login');
		}

		let error = await res.text();
		App.Snackbar.MDComponent.show({ message: error });
		throw Error(error);
	}

	/**
	 * Logs into the webapp with the given username and password.
	 * @param loginForm {FormData} - A login form containing username and password
	 * @returns {Promise} - A promise that is either accepted or rejected depending on the response from the server.
	 */
	static async login(loginForm) {
		return await this._osteRequest('/api/login', 'POST', loginForm);
	}

	/**
	 * Logs out of the app.
     * @returns {Promise<Response | never>}
     */
	static async logout() {
		return await fetch('/api/logout',
			{
				method: 'POST'
			}).then(r => r.json());
	}

	/**
	 * Registers a new account with the app.
     * @param registerForm {FormData} - A form containing registration data.
     * @returns {Promise<Response|never>}
     */
	static async register(registerForm) {
		return await this._osteRequest('/api/register', 'POST', registerForm);
	}

	/**
	 * Update the user's password.
     * @param updatePasswordform {FormData} - A form containing update form data.
     * @returns {Promise<Response|never>}
     */
	static async updatePassword(updatePasswordform) {
		return await this._osteRequest('/api/resetpassword', 'POST', updatePasswordform);
	}

	/**
	 * Get the items on the shopping list.
     * @returns {Promise<Array|never>}
     */
	static getShoppingListItems() {
		return this._osteRequest('/api/shopping', 'GET', null, true);
	}

	/**
	 * Adds an item to the shopping list.
     * @param shoppingListForm {FormData} - A form containing information about the new item.
     * @returns {Promise<Response|never>}
     */
	static addShoppingListItem(shoppingListForm) {
		return this._osteRequest('/api/shopping', 'POST', shoppingListForm, true);
	}

	/**
	 * Update an item on the shopping list.
     * @param updateItemForm {FormData} - A form containing update information about the item.
     * @returns {Promise<Response|never>}
     */
	static updateShoppingListItem(updateItemForm) {
		return this._osteRequest('/api/shopping', 'PUT', updateItemForm, true);
	}

	static async setShoppingItemState(item, active) {
		let formData = new FormData();
		formData.append('name', item.Name);
		formData.append('category', item.Category);
		formData.append('id', item.Id);
		formData.append('active', active);

		return this.updateShoppingListItem(formData);
	}

	static deleteShoppingItem(item) {
		let formData = new FormData();
		formData.append('id', item.Id);

		return this._osteRequest('/api/shopping', 'DELETE', formData);
	}
}