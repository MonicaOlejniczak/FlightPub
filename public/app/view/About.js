Ext.define('FB.view.About', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.container.Container',
		'FB.view.AboutController'
	],
	xtype: 'About',
	controller: 'About',
	itemId: 'About',
	cls: 'smallerContent',
	tpl: '{content}',
	data: {
		content: 'FlightPub is a new Australian company within the Air Travel industry. The company aims to provide' +
			'customers with extensive options for booking flights for their travels. <br />In order to be' +
			'competitive in a crowded market, FlightPub has dedicated enormous effort to ensuring their online' +
			'booking system is efficient, user-friendly and hassle-free. You can use this system as a non-registered' +
			'member, or, if you wish to gain access to the more advanced features of the site, you can register as a' +
			'full member for free!'
	}
});
