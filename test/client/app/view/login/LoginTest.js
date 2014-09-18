describe("The login page", function () {

    var view = Ext.create('FB.view.authentication.login.Login');

    describe("has a form submission", function () {

        var email = view.down('#email');
        var password = view.down('#password');

        it("does not submit when there is no data", function () {
            email.setValue("");
            password.setValue("");
            expect(view.isValid()).toBe(false);
        });

        it("submits with a valid email and password", function () {
            email.setValue("a@b.com");
            password.setValue("password");
            expect(view.isValid()).toBe(true);
        });

        describe("has an email", function () {

            beforeEach(function () {
                password.setValue("password");
            });

            it("does not submit when the email is empty", function () {
                email.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the email is not of the form a@b.com", function () {
                email.setValue("a.com");
                expect(view.isValid()).toBe(false);
            });

            it("does submit when the email is of the form a@b.com", function () {
                email.setValue("a@b.com");
                expect(view.isValid()).toBe(true);
            });

        });

        describe("has a password", function () {

            beforeEach(function () {
                email.setValue("a@b.com");
            });

            it("does not submit when the password is empty", function () {
                password.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the password is 1 character", function () {
                password.setValue("1");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the password is less than 7 characters", function () {
                password.setValue("1234567");
                expect(view.isValid()).toBe(false);
            });

            it("submits when the password is 8 characters", function () {
                password.setValue("12345678");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is more than 8 characters", function () {
                password.setValue("123456789");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is of minimum length and only consists of numeric values", function () {
                password.setValue("12345678");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is of minimum length and only consists of symbols", function () {
                password.setValue("!@#$%^&*");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is of minimum length and only consists of lower case letters", function () {
                password.setValue("abcdefgh");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is of minimum length and only consists of upper case letters", function () {
                password.setValue("ABCDEFGH");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the password is of minimum length and consists of a mixture of numbers, symbols, lower and upper case letters", function () {
                password.setValue("pa@s5Wo$d4YoU!?");
                expect(view.isValid()).toBe(true);
            });

        });

    });

});