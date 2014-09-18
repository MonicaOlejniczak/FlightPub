/**
 * @author Monica Olejniczak
 */
describe('The register page', function () {

    Ext.create('Mock.store.AccountTypeMock');

    describe('has a form submission', function () {

        beforeEach(function () {
            this.view = Ext.create('FB.view.authentication.register.Register');
            this.firstName = this.view.down('#firstName');
            this.lastName = this.view.down('#lastName');
            this.accountType = this.view.down('#accountType');
            this.email = this.view.down('#email');
            this.password = this.view.down('#password');
            this.confirmPassword = this.view.down('#confirmPassword');
            // set the valid values for each variable
            this.firstName.setValue('John');
            this.lastName.setValue('Smith');
            this.accountType.setValue('Standard User');
            this.email.setValue('a@b.com');
            this.password.setValue('password');
            this.confirmPassword.setValue('password');
        });

        it('does not submit when there is no data', function () {
            this.firstName.setValue('');
            this.lastName.setValue('');
            this.accountType.setValue('');
            this.email.setValue('');
            this.password.setValue('');
            this.confirmPassword.setValue('');
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

        describe('has an account type', function () {

            it('does not submit when its value is empty', function () {
                this.accountType.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is a standard user', function () {
                this.accountType.setValue('Standard User');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is a travel agent', function () {
                this.accountType.setValue('Travel Agent');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does submit when its value is a site manager', function () {
                this.accountType.setValue('Site Manager');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has an email', function () {

            it('does not submit when its value is empty', function () {
                this.email.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when its value is not of the form a@b.com', function () {
                this.email.setValue('a.com');
                expect(this.view.isValid()).toBeFalse();
                this.email.setValue('a.com@');
                expect(this.view.isValid()).toBeFalse();
                this.email.setValue('@a.com');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when its value is of the form a@b.com', function () {
                this.email.setValue('a@b.com');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe('has a password and confirm password', function () {

            it('does not submit when the passwords are empty', function () {
                this.password.setValue('');
                this.confirmPassword.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when the passwords do not match', function () {
                this.password.setValue('password');
                this.confirmPassword.setValue('password1');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does submit when the passwords match', function () {
                this.password.setValue('password');
                this.confirmPassword.setValue('password');
                expect(this.view.isValid()).toBeTrue();
            });

            it('does not submit when the passwords are 1 character', function () {
                this.password.setValue('1');
                this.confirmPassword.setValue('1');
                expect(this.view.isValid()).toBeFalse();
            });

            it('does not submit when the passwords are less than 7 characters', function () {
                this.password.setValue('1234567');
                this.confirmPassword.setValue('1234567');
                expect(this.view.isValid()).toBeFalse();
            });

            it('submits when the passwords are 8 characters', function () {
                this.password.setValue('12345678');
                this.confirmPassword.setValue('12345678');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are more than 8 characters', function () {
                this.password.setValue('123456789');
                this.confirmPassword.setValue('123456789');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are of minimum length and only consists of numeric values', function () {
                this.password.setValue('12345678');
                this.confirmPassword.setValue('12345678');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are of minimum length and only consists of symbols', function () {
                this.password.setValue('!@#$%^&*');
                this.confirmPassword.setValue('!@#$%^&*');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are of minimum length and only consists of lower case letters', function () {
                this.password.setValue('abcdefgh');
                this.confirmPassword.setValue('abcdefgh');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are of minimum length and only consists of upper case letters', function () {
                this.password.setValue('ABCDEFGH');
                this.confirmPassword.setValue('ABCDEFGH');
                expect(this.view.isValid()).toBeTrue();
            });

            it('submits when the passwords are of minimum length and consists of a mixture of numbers, symbols, lower and upper case letters', function () {
                this.password.setValue('pa@s5Wo$d4YoU!?');
                this.confirmPassword.setValue('pa@s5Wo$d4YoU!?');
                expect(this.view.isValid()).toBeTrue();
            });

        });

    });

});