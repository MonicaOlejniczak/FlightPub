/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.layout.header.HeaderController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Header',
    advertisement: true,
	control: {
		'#logo': {
			click: function () {
				this.fireEvent('redirect');
			}
		}
	},
    init: function () {
        this.getView().down('#navigation').on({
            'add-ads': 'onAddAds',
            'remove-ads': 'onRemoveAds'
        });
    },
    onRemoveAds: function () {
        this.advertisement = false;
        this.updateAdvertisement();
    },
    onAddAds: function () {
        this.advertisement = true;
        this.updateAdvertisement();
    },
    updateAdvertisement: function () {
        var advertisement = this.getView().down('#advertisement');
        if (this.advertisement === true) {
            var random = Math.floor((Math.random() * 9));
            var path = Ext.String.format('assets/images/banners/banner-{0}.jpg', random);
            advertisement.setStyle({
                'background-image': Ext.String.format('url("{0}")', path)
            });
        } else {
            advertisement.setStyle({
                'background-image': ''
            });
        }
    }
});
