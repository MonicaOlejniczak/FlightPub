/**
 * @author Monica Olejniczak
 */
describe("The login page", function () {

    describe("has a form submission", function () {

        beforeEach(function () {
            this.view = Ext.create('FB.view.authentication.login.Login');
            this.email = this.view.down('#email');
            this.password = this.view.down('#password');
        });

        it("does not submit when there is no data", function () {
            this.email.setValue('');
            this.password.setValue('');
            expect(this.view.isValid()).toBeFalse();
        });

        it("submits with a valid email and password", function () {
            this.email.setValue('a@b.com');
            this.password.setValue('password');
            expect(this.view.isValid()).toBeTrue();
        });

        describe("has an email", function () {

            beforeEach(function () {
                this.view = Ext.create('FB.view.authentication.login.Login');
                this.email = this.view.down('#email');
                this.password = this.view.down('#password');
                this.password.setValue('password');
            });

            it("does not submit when its value is empty", function () {
                this.email.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it("does not submit when its value is not of the form a@b.com", function () {
                this.email.setValue("a.com");
                expect(this.view.isValid()).toBeFalse();
                this.email.setValue("a.com@");
                expect(this.view.isValid()).toBeFalse();
                this.email.setValue('@a.com');
                expect(this.view.isValid()).toBeFalse();
            });

            it("does submit when its value is of the form a@b.com", function () {
                this.email.setValue('a@b.com');
                expect(this.view.isValid()).toBeTrue();
            });

        });

        describe("has a password", function () {

            beforeEach(function () {
                this.view = Ext.create('FB.view.authentication.login.Login');
                this.email = this.view.down('#email');
                this.password = this.view.down('#password');
                this.email.setValue('a@b.com');
            });

            it("does not submit when its value is empty", function () {
                this.password.setValue('');
                expect(this.view.isValid()).toBeFalse();
            });

            it("does not submit when its value is 1 character", function () {
                this.password.setValue('1');
                expect(this.view.isValid()).toBeFalse();
            });

            it("does not submit when its value is less than 7 characters", function () {
                this.password.setValue('1234567');
                expect(this.view.isValid()).toBeFalse();
            });

            it("submits when its value is 8 characters", function () {
                this.password.setValue('12345678');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is more than 8 characters", function () {
                this.password.setValue('123456789');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is of minimum length and only consists of numeric values", function () {
                this.password.setValue('12345678');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is of minimum length and only consists of symbols", function () {
                this.password.setValue('!@#$%^&*');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is of minimum length and only consists of lower case letters", function () {
                this.password.setValue('abcdefgh');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is of minimum length and only consists of upper case letters", function () {
                this.password.setValue('ABCDEFGH');
                expect(this.view.isValid()).toBeTrue();
            });

            it("submits when its value is of minimum length and consists of a mixture of numbers, symbols, lower and upper case letters", function () {
                this.password.setValue('pa@s5Wo$d4YoU!?');
                expect(this.view.isValid()).toBeTrue();
            });

        });

    });

});