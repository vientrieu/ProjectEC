const express = require('express');
// const paypal = require('paypal-rest-sdk');
const router = express.Router();
controllerCart = require('../Controllers/cart.controller');
router.get('/',(req, res)=>{
    var id=req.user._id;;
    controllerCart.LoadCart(req, res, id);
});
router.post('/add/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.AddProductToCart(req,res,id,idpr);
});
router.post('/delete/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.DeleteProductFromCart(req,res,id,idpr);
});

/*router.post('/pay', (req, res) => {
    var payReq = JSON.stringify({
        intent:'sale',
        payer:{
          payment_method:'paypal'
        },
        redirect_urls:{
          return_url:'http://localhost:3000/process',
          cancel_url:'http://localhost:3000/cancel'
        },
        transactions:[{
          amount:{
            total:'10',
            currency:'USD'
          },
          description:'This is the payment transaction description.'
        }]
      });
    });

paypal.payment.create(payReq, function(error, payment){
        var links = {};
      
        if(error){
          console.error(JSON.stringify(error));
        } else {
          // Capture HATEOAS links
          payment.links.forEach(function(linkObj){
            links[linkObj.rel] = {
              href: linkObj.href,
              method: linkObj.method
            };
        })
      
          // If the redirect URL is present, redirect the customer to that URL
          if (links.hasOwnProperty('approval_url')){
            // Redirect the customer to links['approval_url'].href
          } else {
            console.error('no redirect URI present');
          }
        }
});

    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };

paypal.payment.execute(paymentId, payerId, function(error, payment){
  if(error){
    console.error(JSON.stringify(error));
  } else {
    if (payment.state == 'approved'){
      console.log('payment completed successfully');
    } else {
      console.log('payment not successful');
    }
  }
});

router.get('/cancel', (req, res) => res.send('Cancelled'));*/

module.exports = router;