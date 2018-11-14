# couchbase-session
POC for session manager (like koa.js couchbase sessionconnector) using couchbase as external source



 *Requires Node 7.6 *
## Prerequisites
	Couchbase DB 5.5.x
	Remote API sending valid JSON and configure it  in serviceConfig file


## Routes Exposed 
	 users/session/:id
	 users/getMetaLinks


## Installation
	Clone the repository
	npm install
	npm start

### External Session Stores
  You can store the session content in external stores (Couchbase or other DBs) by passing `options.store` with three methods (these need to be async functions):

  - `getSession(key)`: get session object by key
  - `setSession(key, sess,ttl})`: set session object for key, with a `ttl(timeToLeave)` (in ms)
  - `destroySession(key)`: destroy session for key


  Once you pass `options.store`, session storage is dependent on your external store -- you can't access the session if your external store is down.
