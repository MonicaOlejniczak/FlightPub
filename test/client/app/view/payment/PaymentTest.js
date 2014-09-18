/**
 * @author Monica Olejniczak
 */
describe("The payment page", function () {

    Ext.create('Mock.store.PaymentTypeMock');
    var view = Ext.create('FB.view.booking.payment.Payment');

    describe("has a form submission", function () {

        var firstName = view.down('#firstName');
        var lastName = view.down('#lastName');
        var phoneNumber = view.down('#phoneNumber');
        var address = view.down('#address');
        var suburb = view.down('#suburb');
        var postcode = view.down('#postcode');
        var country = view.down('#country');
        var state = view.down('#state');
        var paymentMethod = view.down('#paymentMethod');

        it("does not submit when there is no data", function () {
            firstName.setValue("");
            lastName.setValue("");
            phoneNumber.setValue("");
            address.setValue("");
            suburb.setValue("");
            postcode.setValue("");
            country.setValue("");
            state.setValue("");
            paymentMethod.setValue("");
            expect(view.isValid()).toBeFalse();
        });

        it("does submits with valid data", function () {
            firstName.setValue("John");
            lastName.setValue("Smith");
            phoneNumber.setValue("0444444444");
            address.setValue("111 Pleasant Street");
            suburb.setValue("PleasantVille");
            postcode.setValue("2200");
            country.setValue("Australia");
            state.setValue("NSW");
            paymentMethod.setValue("Visa");
            expect(view.isValid()).toBeTrue();
        });

        describe("has a first name", function () {

            beforeEach(function () {
                lastName.setValue("Smith");
                phoneNumber.setValue("0444444444");
                address.setValue("111 Pleasant Street");
                suburb.setValue("PleasantVille");
                postcode.setValue("2200");
                country.setValue("Australia");
                state.setValue("NSW");
                paymentMethod.setValue("Visa");
            });

            it("does not submit when its value is empty", function () {
                firstName.setValue("");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value is more than 30 characters", function () {
                firstName.setValue("abcdefghijklmnopqrstuvwxyz12345");
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when its value is 30 characters", function () {
                firstName.setValue("abcdefghijklmnopqrstuvwxyz1234");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is one character", function () {
                firstName.setValue("a");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is less than 30 characters", function () {
                firstName.setValue("abc");
                expect(view.isValid()).toBeTrue();
            });

        });

        describe("has a last name name", function () {

            beforeEach(function () {
                firstName.setValue("John");
                phoneNumber.setValue("0444444444");
                address.setValue("111 Pleasant Street");
                suburb.setValue("PleasantVille");
                postcode.setValue("2200");
                country.setValue("Australia");
                state.setValue("NSW");
                paymentMethod.setValue("Visa");
            });

            it("does not submit when its value is empty", function () {
                lastName.setValue("");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value is more than 30 characters", function () {
                lastName.setValue("abcdefghijklmnopqrstuvwxyz12345");
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when its value is 30 characters", function () {
                lastName.setValue("abcdefghijklmnopqrstuvwxyz1234");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is one character", function () {
                lastName.setValue("a");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is less than 30 characters", function () {
                lastName.setValue("abc");
                expect(view.isValid()).toBeTrue();
            });

        });

        describe("has a phone number", function () {

            beforeEach(function () {
                firstName.setValue("John");
                lastName.setValue("Smith");
                address.setValue("111 Pleasant Street");
                suburb.setValue("PleasantVille");
                postcode.setValue("2200");
                country.setValue("Australia");
                state.setValue("NSW");
                paymentMethod.setValue("Visa");
            });

            it("does not submit when its value is empty", function () {
                phoneNumber.setValue("");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value is one digit", function () {
                phoneNumber.setValue("1");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value is six digits", function () {
                phoneNumber.setValue("123456");
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when its value is seven digits", function () {
                phoneNumber.setValue("1234567");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is less than 15 digits and more than 6 digits", function () {
                phoneNumber.setValue("123456789");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value 15 digits", function () {
                phoneNumber.setValue("123456789123456");
                expect(view.isValid()).toBeTrue();
            });

            it("does not submit when its value is more than 15 digits", function () {
                phoneNumber.setValue("1234567891234567");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value contains characters", function () {
                phoneNumber.setValue("1234abcd");
                expect(view.isValid()).toBeFalse();
                phoneNumber.setValue("abcd1234");
                expect(view.isValid()).toBeFalse();
            });

            it("does not submit when its value contains symbols", function () {
                phoneNumber.setValue("1234!?@?#");
                expect(view.isValid()).toBeFalse();
                phoneNumber.setValue("!?@?#1234");
                expect(view.isValid()).toBeFalse();
            });

        });

        describe("has a payment method", function () {

            beforeEach(function () {
                firstName.setValue("John");
                lastName.setValue("Smith");
                phoneNumber.setValue("0444444444");
                address.setValue("111 Pleasant Street");
                suburb.setValue("PleasantVille");
                postcode.setValue("2200");
                country.setValue("Australia");
                state.setValue("NSW");
            });

            it("does not submit when its value is empty", function () {
                paymentMethod.setValue("");
                expect(view.isValid()).toBeFalse();
            });

            it("does submit when its value is Visa", function () {
                paymentMethod.setValue("Visa");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is Mastercard", function () {
                paymentMethod.setValue("Mastercard");
                expect(view.isValid()).toBeTrue();
            });

            it("does submit when its value is Paypal", function () {
                paymentMethod.setValue("Paypal");
                expect(view.isValid()).toBeTrue();
            });

        });

    });

});