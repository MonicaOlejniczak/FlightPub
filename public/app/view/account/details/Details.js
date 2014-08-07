/**
 * @author Monica Olejniczak
 */
Ext.define('FB.view.account.details.Details', {
    extend: 'Ext.container.Container',
    initComponent: function () {
        this.defaults = Ext.apply({
            labelWidth: 300,
            maxLength: 50,
            msgTarget: 'under'
        }, this.defaults);
        return this.callParent(arguments);
    }
});
