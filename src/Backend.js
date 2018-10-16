export default class Backend {
	/**
	 * Logs into the webapp with the given username and password.
	 * @param username {string} - The user's username
	 * @param password {string} - The user's password
	 * @param onSuccess {function} - The success callback function, takes no arguments
	 * @param onError {function} - The error callback function, takes an error message as parameter.
	 * @returns {Promise} - A promise that is either accepted or rejected depending on the response from the server.
	 */
	static login(username, password) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 500);
		});
	}

	static getShoppingListItems() {
		let p = new Promise(((resolve, reject) => {
			let items = {};
			items['Fruits & Vegetables'] = ['Potatoes', 'Carrots'];
			items['Dry Goods'] = ['Rice', 'Paste', 'Flour'];
			items.Household = ['WC Cleaner', 'Ajax'];
			setTimeout(() => resolve(items), 1000);
		}));
		return p;
	}

	static addShoppingListItem(name, category) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 800);
		});
	}
	static updateShoppingListItem(oldName, newName, newCategory) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 800);
		});
	}
}