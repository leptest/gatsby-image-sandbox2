export const slugify = (text) => text.toString().toLowerCase()
	.replace(/\s+/g, '-') // Replace spaces with -
	.replace(/[^\w-]+/g, '') // Remove all non-word chars
	.replace(/--+/g, '-') // Replace multiple - with single -
	.replace(/^-+/, '') // Trim - from start of text
	.replace(/-+$/, ''); // Trim - from end of text

/*
 * Get the first matching element in the DOM
 * @param  {String} selector The element selector
 * @param  {Node}   parent   The parent to search in [optional]
 * @return {Node}            The element
 */
export function $my(selector, parent) {
	return (parent || document).querySelector(selector);
}

/*
 * Get an array of all matching elements in the DOM
 * @param  {String} selector The element selector
 * @param  {Node}   parent   The parent to search in [optional]
 * @return {Array}           The elements
 */
export function $$my(selector, parent) {
	return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
}
