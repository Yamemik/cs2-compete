import { YooCheckout } from '@a2seven/yoo-checkout';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { usersController } from './users.controller.js';
import PaymentsModel from "../models/payments.model.js";


dotenv.config();
const checkout = new YooCheckout({
   shopId: Number(process.env.SHOP_ID),
   secretKey: process.env.SECRET_KEY,
});

export const paymentsController = {
   GET_BY_ID: async (req, res) => {		//	информация о платеже
      try {
         const payment = await checkout.getPayment(req.params.payment_id);
         res.json(payment);
      } catch (error) {
         console.error(error);
      }
   },
   POST_CREATE: async (req, res) => {	//	создание платежа
      const createWebHookPayload = {
         event: 'payment.succeeded',
         url: 'https://cs2-compete.onrender.com/api/payments/createHistory'
      };
      const createPayload = {
         amount: {
            value: Number(req.body.amount_value),
            currency: "RUB"
         },
         confirmation: {
            type: req.body.confirmation_type,
            return_url: req.body.confirmation_return_url,
         },
         description: req.body.description,
         metadata: {
            user_id: req.body.metadata_user_id
         }
      };
      try {
         uuid = uuid();
         const payment = await checkout.createPayment(createPayload, uuid);
         const webhook = await checkout.createWebHook(createWebHookPayload, uuid);
         res.json({ payment, webhook });
      } catch (error) {
         console.error(error);
      }
   },
   POST_CREATE_HISTORY: async (req, res) => {
      try {
         const dataUser = {
            id: req.body.metadata.user_id,
            amount_value: req.body.object.amount.value,
         }
         const user = await usersController.findOneAndUpdate(data);
         const dataPayment = {
            type: req.body.event === "payment.succeeded" ? "payment" : "payout",
            amount_value: req.body.object.amount.value,
            user: user,
            payment: req.body.object.id,
         };
         await PaymentsModel.create(dataPayment);
      } catch (error) {
         console.error(error);
      }
   },
   POST_CANCEL: async (req, res) => {	//	отмена платежа
      try {
         const payment = await checkout.cancelPayment(req.params.id, uuid());
         res.json(payment);
      } catch (error) {
         console.error(error);
      }
   },
   POST_CREATE_RECEIPT: async (req, res) => {  // создание чека
      const createReceiptPayload = {
         send: true,
         customer: {
            email: 'test@gmail.com'
         },
         settlements: [
            {
               type: 'cashless',
               amount: {
                  value: '2.00',
                  currency: 'RUB'
               }
            }
         ],
         refund_id: '27a387af-0015-5000-8000-137da144ce29',
         type: 'refund',
         items: [
            {
               description: 'test',
               quantity: '2',
               amount: {
                  value: '1.00',
                  currency: 'RUB'
               },
               vat_code: 1,
            }
         ]
      };
      try {
         const receipt = await checkout.createReceipt(createReceiptPayload, uuid());
         res.json(receipt);
      } catch (error) {
         console.error(error);
      }
   },
   POST_CREATE_REFUND: async (req, res) => {	//	создание возврата
      const createWebHookPayload = {
         event: 'payout.succeeded',
         url: 'https://cs2-compete.onrender.com/api/payments/createHistory'
      };
      const createRefundPayload = {
         payment_id: req.params.payment_id,
         amount: {
            value: req.body.value,
            currency: 'RUB'
         }
      };
      try {
         const refund = await checkout.createRefund(createRefundPayload, uuid());
         const webhook = await checkout.createWebHook(createWebHookPayload, uuid);
         res.json({ refund, webhook });
      } catch (error) {
         console.error(error);
      }
   },
   POST_CREATE_PAYOUT: async (req, res) => {	//	создание выплаты
      const createWebHookPayload = {
         event: 'payout.succeeded',
         url: 'https://cs2-compete.onrender.com/api/payments/createHistory'
      };
      const createPayout = {
         amount: {
            value: req.body.amount_value,
            currency: 'RUB'
         },
         payout_token: req.body.payout_token,
         description: req.body.description,
         metadata: {
            user_id: req.body.metadata_user_id
         }
      };
      try {
         const payout = await checkout.createPayout(createPayout, uuid());
         const webhook = await checkout.createWebHook(createWebHookPayload, uuid);
         res.json({ payout, webhook });
      } catch (error) {
         console.error(error);
      }
   }
}