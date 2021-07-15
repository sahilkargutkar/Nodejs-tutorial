const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return a positive number if input is positive ", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return 0 if 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
  it("should return a negative number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
});

describe("greet", () => {
  it("should contain greeting message", () => {
    const result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");
  });
});

describe("currencies", () => {
  it("should contain currencies", () => {
    const result = lib.getCurrencies();

    // expect(result).toContain("AUD");
    // expect(result).toContain("USD");
    // expect(result).toContain("EUR");

    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));
  });
});

describe("Product", () => {
  it("Should contain product with given id", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10, name: "Soap" }); Too specific
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });
  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("sahil");
    expect(result).toMatchObject({ username: "sahil" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };
    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };
    lib.notifyCustomer({ customerId: 1 });
  });
});
describe("notifyCustomer", () => {
  it("should send an email to customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
