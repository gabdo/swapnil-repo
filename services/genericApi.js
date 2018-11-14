const app = require('../app');
const requestPromise = require('request-promise');
const logger = require('../config/winston');

class GenericService {
	async getSession(sessionId = '0', uri, ttl) {
		const sessionData = await app.dbAdapter.getSession(sessionId);
		//get from db
		let data;
		if (sessionData) {
			return sessionData;
		} else {
			try {
				data = await requestPromise.get(uri);
			} catch (err) {
				logger.error(`uri error,${err}`);
			}
			const generatedId = `sid +${Date.now()}`;
			try {
				const updatedData = await app.dbAdapter.setSession(generatedId, JSON.parse(data), ttl);
			} catch (err) {
				logger.error(`getSession error,${err}`);
			}
			return updatedData;
		}
	}
}

module.exports = GenericService;
