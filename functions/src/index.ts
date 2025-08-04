import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { defineSecret } from "firebase-functions/params";
import { CallableRequest, onCall } from "firebase-functions/v2/https";
import Stripe from "stripe";

const stripeSecret = defineSecret("STRIPE_SECRET_KEY");
admin.initializeApp();

interface PaymentData {
  amount: number;
  currency?: string;
  guestEmail?: string;
  guestName?: string;
}

interface SetupPaymentMethodData {
  customerEmail?: string;
  customerName?: string;
}

export const createPaymentIntent = onCall(
  { secrets: [stripeSecret] },
  async (request: CallableRequest<PaymentData>) => {
    try {
      const { amount, currency = "usd", guestEmail, guestName } = request.data;
      const userId = request.auth?.uid;

      const stripe = new Stripe(stripeSecret.value());

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
          // enables default payment
          enabled: true,
        },
      });

      // TODO: implement FCM push notification here??

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

export const createSetupIntent = onCall(
  { secrets: [stripeSecret] },
  async (request: CallableRequest<SetupPaymentMethodData>) => {
    try {
      const { customerEmail, customerName } = request.data;
      const userId = request.auth?.uid;

      if (!userId) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated to save payment methods"
        );
      }

      const stripe = new Stripe(stripeSecret.value());
      const db = getFirestore();

      let customer;

      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();
      if (userData === undefined) throw new Error("User doesn't exist");

      if (userData.stripeCustomerId) {
        try {
          // check if customer exists in stripe
          customer = (await stripe.customers.retrieve(
            userData.stripeCustomerId
          )) as Stripe.Customer;
          if (customer.deleted) {
            throw new Error("Customer was deleted");
          }
        } catch (error) {
          console.log("Stored customer ID invalid, creating new customer");
          customer = null;
        }
      }

      if (!customer) {
        customer = await stripe.customers.create({
          email: customerEmail,
          name: customerName,
          metadata: { userId: userId },
        });

        await db.collection("users").doc(userId).set(
          {
            stripeCustomerId: customer.id,
            email: customerEmail,
            name: customerName,
          },
          { merge: true }
        );
      }

      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          userId: userId,
          purpose: "save_payment_method",
        },
      });

      return {
        clientSecret: setupIntent.client_secret,
      };
    } catch (error) {
      console.error("Setup intent creation failed:", error);

      if (error instanceof functions.https.HttpsError) {
        throw error;
      }

      throw new functions.https.HttpsError(
        "internal",
        "Failed to create setup intent"
      );
    }
  }
);

export const setDefaultPaymentMethod = onCall(
  { secrets: [stripeSecret] },
  async (request: CallableRequest<{ paymentMethodId: string }>) => {
    try {
      const { paymentMethodId } = request.data;
      const userId = request.auth?.uid;

      if (!userId) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated"
        );
      }

      const stripe = new Stripe(stripeSecret.value());
      const db = getFirestore();

      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData?.stripeCustomerId) {
        throw new functions.https.HttpsError("not-found", "Customer not found");
      }

      await stripe.customers.update(userData.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to set default payment method:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to set default payment method"
      );
    }
  }
);

export const getSavedPaymentMethods = onCall(
  { secrets: [stripeSecret] },
  async (request: CallableRequest<{}>) => {
    try {
      const userId = request.auth?.uid;

      if (!userId) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated to view saved payment methods"
        );
      }

      const stripe = new Stripe(stripeSecret.value());
      const db = getFirestore();

      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData?.stripeCustomerId) {
        return { paymentMethods: [] };
      }

      // Verify customer still exists in Stripe
      let customer;
      try {
        customer = await stripe.customers.retrieve(userData.stripeCustomerId);
        if (customer.deleted) {
          throw new Error("Customer was deleted");
        }
      } catch (error) {
        console.log("Customer not found in Stripe");
        return { paymentMethods: [] };
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: "card",
      });

      const defaultPaymentMethodId =
        customer.invoice_settings?.default_payment_method;

      // payment method type for frontend
      const formattedPaymentMethods = paymentMethods.data.map((pm) => ({
        id: pm.id,
        brand: pm.card?.brand,
        last4: pm.card?.last4,
        expMonth: pm.card?.exp_month,
        expYear: pm.card?.exp_year,
        funding: pm.card?.funding,
        name: pm.billing_details?.name,
        postalCode: pm.billing_details?.address?.postal_code,
        isDefault: pm.id === defaultPaymentMethodId,
      }));

      return {
        paymentMethods: formattedPaymentMethods,
        customerId: customer.id,
      };
    } catch (error) {
      console.error("Failed to get saved payment methods:", error);

      if (error instanceof functions.https.HttpsError) {
        throw error;
      }

      throw new functions.https.HttpsError(
        "internal",
        "Failed to get saved payment methods"
      );
    }
  }
);

export const deletePaymentMethod = onCall(
  { secrets: [stripeSecret] },
  async (request: CallableRequest<{ paymentMethodId: string }>) => {
    try {
      const { paymentMethodId } = request.data;
      const userId = request.auth?.uid;

      if (!userId) {
        throw new functions.https.HttpsError(
          "unauthenticated",
          "User must be authenticated to delete payment methods"
        );
      }

      if (!paymentMethodId) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Payment method ID is required"
        );
      }

      const stripe = new Stripe(stripeSecret.value());
      const db = getFirestore();

      // Get user's customer ID from Firestore
      const userDoc = await db.collection("users").doc(userId).get();
      const userData = userDoc.data();

      if (!userData?.stripeCustomerId) {
        throw new functions.https.HttpsError(
          "not-found",
          "No customer found for this user"
        );
      }

      // Verify the payment method belongs to this user's customer
      const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId
      );

      if (paymentMethod.customer !== userData.stripeCustomerId) {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Payment method does not belong to this user"
        );
      }

      // Detach the payment method
      await stripe.paymentMethods.detach(paymentMethodId);

      return { success: true };
    } catch (error) {
      console.error("Failed to delete payment method:", error);

      if (error instanceof functions.https.HttpsError) {
        throw error;
      }

      throw new functions.https.HttpsError(
        "internal",
        "Failed to delete payment method"
      );
    }
  }
);
