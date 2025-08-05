import { type PurchasableItem, PaymentMethods } from "monetizedmcp-sdk";

export const purchasableItems: PurchasableItem[] = [
  {
    id: "1",
    name: "Get Salutation",
    description: "Get Salutation to a person",
    price: {
      amount: 0.0001,
      paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
    },
    params: {
      name: "Example: John Doe",
    },
  },
];

export function filterPurchasableItems(searchQuery: string): PurchasableItem[] {
  return purchasableItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}
