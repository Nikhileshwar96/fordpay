const paymentController = require("../paymentController")

// @ponicode
describe("paymentController.checkBalance", () => {
    test("0", () => {
        let result = paymentController.checkBalance("bc23a9d531064583ace8f67dad60f6bb")
        expect(result).toEqual({ isSuccess: true, walletBalance: 100 })
    })

    test("1", () => {
        let result = paymentController.checkBalance("9876")
        expect(result).toEqual({ isSuccess: true, walletBalance: 100 })
    })

    test("2", () => {
        let result = paymentController.checkBalance("")
        expect(result).toEqual({ isSuccess: false, reason: "userId is required" })
    })

    test("3", () => {
        let result = paymentController.checkBalance(undefined)
        expect(result).toEqual({ isSuccess: false, reason: "userId is required" })
    })
})

// @ponicode
describe("paymentController.sendMoney", () => {
    test("0", () => {
        let result = paymentController.sendMoney("^5.0.0", "12345", 0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("1", () => {
        let result = paymentController.sendMoney("4.0.0-beta1\t", "9876", 0.0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("2", () => {
        let result = paymentController.sendMoney("v1.2.4", "da7588892", 0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("3", () => {
        let result = paymentController.sendMoney("123456", "da7588892", 100)
        expect(result).toEqual({ isSuccess: true, transactionId: "123456", walletBalance: 0 })
    })

    test("4", () => {
        let result = paymentController.sendMoney("", "", -Infinity)
        expect(result).toEqual({ isSuccess: false, reason: "recieverId and senerId are compulsory" })
    })

    test("5", () => {
        let result = paymentController.sendMoney("", "", Infinity)
        expect(result).toEqual({ isSuccess: false, reason: "recieverId and senerId are compulsory" })
    })

    test("6", () => {
        let result = paymentController.sendMoney("", "", NaN)
        expect(result).toEqual({ isSuccess: false, reason: "recieverId and senerId are compulsory" })
    })

    test("7", () => {
        let result = paymentController.sendMoney("4.0.0-beta1\t", "12345", 0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("8", () => {
        let result = paymentController.sendMoney("^5.0.0", "12345", -1.0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("9", () => {
        let result = paymentController.sendMoney(undefined, undefined, undefined)
        expect(result).toEqual({ isSuccess: false, reason: "recieverId and senerId are compulsory" })
    })

    test("10", () => {
        let result = paymentController.sendMoney("12345", "bc23a9d531064583ace8f67dad60f6bb", 50)
        expect(result).toEqual({ isSuccess: false, "reason": "insufficient balance",})
    })

    test("11", () => {
        let result = paymentController.sendMoney("12s3e", "test", 200)
        expect(result).toEqual({ isSuccess: false, reason: "insufficient balance" })
    })
})

// @ponicode
describe("paymentController.addMoney", () => {
    test("0", () => {
        let result = paymentController.addMoney("12345", 0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("1", () => {
        let result = paymentController.addMoney("12345", -200)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("2", () => {
        let result = paymentController.addMoney("bc23a9d531064583ace8f67dad60f6bb", 0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("3", () => {
        let result = paymentController.addMoney("bc23a9d531064583ace8f67dad60f6bb", 100)
        expect(result).toEqual({ isSuccess: true, transactionId: "123456", walletBalance: 100 })
    })

    test("4", () => {
        let result = paymentController.addMoney("da7588892", 50)
        expect(result).toEqual({ isSuccess: true, transactionId: "123456", walletBalance: 150 })
    })

    test("5", () => {
        let result = paymentController.addMoney("da7588892", 12.50)
        expect(result).toEqual({ isSuccess: true, transactionId: "123456", walletBalance: 162.5 })
    })

    test("6", () => {
        let result = paymentController.addMoney("da7588892", 0.0)
        expect(result).toEqual({ isSuccess: false, reason: "invalid amount" })
    })

    test("7", () => {
        let result = paymentController.addMoney("c466a48309794261b64a4f02cfcc3d64", 1.0)
        expect(result).toEqual({ isSuccess: true, transactionId: "123456", walletBalance: 163.5 })
    })

    test("8", () => {
        let result = paymentController.addMoney("", NaN)
        expect(result).toEqual({ isSuccess: false, reason: "userId required" })
    })
})
