const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}).then(response => {
        // pass clientToken to your front-end
        // const clientToken = response.clientToken
        res.json(response)
      }).catch(error => {
        res.status(500).json(error)
      })
      ;
}

exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        // deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }).then(result => {
        res.json(result)
       }).catch(error => {
        res.status(500).josn(error)
       })
       ;
}