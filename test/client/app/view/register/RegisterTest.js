describe("The register page", function () {

    Ext.create('Mock.store.AccountTypeMock');

    var view = Ext.create('FB.view.authentication.register.Register');

    describe("has a form submission", function () {

        var firstName = view.down('#firstName');
        var lastName = view.down('#lastName');
        var accountType = view.down('#accountType');
        var email = view.down('#email');
        var password = view.down('#password');
        var confirmPassword = view.down('#confirmPassword');

        function setValue(component, value) {
            component.setValue(value);
            if (value !== "" && value !== null) {
                component.fireEvent('select', component, component.getValue());
            }
        }

        it("does not submit when there is no data", function () {
            firstName.setValue("");
            lastName.setValue("");
            accountType.setValue("");
            email.setValue("");
            password.setValue("");
            confirmPassword.setValue("");
            expect(view.isValid()).toBe(false);
        });

        it("does submits with valid data", function () {
            firstName.setValue("John");
            lastName.setValue("Smith");
            accountType.setValue("Standard User");
            email.setValue("a@b.com");
            password.setValue("password");
            confirmPassword.setValue("password");
            expect(view.isValid()).toBe(true);
        });

        describe("has a first name", function () {

            beforeEach(function () {
                lastName.setValue("Smith");
                accountType.setValue("Standard User");
                email.setValue("a@b.com");
                password.setValue("password");
                confirmPassword.setValue("password");
            });

            it("does not submit when the first name is empty", function () {
                firstName.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the first name is more than 30 characters", function () {
                firstName.setValue("abcdefghijklmnopqrstuvwxyz12345");
                expect(view.isValid()).toBe(false);
            });

            it("does submit when the first name is 30 characters", function () {
                firstName.setValue("abcdefghijklmnopqrstuvwxyz1234");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the first name is one character", function () {
                firstName.setValue("a");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the first name is less than 30 characters", function () {
                firstName.setValue("abc");
                expect(view.isValid()).toBe(true);
            });

        });

        describe("has a last name name", function () {

            beforeEach(function () {
                firstName.setValue("John");
                accountType.setValue("Standard User");
                email.setValue("a@b.com");
                password.setValue("password");
                confirmPassword.setValue("password");
            });

            it("does not submit when the last name is empty", function () {
                lastName.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the last name is more than 30 characters", function () {
                lastName.setValue("abcdefghijklmnopqrstuvwxyz12345");
                expect(view.isValid()).toBe(false);
            });

            it("does submit when the last name is 30 characters", function () {
                lastName.setValue("abcdefghijklmnopqrstuvwxyz1234");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the last name is one character", function () {
                lastName.setValue("a");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the last name is less than 30 characters", function () {
                lastName.setValue("abc");
                expect(view.isValid()).toBe(true);
            });

        });

        describe("has an account type", function () {

            beforeEach(function () {
                firstName.setValue("John");
                lastName.setValue("Smith");
                email.setValue("a@b.com");
                password.setValue("password");
                confirmPassword.setValue("password");
            });

            it("does not submit when the account type is empty", function () {
                accountType.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does submit when the account type is a standard user", function () {
                accountType.setValue("Standard User");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the account type is a travel agent", function () {
                accountType.setValue("Travel Agent");
                expect(view.isValid()).toBe(true);
            });

            it("does submit when the account type is a site manager", function () {
                accountType.setValue("Site Manager");
                expect(view.isValid()).toBe(true);
            });

        });

        describe("has an email", function () {

            beforeEach(function () {
                firstName.setValue("John");
                lastName.setValue("Smith");
                accountType.setValue("Standard User");
                password.setValue("password");
                confirmPassword.setValue("password");
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

        describe("has a password and confirm password", function () {

            beforeEach(function () {
                firstName.setValue("John");
                lastName.setValue("Smith");
                accountType.setValue("Standard User");
                email.setValue("a@b.com");
            });

            it("does not submit when the passwords are empty", function () {
                password.setValue("");
                confirmPassword.setValue("");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the passwords do not match", function () {
                password.setValue("password");
                confirmPassword.setValue("password1");
                expect(view.isValid()).toBe(false);
            });

            it("does submit when the passwords match", function () {
                password.setValue("password");
                confirmPassword.setValue("password");
                expect(view.isValid()).toBe(true);
            });

            it("does not submit when the passwords are 1 character", function () {
                password.setValue("1");
                confirmPassword.setValue("1");
                expect(view.isValid()).toBe(false);
            });

            it("does not submit when the passwords are less than 7 characters", function () {
                password.setValue("1234567");
                confirmPassword.setValue("1234567");
                expect(view.isValid()).toBe(false);
            });

            it("submits when the passwords are 8 characters", function () {
                password.setValue("12345678");
                confirmPassword.setValue("12345678");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are more than 8 characters", function () {
                password.setValue("123456789");
                confirmPassword.setValue("123456789");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are of minimum length and only consists of numeric values", function () {
                password.setValue("12345678");
                confirmPassword.setValue("12345678");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are of minimum length and only consists of symbols", function () {
                password.setValue("!@#$%^&*");
                confirmPassword.setValue("!@#$%^&*");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are of minimum length and only consists of lower case letters", function () {
                password.setValue("abcdefgh");
                confirmPassword.setValue("abcdefgh");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are of minimum length and only consists of upper case letters", function () {
                password.setValue("ABCDEFGH");
                confirmPassword.setValue("ABCDEFGH");
                expect(view.isValid()).toBe(true);
            });

            it("submits when the passwords are of minimum length and consists of a mixture of numbers, symbols, lower and upper case letters", function () {
                password.setValue("pa@s5Wo$d4YoU!?");
                confirmPassword.setValue("pa@s5Wo$d4YoU!?");
                expect(view.isValid()).toBe(true);
            });

        });

    });

});