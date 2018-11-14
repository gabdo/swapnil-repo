let userSessionData = {
	data: {
		isAuthenticated: true,
		sessionID: 'chcoitu2wcg24rbnuvqwupcf',
		clientIPAddress: '219.65.93.121',
		sessionTimeOutInMinutes: 20,
		dateUtc: '2018-10-05T07:28:54',
		brsrMember: {
			emailAddress: 'harsh.g@gmail.com',
			personId: 31850093,
			title: 'Mr',
			firstName: 'harsh',
			middleName: null,
			lastName: 'g',
			fullName: null,
			gender: 'M',
			phoneNumber: '9881196494',
			organisationName: '',
			customerType: '',
			countryOfResidence: 'IN',
			dateOfBirth: '06Feb1981',
			accounts: [{
				option: 'sk',
				id: '00574816546',
				memberStatus: 'ACT',
				status: 'ksw',
				rewardBalance: 10375,
				expiringMiles: 10375,
				dateOfMilesExpiry: '2022-02-28T00:00:00'
			}, {
				option: 'Business',
				id: '',
				memberStatus: '',
				status: '',
				rewardBalance: 0,
				expiringMiles: 0,
				dateOfMilesExpiry: '0001-01-01T00:00:00'
			}]
		},
		familyGroup: {
			id: '00912373324',
			name: 'fam',
			status: 'ACT',
			isGroupHead: true,
			contributionPercentage: 0,
			rewardBalance: '0',
			expiringMiles: '0',
			dateOfMilesExpiry: null
		}
	},
	metaLinks: [{
		href: 'http://www.abc.com:81/api/login-session',
		rel: 'self',
		method: 'GET'
	}, {
		href: 'http://www.abc.com:81/api/login-session',
		rel: 'related',
		method: 'POST'
	}, {
		href: 'http://www.xyz.com:81/api/login-session/clear',
		rel: 'related',
		method: 'POST'
	}]
};

module.exports = userSessionData;