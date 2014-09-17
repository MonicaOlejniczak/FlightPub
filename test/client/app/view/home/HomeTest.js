describe("Home Test", function () {
    Ext.create('Mock.store.AirportMock');
    Ext.create('Mock.store.AdultMock');
    Ext.create('Mock.store.ChildMock');
    Ext.create('Mock.store.InfantMock');

    var view = Ext.create('FB.view.home.Home');

    it("4 should equal 2 + 2", function () {
        expect(4).toEqual(2 + 2);
    });
});