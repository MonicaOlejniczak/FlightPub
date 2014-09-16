/**
 * Created by Julius Myszkowski on 12/09/2014.
 */

describe("sqrt", function() {
    var obj = Ext.create('Test.Sqrt');
    it("should compute the square root of 4 as 2", function() {
        expect(obj.sqrt(4)).toEqual(2);
        //Ext.define('hello', {});
    });
});
