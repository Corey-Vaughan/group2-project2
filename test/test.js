const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

//test log-in modal is working
nightmare
	.goto('https://vacation-station.herokuapp.com')
	.click('a[href="#login-modal"]')
	.wait('#login-modal')
	.evaluate(() => document.querySelector('#login-modal'))
	.end()
	.then(console.log)
	.catch(error => {
		console.error('That modal is not working!  Error:', error)
	});
