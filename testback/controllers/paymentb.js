const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "mpkfnsydgsgdfzpz",
  publicKey: "dwv7rxms52ywzwvx",
  privateKey: "25a8a527aac2b03d917ad5e5ba0af468"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}).then(response => {
        // pass clientToken to your front-end
        // const clientToken = response.clientToken
        res.send(response)
      }).catch(error => {
        res.status(500).send(error)
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
        res.send(result)
       }).catch(error => {
        res.status(500).send(error)
       })
       ;
}