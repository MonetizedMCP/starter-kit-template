# 📚 MonetizedMCP SDK API Reference

**Complete technical reference for the MonetizedMCP TypeScript SDK.**

## 🏗 Core Architecture

### MonetizedMCPServer Class

Abstract base class that handles payment verification and MCP protocol integration.

```typescript
import { MonetizedMCPServer } from "monetizedmcp-sdk";

class YourServer extends MonetizedMCPServer {
  constructor() {
    super();
    super.runMonetizeMCPServer(); // Initialize MCP server
  }
  
  // Implement required methods
  async priceListing(request: PriceListingRequest): Promise<PriceListingResponse> { }
  async paymentMethods(): Promise<PaymentMethodsResponse[]> { }
  async makePurchase(request: MakePurchaseRequest): Promise<MakePurchaseResponse> { }
}
```

## 🔧 Required Methods

### priceListing()

Returns available services and their pricing information.

```typescript
async priceListing(
  request: PriceListingRequest
): Promise<PriceListingResponse>
```

**Parameters:**
- `request.searchQuery` (optional): Filter services by name/description

**Returns:**
```typescript
{
  items: PurchasableItem[]
}
```

**Example Implementation:**
```typescript
async priceListing(request: PriceListingRequest): Promise<PriceListingResponse> {
  const items = request.searchQuery 
    ? purchasableItems.filter(item => 
        item.name.toLowerCase().includes(request.searchQuery.toLowerCase())
      )
    : purchasableItems;
  
  return { items };
}
```

### paymentMethods()

Returns supported payment methods and wallet information.

```typescript
async paymentMethods(): Promise<PaymentMethodsResponse[]>
```

**Returns:**
```typescript
[{
  walletAddress: string,      // Your Ethereum wallet address
  paymentMethod: PaymentMethods // Supported payment method
}]
```

**Example Implementation:**
```typescript
async paymentMethods(): Promise<PaymentMethodsResponse[]> {
  return [{
    walletAddress: Config.SERVER_WALLET_ADDRESS,
    paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
  }];
}
```

### makePurchase()

Handles service purchase and execution.

```typescript
async makePurchase(
  request: MakePurchaseRequest
): Promise<MakePurchaseResponse>
```

**Parameters:**
```typescript
{
  itemId: string,                    // Service identifier
  params: Record<string, any>,       // Service parameters
  paymentMethod: PaymentMethods,     // Payment method used
  signedTransaction: string          // Payment proof
}
```

**Returns:**
```typescript
{
  purchasableItemId: string,         // Echo of itemId
  makePurchaseRequest: MakePurchaseRequest, // Echo of request
  orderId: string,                   // Unique transaction ID
  toolResult: string                 // Service output (JSON string)
}
```

## 💰 Payment Processing

### PaymentsTools Class

Handles transaction signing and payment verification.

```typescript
import { PaymentsTools } from "monetizedmcp-sdk";

const payments = new PaymentsTools();
```

#### verifyAndSettlePayment()

Verifies payment proof and settles transaction.

```typescript
async verifyAndSettlePayment(
  amount: number,
  sellerAddress: Address,
  options: {
    facilitatorUrl: string,
    paymentHeader: string,
    resource: string,
    paymentMethod: PaymentMethods
  }
): Promise<{
  success: boolean,
  message?: string,
  error?: string,
  responseHeader?: string
}>
```

**Example Usage:**
```typescript
const payment = await paymentsTools.verifyAndSettlePayment(
  0.05, // Amount in USDC
  "0x1234567890123456789012345678901234567890", // Your wallet
  {
    facilitatorUrl: "https://x402.org/facilitator",
    paymentHeader: purchaseRequest.signedTransaction,
    resource: "http://example.com", // Service resource identifier
    paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
  }
);

if (payment.success) {
  // Payment verified - execute service
} else {
  // Payment failed - return error
}
```

## 📊 Type Definitions

### PurchasableItem

Defines a monetized service offering.

```typescript
interface PurchasableItem {
  id: string;                        // Unique service identifier
  name: string;                      // Human-readable service name
  description: string;               // Service description for agents
  price: {
    amount: number;                  // Price in USDC (e.g., 0.05 = $0.05)
    paymentMethod: PaymentMethods;   // Supported payment method
  };
  params: Record<string, string>;    // Parameter schema with examples
}
```

**Example:**
```typescript
{
  id: "weather-current",
  name: "Current Weather Data",
  description: "Get real-time weather conditions including temperature, humidity, wind speed, and weather alerts for any global location",
  price: {
    amount: 0.03,
    paymentMethod: PaymentMethods.USDC_BASE_MAINNET
  },
  params: {
    location: "Example: New York, NY or 40.7128,-74.0060",
    units: "Example: metric, imperial, or kelvin (default: metric)"
  }
}
```

### PaymentMethods Enum

Supported blockchain payment methods.

```typescript
enum PaymentMethods {
  USDC_BASE_SEPOLIA = "USDC_BASE_SEPOLIA",     // Testnet
  USDC_BASE_MAINNET = "USDC_BASE_MAINNET",     // Production
}
```

**Network Details:**
```typescript
// Base Sepolia (Testnet)
{
  chainId: 84532,
  contractAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  token: "USDC",
  rpcUrl: "https://sepolia.base.org"
}

// Base Mainnet (Production)  
{
  chainId: 8453,
  contractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  token: "USDC", 
  rpcUrl: "https://mainnet.base.org"
}
```

### Configuration Types

```typescript
interface Config {
  SERVER_WALLET_ADDRESS: string;    // Your Ethereum wallet address
  CDP_API_KEY_ID: string;          // Coinbase Developer Platform API key
  CDP_API_KEY_SECRET: string;      // Coinbase Developer Platform secret
}
```

## 🛠 Utility Functions

### UUID Generation

Generate unique order IDs for transactions.

```typescript
import { v4 as uuidv4 } from "uuid";

const orderId = uuidv4(); // "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### Error Handling Pattern

Standard error handling for service implementations.

```typescript
try {
  // Service implementation
  const result = await yourServiceCall(params);
  
  return {
    purchasableItemId: request.itemId,
    makePurchaseRequest: request,
    orderId: uuidv4(),
    toolResult: JSON.stringify(result)
  };
  
} catch (error) {
  console.error("Service error:", error);
  
  return {
    purchasableItemId: request.itemId,
    makePurchaseRequest: request,
    orderId: uuidv4(),
    toolResult: `Service error: ${error.message}`
  };
}
```

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# MonetizedMCP Core Configuration
SERVER_WALLET_ADDRESS=0x1234567890123456789012345678901234567890
CDP_API_KEY_ID=your_coinbase_api_key_id
CDP_API_KEY_SECRET=your_coinbase_api_key_secret

# Optional: Custom port (default: 3000)
PORT=3000

# Your service-specific variables
YOUR_API_KEY=your_external_api_key
YOUR_API_SECRET=your_external_api_secret
```

### Configuration Module Pattern

```typescript
// src/config/config.ts
export const Config = {
  SERVER_WALLET_ADDRESS: process.env.SERVER_WALLET_ADDRESS || "",
  CDP_API_KEY_ID: process.env.CDP_API_KEY_ID || "",
  CDP_API_KEY_SECRET: process.env.CDP_API_KEY_SECRET || "",
  
  // Your service config
  YOUR_API_KEY: process.env.YOUR_API_KEY || "",
  YOUR_API_BASE_URL: process.env.YOUR_API_BASE_URL || "https://api.example.com",
};

// Validation
const requiredEnvVars = [
  "SERVER_WALLET_ADDRESS",
  "CDP_API_KEY_ID", 
  "CDP_API_KEY_SECRET"
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}
```

## 🧪 Testing Utilities

### Mock Payment for Development

Skip payment verification during development.

```typescript
async makePurchase(request: MakePurchaseRequest): Promise<MakePurchaseResponse> {
  // In development mode, skip payment verification
  const isDevelopment = process.env.NODE_ENV === "development";
  
  if (!isDevelopment) {
    // Production payment verification
    const payment = await paymentsTools.verifyAndSettlePayment(/* ... */);
    if (!payment.success) {
      return { /* payment failed response */ };
    }
  }
  
  // Execute service logic
  const result = await yourServiceImplementation(request.params);
  
  return {
    purchasableItemId: request.itemId,
    makePurchaseRequest: request,
    orderId: uuidv4(),
    toolResult: JSON.stringify(result)
  };
}
```

### Service Testing

Test individual services without MCP protocol.

```typescript
// test/service.test.ts
import { purchasableItems } from "../src/server/purchasableItems.js";

async function testService(itemId: string, params: any) {
  const item = purchasableItems.find(i => i.id === itemId);
  if (!item) throw new Error(`Service ${itemId} not found`);
  
  console.log(`Testing: ${item.name}`);
  console.log(`Price: $${item.price.amount}`);
  console.log(`Params:`, params);
  
  // Call your service implementation directly
  const result = await yourServiceImplementation(params);
  console.log(`Result:`, result);
}

// Run tests
testService("weather-current", { location: "New York, NY" });
```

## 🔗 Integration Examples

### Express.js Integration

Run MonetizedMCP alongside Express server.

```typescript
import express from "express";
import { Server as MonetizedServer } from "./server/server.js";

const app = express();
const port = process.env.PORT || 3000;

// Start MonetizedMCP server
new MonetizedServer();

// Add Express routes for monitoring/health checks
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/stats", (req, res) => {
  res.json({
    services: purchasableItems.length,
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.listen(port + 1, () => {
  console.log(`Health endpoint available at http://localhost:${port + 1}/health`);
});
```

### Logging Integration

Add structured logging for monitoring.

```typescript
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "monetized-mcp.log" }),
    new winston.transports.Console()
  ]
});

// In your makePurchase method
async makePurchase(request: MakePurchaseRequest): Promise<MakePurchaseResponse> {
  const startTime = Date.now();
  
  logger.info("Purchase started", {
    itemId: request.itemId,
    paymentMethod: request.paymentMethod,
    timestamp: new Date().toISOString()
  });
  
  try {
    // ... implementation
    
    logger.info("Purchase completed", {
      itemId: request.itemId,
      duration: Date.now() - startTime,
      success: true
    });
    
  } catch (error) {
    logger.error("Purchase failed", {
      itemId: request.itemId,
      error: error.message,
      duration: Date.now() - startTime
    });
  }
}
```

## 🔗 Related Documentation

- **[Quick Start Guide](../quick-start/existing-api.md)** - Get started quickly
- **[Vibe Coding Guide](../vibe-coding/cursor-guide.md)** - AI-assisted development
- **[Deployment Guide](../guides/marketplace-integration.md)** - Production deployment
- **[Examples Repository](https://github.com/MonetizedMCP/monetized-mcp-sample)** - Working samples

---

**💡 Need more specific examples?** Check our [sample implementations](examples.md) or ask in the [community Discord](https://discord.gg/fluora).

[← Back to Main README](../../README.md) | [Type Definitions →](types.md)
