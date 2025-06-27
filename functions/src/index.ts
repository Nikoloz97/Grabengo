import * as functions from "firebase-functions";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentData {
  amount: number;
  currency?: string;
  guestEmail?: string;
  guestName?: string;
}

const createPaymentIntentHandler = onCall(
  async (request: CallableRequest<PaymentData>) => {
    try {
      const { amount, currency = "usd", guestEmail, guestName } = request.data;
      const userId = request.auth?.uid;

      if (!amount || amount <= 0) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Amount must be a positive number"
        );
      }

      const metadata: { [key: string]: string } = {};

      if (userId) {
        metadata.userId = userId;
        metadata.userType = "authenticated";
      } else {
        metadata.userType = "guest";
        metadata.guestTimestamp = new Date().toISOString();
        if (guestEmail) {
          metadata.guestEmail = guestEmail;
        }
        if (guestName) {
          metadata.guestName = guestName;
        }
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error("Payment intent creation failed:", error);

      if (error instanceof functions.https.HttpsError) {
        throw error;
      }

      throw new functions.https.HttpsError(
        "internal",
        "Failed to create payment intent"
      );
    }
  }
);

exports.createPaymentIntent = createPaymentIntentHandler;
