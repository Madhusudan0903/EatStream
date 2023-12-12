const Order = require('../../../models/order');

function statusController(app) {
  return {
    update: async (req, res) => {
      try {
        const result = await Order.updateOne({ _id: req.body.orderId }, { status: req.body.status });

        // Emit event 
        const eventEmitter = req.app.get('eventEmitter');
        eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });

        return res.redirect('/admin/orders');
      } catch (err) {
        console.error(err);
        // Handle the error appropriately (send an error response or redirect)
        return res.redirect('/admin/orders');
      }
    }
  };
}

module.exports = statusController;
