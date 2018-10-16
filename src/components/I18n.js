let _lang;

/**
 * Gets the language corresponding to the user's prefered language.
 * @returns {Promise<*>} Invoced when the language has been loaded.
 */
export async function getLang() {
	if (_lang)
		return _lang;

	let browserLanguage = navigator.language.substring(0, 2).toLowerCase();
	if(browserLanguage === 'dk')
		_lang = await fetch('./assets/LangDk.json').then(resp => resp.json());
	else if (browserLanguage === 'es')
		_lang = await fetch('./assets/LangEs.json').then(resp => resp.json());
	else
		_lang = await fetch('./assets/LangEng.json').then(resp => resp.json());
	console.log('loaded lang');
	return _lang;
}

