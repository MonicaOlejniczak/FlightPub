/**
 * @author Julius Myszkowski
 */

Ext.define('Test.Sqrt', {
    sqrt: function(x) {
        if (x < 0) throw new Error("sqrt can't work on negative number");
        return Math.exp(Math.log(x)/2);
    }
});