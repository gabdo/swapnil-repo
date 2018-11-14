'use strict';

const couchbase = require('couchbase');
const logger = require('../config/winston');

class CouchbaseStore {

    constructor(options) {
        this.options = options;
        this.pool = null;
    }
    getPool() {
        const connectionUrl = `couchbase://${this.options.host}`;
        const cluster = new couchbase.Cluster();
        cluster.authenticate(this.options.username, this.options.password);
        // Will be creating the Bucket Instances once here
        this.pool = cluster.openBucket(this.options.bucket);
        return this.pool;
    }
    async getSession(sid) {
        try {
            return await this.getQueryPromise(sid);
        } catch (err) {
            logger.error(`getSession error,${err.status}`);
        }
    };
    async setSession(sid, session, ttl) {
        try {
            return await this.setQueryPromise(sid, session, parseInt(ttl));
        } catch (err) {
            logger.error(`setSession error,${err.status}`);
        }
    };
    async destroySession(sid) {
        try {
           const result = await this.deleteQueryPromise(sid);
        } catch (err) {
            logger.error(`destroySession error,${err.status}`);
        }
    };
    async getQueryPromise(sid) {
        const connection = this.getPool();
        return new Promise((resolve, reject) => {
            connection.get(sid, (err, result) => {
                if (result) {
                    resolve(result.value);
                } else if (err.code === 13) {
                    resolve(null);
                } else {
                    reject(err);
                }
            });
        })
    }
    async setQueryPromise(sid, data, ttl = 5000) {
        const connection = this.getPool();
        let options = {};
        options.expiry = ttl;
        return new Promise((resolve, reject) => {
            connection.upsert(sid, data, options, (err, result) => {
                if (result) {
                    const res = {
                        data: data,
                        sid: sid
                    }
                    resolve(res);
                } else {
                    reject(err);
                }
            });
        })
    }
    async deleteQueryPromise(sid) {
        const connection = this.getPool();
        return new Promise((resolve, reject) => {
            connection.remove(sid, (err, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        })
    }
};
module.exports = CouchbaseStore;