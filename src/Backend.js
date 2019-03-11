import { route } from 'preact-router';

export default class Backend {
	static session = undefined;

	static getSessionDetails () {
		if (this.session) return this.session;
		let s = typeof window !== 'undefined' ? localStorage.getItem('session') : undefined;
		if (s) {
			let session = JSON.parse(s);
			this.session = session;
			return session;
		}
	}

	static _clearSession = () => {
		console.log('clearing session');
		Backend.session = undefined;
		localStorage.removeItem('session');
	};

	/**
	 * Sends a request to the backend.
     * @param url {string} - The url to send the url to.
     * @param httpMethod {string} - The method to send to
     * @param form {FormData} - The body to send with the request.
     * @param isJson {boolean} - A flag to indicate that we expect a JSON result
     * @returns {Promise<Response | never>}
     * @private
     */
	static _osteRequest = async (url, httpMethod, form = null, isJson = false) => {
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
		else if (res.status === 401) {
			Backend._clearSession();
			route('/osteklokken/login', true);
		}
		else {
			let error = await res.text();
			throw Error(error);
		}
	};

	/**
	 * Logs into the webapp with the given username and password.
	 * @param loginForm {FormData} - A login form containing username and password
	 * @returns {Promise} - A promise that is either accepted or rejected depending on the response from the server.
	 */
	static async login(loginForm) {
		return this._osteRequest('/api/login', 'POST', loginForm).then(s => {
			if (s) {
				let session = JSON.parse(s);
				this.session = session;
				localStorage.setItem('session', s);
				return session;
			}
			throw new Error(s ? s : 'Could not log in');
		});
	}


	/**
	 * Logs out of the app.
     * @returns {Promise<Response | never>}
     */
	static logout() {
		return fetch('/api/logout', { method: 'POST' }).then(r => {
			this._clearSession();
			return r;
		});
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

	static getShoppingListItems() {
		return this._osteRequest('/api/shopping', 'GET', null, true);
	}
	static addShoppingListItem(shoppingListForm) {
		return this._osteRequest('/api/shopping', 'POST', shoppingListForm, true);
	}
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

	static getMenuSchedule() {
		return this._osteRequest('/api/cooking', 'GET', null, true);
	}
	static addMenuSchedule(shoppingListForm) {
		return this._osteRequest('/api/cooking', 'POST', shoppingListForm, true);
	}
	static updateMenuSchedule(updateItemForm) {
		return this._osteRequest('/api/cooking', 'PUT', updateItemForm, true);
	}
	static deleteMenuSchedule(item) {
		let formData = new FormData();
		formData.append('week', item.Week);

		return this._osteRequest('/api/cooking', 'DELETE', formData);
	}

	static getKollexicon() {
		return this._osteRequest('/api/kollexicon', 'GET', null, true);
	}
	static addKollexiconRule(ruleForm) {
		return this._osteRequest('/api/kollexicon', 'POST', ruleForm, true);
	}
	static updateKollexiconRule(updateRuleForm) {
		return this._osteRequest('/api/kollexicon', 'PUT', updateRuleForm, true);
	}
	static deleteKollexiconRule(rule) {
		let formData = new FormData();
		formData.append('id', rule.Id);

		return this._osteRequest('/api/kollexicon', 'DELETE', formData);
	}

	static getFixits() {
		return this._osteRequest('/api/fixit', 'GET', null, true);
	}
	static addFixit(fixitForm) {
		return this._osteRequest('/api/fixit', 'POST', fixitForm, true);
	}
	static updateFixit(updateRuleForm) {
		return this._osteRequest('/api/fixit', 'PUT', updateRuleForm, true);
	}

	static deleteFixit(fixit) {
		let formData = new FormData();
		formData.append('id', fixit.Id);

		return this._osteRequest('/api/fixit', 'DELETE', formData);
	}
}