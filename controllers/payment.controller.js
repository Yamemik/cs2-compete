import { YooCheckout } from '@a2seven/yoo-checkout';
import { v4 as uuid } from 'uuid';


const checkout = new YooCheckout({
	shopId: process.env.SHOP_ID,
	secretKey: process.env.SECRET_KEY,
});

export const paymentController = {
	GET_BY_ID: async (req, res) => {		//	информация о платеже
		try {
			const payment = await checkout.getPayment(req.params.payment_id);
			res.json(payment);
		} catch (error) {
			console.error(error);
		}
	},
	GET_BY_USER: async (req, res) => {		//	информация о платежах юзера
		try {
			filters = { metadata: { user_id: req.body.user_id } }
			const paymentList = await checkout.getPaymentList(filters);
			res.json(paymentList);
		} catch (error) {
			console.error(error);
		}
	},
	POST_CREATE: async (req, res) => {	//	создание платежа
		const createPayload = {
			amount: {
				value: req.body.value,
				currency: 'RUB'
			},
			payment_method_data: {
				type: 'bank_card'
			},
			confirmation: {
				type: 'redirect',
				return_url: 'test'
			},
			metadata: {
				user_id: req.body.user_id
			}
		};
		try {
			const payment = await checkout.createPayment(createPayload, uuid());
			res.json(payment);
		} catch (error) {
			console.error(error);
		}
	},
	PATCH_CANCEL: async (req, res) => {	//	отмена платежа
		try {
			const payment = await checkout.cancelPayment(req.params.id, uuid());
			res.json(payment);
		} catch (error) {
			console.error(error);
		}
	},
	POST_CREATE_REFUND: async (req, res) => {	//	создание возврата
		const createRefundPayload = {
			payment_id: req.params.payment_id,
			amount: {
				value: req.body.value,
				currency: 'RUB'
			}
		};
		try {
			const refund = await checkout.createRefund(createRefundPayload, uuid());
			res.json(refund);
		} catch (error) {
			console.error(error);
		}
	},
	POST_CREATE_PAYOUT: async (req, res) => {	//	создание выплаты
		const createPayout = {
			amount: {
				value: req.body.value,
				currency: 'RUB'
			},
			payout_token: req.body.payout_token,
			description: req.body.description,
			metadata: {
				user_id: req.body.user_id
			}
		};
		try {
			const payout = await checkout.createPayout(createPayout, uuid());
			res.json(payout);
		} catch (error) {
			console.error(error);
		}
	}

}