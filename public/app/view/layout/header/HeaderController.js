/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.HeaderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Header',
	control: {
		'#logo': {
			click: function () {
				this.fireEvent('redirect');
			}
		}
	},
    updateAdvertisement: function () {
        var advertisement = this.getView().down('#advertisement');
        var random = Math.floor((Math.random() * 9));
        var path = Ext.String.format('assets/images/banners/banner-{0}.jpg', random);
        advertisement.setStyle({
            'background-image': Ext.String.format('url("{0}")', path)
        });
    }
});
