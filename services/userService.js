const app = require('../app');
const remoteServices = require('../config/remoteServices.config');
const requestPromise = require('request-promise');
const logger = require('../config/winston');

class UserService {

	async getSessionData(sessionId = '0', ttl) {
		try {
			const dbData = await app.dbAdapter.getSession(sessionId);
		} catch (err) {
			logger.error(`getSession error,${err.status}`);
		}
		if (dbData) {
			return dbData
		} else {
			const profileData = await this.getProfileFormServer();
			const generatedId = `sid +${Date.now()}`;
			try {
				const updatedData = await app.dbAdapter.setSession(generatedId, profileData, ttl);
				return updatedData;
			} catch (err) {
				logger.error(`getSession error,${err.status}`);
			}
		}
	}
	getProfileFormServer() {
		let options = {
			uri: remoteServices.profileUrl,
			headers: {
				'User-Agent': 'Request-Promise'
			},
			json: true // Automatically parses the JSON string in the response
		};
		return requestPromise(options)
	}
}

module.exports = UserService;