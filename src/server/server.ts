import {
  MonetizedMCPServer,
  type MakePurchaseRequest,
  type MakePurchaseResponse,
  type PaymentMethodsResponse,
  type PriceListingRequest,
  type PriceListingResponse,
  PaymentsTools,
} from "monetizedmcp-sdk";
import {
  purchasableItems,
  filterPurchasableItems,
} from "./purchasableItems.js";
import { paymentMethods } from "./paymentMethods.js";
import { v4 as uuidv4 } from "uuid";
import { Config } from "../config/config.js";

export class Server extends MonetizedMCPServer {
  /**
   * Returns the list of purchasable items
   * @param priceListingRequest - The request object containing the search query
   * @returns The list of purchasable items
   */
  async priceListing(
    priceListingRequest: PriceListingRequest
  ): Promise<PriceListingResponse> {
    try {
      // If search query is provided, filter the purchasable items by name
      const items = priceListingRequest.searchQuery
        ? filterPurchasableItems(priceListingRequest.searchQuery)
        : purchasableItems;
      return { items };
    } catch (error) {
      throw new Error("Failed to get price listing");
    }
  }
  /**
   * Returns the list of payment methods
   * @returns The list of payment methods
   */
  async paymentMethods(): Promise<PaymentMethodsResponse[]> {
    try {
      return paymentMethods;
    } catch (error) {
      throw new Error("Failed to get payment methods");
    }
  }
  /**
   * Makes a purchase
   * @param purchaseRequest - The request object containing the purchase details
   * @returns The response object containing the purchase details
   */
  async makePurchase(
    purchaseRequest: MakePurchaseRequest
  ): Promise<MakePurchaseResponse> {
    console.log("makePurchase", purchaseRequest);
    try {
      const paymentsTools = new PaymentsTools();

      // Validate server wallet address
      if (!Config.SERVER_WALLET_ADDRESS) {
        throw new Error(
          "SERVER_WALLET_ADDRESS environment variable is not set"
        );
      }

      const item = purchasableItems.find(
        (item) =>
          item.id === purchaseRequest.itemId &&
          item.price.paymentMethod === purchaseRequest.paymentMethod
      );

      if (!item) {
        return {
          purchasableItemId: purchaseRequest.itemId,
          makePurchaseRequest: purchaseRequest,
          orderId: uuidv4(),
          toolResult:
            "Item not found. Please check the item ID and payment method.",
        };
      }

      console.log(`Processing purchase for item: ${item.name}`);
      console.log(`Amount: ${item.price.amount}`);
      console.log(`Payment method: ${purchaseRequest.paymentMethod}`);
      console.log(`Server wallet: ${Config.SERVER_WALLET_ADDRESS}`);

      const payment = await paymentsTools.verifyAndSettlePayment(
        item.price.amount,
        Config.SERVER_WALLET_ADDRESS as `0x${string}`,
        {
          facilitatorUrl: "https://x402.org/facilitator",
          paymentHeader: purchaseRequest.signedTransaction,
          resource: "http://example.com",
          paymentMethod: purchaseRequest.paymentMethod,
        }
      );

      console.log(`Payment result:`, payment);

      if (payment.success) {
        return {
          purchasableItemId: purchaseRequest.itemId,
          makePurchaseRequest: purchaseRequest,
          orderId: uuidv4(),
          toolResult: "Payment successful",
        };
      }

      return {
        purchasableItemId: purchaseRequest.itemId,
        makePurchaseRequest: purchaseRequest,
        orderId: uuidv4(),
        toolResult: `Payment failed: ${payment.error || "Unknown error"}`,
      };
    } catch (error) {
      console.error("Purchase error details:", error);
      throw new Error(
        `Failed to make purchase: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
  constructor() {
    super();
    super.runMonetizeMCPServer();
  }
}
