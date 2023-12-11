const Order = require('../../../models/order');

function orderController() {
    return {
        index: async (req, res) => {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders', { orders });
                }
            } catch (err) {
                console.error(err);
                // Handle the error appropriately (send an error response or redirect)
                res.status(500).send('Internal Server Error');
            }
        }
    };
}

module.exports = orderController;
