/**
 * @author Monica Olejniczak
 */
describe('The payment page', function () {

    Ext.create('Mock.store.PaymentTypeMock');

    describe('has a form submission', function () {

        beforeEach(function () {
            this.view = Ext.create('FB.view.booking.payment.Payment');
            
            this.firstName = this.view.down('#firstName');
            this.lastName = this.view.down('#lastName');
            this.phoneNumber = this.view.down('#phoneNumber');
            this.address = this.view.down('#address');
            this.suburb = this.view.down('#suburb');
            this.postcode = this.view.down('#postcode');
            this.country = this.view.down('#country');
            this.state = this.view.down('#state');
            this.paymentMethod = this.view.down('#paymentMethod');
            
            // set the valid data
            this.firstName.setValue('John');
            this.lastName.setValue('Smith');
            this.phoneNumber.setValue('0444444444');
            this.address.setValue('111 Pleasant Street');
            this.suburb.setValue('PleasantVille');
            this.postcode.setValue('2200');
            this.country.setValue('Australia');
            this.state.setValue('NSW');
            this.paymentMethod.setValue('Visa');
        });

        it('does not submit when there is no data', function () {
            this.firstName.setValue('');
            this.lastName.setValue('');
            this.phoneNumber.setValue('');
            this.address.setValue('');
            this.suburb.setValue('');
            this.postcode.setValue('');
            this.country.setValue('');
            this.state.setValue('');
            this.paymentMethod.setValue('');
            expect(this.view.isValid()).toBeFalse();
        });

        it('does submits with valid data', function () {
            expect(this.view.isValid()).toBeTrue();
        });

        describe('has a first name', function () {

            it('does not submit when its value is empty', function () {
                this.firstName.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 30 characters', function () {
                this.firstName.setValue('abcdefghijklmnopqrstuvwxyz12345');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 30 characters', function () {
                this.firstName.setValue('abcdefghijklmnopqrstuvwxyz1234');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is one character', function () {
                this.firstName.setValue('a');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 30 characters', function () {
                this.firstName.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.firstName.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.firstName.setValue('ABC');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.firstName.setValue('John');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a last name', function () {

            it('does not submit when its value is empty', function () {
                this.lastName.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 30 characters', function () {
                this.lastName.setValue('abcdefghijklmnopqrstuvwxyz12345');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 30 characters', function () {
                this.lastName.setValue('abcdefghijklmnopqrstuvwxyz1234');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is one character', function () {
                this.lastName.setValue('a');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 30 characters', function () {
                this.lastName.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.lastName.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.lastName.setValue('ABC');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.lastName.setValue('John');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a phone number', function () {

            it('does not submit when its value is empty', function () {
                this.phoneNumber.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is one digit', function () {
                this.phoneNumber.setValue('1');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is six digits', function () {
                this.phoneNumber.setValue('123456');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is seven digits', function () {
                this.phoneNumber.setValue('1234567');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 15 digits and more than 6 digits', function () {
                this.phoneNumber.setValue('123456789');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value 15 digits', function () {
                this.phoneNumber.setValue('123456789123456');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does not submit when its value is more than 15 digits', function () {
                this.phoneNumber.setValue('1234567891234567');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value contains characters', function () {
                this.phoneNumber.setValue('1234abcd');
                expect(this.view.isValid()).toBeFalse();
                this.phoneNumber.setValue('abcd1234');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value contains symbols', function () {
                this.phoneNumber.setValue('1234!?@?#');
                expect(this.view.isValid()).toBeFalse();
                this.phoneNumber.setValue('!?@?#1234');
                expect(this.view.isValid()).toBeFalse();
            });

        });

        describe('has an address', function () {

            it('does not submit when its value is empty', function () {
                this.address.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 30 characters', function () {
                this.address.setValue('abcdefghijklmnopqrstuvwxyz12345');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 30 characters', function () {
                this.address.setValue('abcdefghijklmnopqrstuvwxyz1234');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is ten characters', function () {
                this.address.setValue('abcdefghij');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 30 characters and more than 10', function () {
                this.address.setValue('abcdefghijklmnopqrstuvqxyz');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.address.setValue('abcdefghijklmnopqr');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.address.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.address.setValue('abcdefghijklmNOPQRSTUVQXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains spaces', function () {
                this.address.setValue('ABCDEF GHIJKL MNOPQRS TUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains numbers', function () {
                this.address.setValue('1234567891');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a suburb', function () {

            it('does not submit when its value is empty', function () {
                this.suburb.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 30 characters', function () {
                this.suburb.setValue('abcdefghijklmnopqrstuvwxyz12345');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 30 characters', function () {
                this.suburb.setValue('abcdefghijklmnopqrstuvwxyz1234');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is two characters', function () {
                this.suburb.setValue('ab');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 30 characters and more than 2', function () {
                this.suburb.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.suburb.setValue('abcdefghijklmnopqr');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.suburb.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.suburb.setValue('abcdefghijklmNOPQRSTUVQXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains spaces', function () {
                this.suburb.setValue('ABCDEF GHIJKL MNOPQRS TUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a country', function () {

            it('does not submit when its value is empty', function () {
                this.country.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 75 characters', function () {
                this.country.setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwx');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 75 characters', function () {
                this.country.setValue('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvw');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is 4 characters', function () {
                this.country.setValue('abcd');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 75 characters and more than 4', function () {
                this.country.setValue('abcdefgh');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.country.setValue('abcdefghijklmnopqr');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.country.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.country.setValue('abcdefghijklmNOPQRSTUVQXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains spaces', function () {
                this.country.setValue('ABCDEF GHIJKL MNOPQRS TUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a state', function () {

            it('does not submit when its value is empty', function () {
                this.state.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is more than 30 characters', function () {
                this.state.setValue('abcdefghijklmnopqrstuvwxyzabcde');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is 30 characters', function () {
                this.state.setValue('abcdefghijklmnopqrstuvwxyzabcd');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is 3 characters', function () {
                this.state.setValue('abc');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is less than 30 characters and more than 3', function () {
                this.state.setValue('abcdefgh');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains lower case letters', function () {
                this.state.setValue('abcdefghijklmnopqr');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains upper case letters', function () {
                this.state.setValue('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains both upper and lower case letters', function () {
                this.state.setValue('abcdefghijklmNOPQRSTUVQXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value contains spaces', function () {
                this.state.setValue('ABCDEF GHIJKL MNOPQRS TUVWXYZ');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a payment method', function () {

            it('does not submit when its value is empty', function () {
                this.paymentMethod.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is Visa', function () {
                this.paymentMethod.setValue('Visa');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is Mastercard', function () {
                this.paymentMethod.setValue('Mastercard');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is Paypal', function () {
                this.paymentMethod.setValue('Paypal');
                expect(this.view.isValid()).toBeTrue();
            });

        });

    });

});