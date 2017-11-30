/**
 *
 * @param data
 * @return data
 */

export const normalizeData = (data) => {
	/* TODO */
	return data;
};

/**
 * @param {number} milliseconds - wait time
 * @param [ret=true] - promise return value
 * @returns {Promise}
 * Wait for x milliseconds and return Promise
 */
export async function waitfor(milliseconds, ret = true) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(ret);
		}, milliseconds);
	});
}
