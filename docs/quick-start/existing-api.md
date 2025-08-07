# ⚡ Monetize Existing API - Quick Start Guide

**Transform your existing REST API into a revenue-generating service for AI agents in under 30 minutes.**

## 🎯 What You'll Accomplish

- **Wrap your existing API** with MonetizedMCP payment layer
- **Set competitive pricing** for each endpoint
- **Deploy to Fluora marketplace** for global agent discovery
- **Start earning revenue** from AI agent usage

## 📋 Prerequisites

- ✅ **Working REST API** with documentation
- ✅ **API credentials** (if authentication required)
- ✅ **Coinbase Developer Platform account** ([sign up here](https://portal.cdp.coinbase.com/))
- ✅ **Ethereum wallet** for receiving payments

## 🚀 Step-by-Step Implementation

### Step 1: Clone & Setup Template (5 minutes)

```bash
# Clone the starter template
git clone https://github.com/MonetizedMCP/starter-kit-template
cd starter-kit-template

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### Step 2: Configure Environment Variables (5 minutes)

Edit `.env` with your credentials:

```bash
# MonetizedMCP Configuration
SERVER_WALLET_ADDRESS=0x1234567890123456789012345678901234567890
CDP_API_KEY_ID=your_coinbase_api_key_id
CDP_API_KEY_SECRET=your_coinbase_api_key_secret

# Your API Configuration (add as needed)
YOUR_API_KEY=your_existing_api_key
YOUR_API_BASE_URL=https://api.yourservice.com/v1
```

**🔗 Get Your Credentials:**
- **Wallet Address**: Use MetaMask or any Ethereum wallet
- **Coinbase CDP Keys**: [Create at CDP Portal](https://portal.cdp.coinbase.com/)
- **Your API Keys**: From your existing API provider

### Step 3: Define Your Services (10 minutes)

Edit `src/server/purchasableItems.ts`:

```typescript
import { type PurchasableItem, PaymentMethods } from "monetizedmcp-sdk";

export const purchasableItems: PurchasableItem[] = [
  {
    id: "1",
    name: "Get Current Weather",
    description: "Get real-time weather data for any location with temperature, humidity, and conditions",
    price: {
      amount: 0.03,
      paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
    },
    params: {
      location: "Example: New York, NY or 40.7128,-74.0060",
    },
  },
  {
    id: "2", 
    name: "Generate PDF Report",
    description: "Convert HTML content to professional PDF document with custom formatting",
    price: {
      amount: 0.25,
      paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
    },
    params: {
      htmlContent: "Example: <html><body><h1>Report Title</h1></body></html>",
      pageFormat: "Example: A4, Letter, or Legal",
    },
  },
  // Add more services for each of your API endpoints
];
```

**💰 Pricing Guidelines:**
- **Simple data queries**: $0.01 - $0.05
- **Data processing**: $0.10 - $0.50  
- **Document generation**: $0.25 - $1.00
- **Complex AI/ML**: $0.50 - $2.00+

### Step 4: Implement API Integration (10 minutes)

Edit the `makePurchase` method in `src/server/server.ts`:

```typescript
async makePurchase(
  purchaseRequest: MakePurchaseRequest
): Promise<MakePurchaseResponse> {
  console.log("makePurchase", purchaseRequest);
  
  try {
    const paymentsTools = new PaymentsTools();

    // Validate server wallet address
    if (!Config.SERVER_WALLET_ADDRESS) {
      throw new Error("SERVER_WALLET_ADDRESS environment variable is not set");
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
        toolResult: "Item not found. Please check the item ID and payment method.",
      };
    }

    console.log(`Processing purchase for item: ${item.name}`);

    // Verify payment
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

    if (!payment.success) {
      return {
        purchasableItemId: purchaseRequest.itemId,
        makePurchaseRequest: purchaseRequest,
        orderId: uuidv4(),
        toolResult: `Payment failed: ${payment.error || "Unknown error"}`,
      };
    }

    // Payment successful - now call your actual API
    const apiResult = await callYourAPI(item.id, purchaseRequest.params);

    return {
      purchasableItemId: purchaseRequest.itemId,
      makePurchaseRequest: purchaseRequest,
      orderId: uuidv4(),
      toolResult: JSON.stringify(apiResult),
    };

  } catch (error) {
    console.error("Purchase error details:", error);
    throw new Error(
      `Failed to make purchase: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Add this helper function to integrate with your API
async function callYourAPI(itemId: string, params: any): Promise<any> {
  const apiBaseUrl = process.env.YOUR_API_BASE_URL;
  const apiKey = process.env.YOUR_API_KEY;

  switch (itemId) {
    case "1": // Weather service
      const response = await fetch(
        `${apiBaseUrl}/weather?location=${encodeURIComponent(params.location)}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();

    case "2": // PDF generation
      const pdfResponse = await fetch(
        `${apiBaseUrl}/generate-pdf`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            html: params.htmlContent,
            format: params.pageFormat || 'A4'
          })
        }
      );
      
      if (!pdfResponse.ok) {
        throw new Error(`PDF API error: ${pdfResponse.status}`);
      }
      
      return {
        pdfUrl: await pdfResponse.text(),
        message: "PDF generated successfully"
      };

    default:
      throw new Error(`Unknown service: ${itemId}`);
  }
}
```

## 🧪 Testing Your Implementation

### Test 1: Build & Start Server

```bash
# Build the project
npm run build

# Start the server
npm start
```

**Expected Output:**
```
✅ MonetizedMCP server running on port 3000
✅ Purchasable items loaded: 2 services  
✅ Payment methods configured: USDC_BASE_MAINNET
✅ Ready for agent requests!
```

### Test 2: Verify Service Discovery

Test with any MCP client or curl:

```bash
# Test service listing
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "price-listing",
      "arguments": {}
    }
  }'
```

Should return your configured services with pricing.

### Test 3: Integration with Claude Desktop

1. **Add to Claude Desktop config** (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "your-monetized-api": {
      "command": "node",
      "args": ["/full/path/to/your/project/dist/main.js"]
    }
  }
}
```

2. **Restart Claude Desktop**

3. **Test discovery**: Ask Claude: *"What paid services are available?"*

## 🚀 Deployment & Revenue

### Option 1: Deploy to Fluora Marketplace

1. **Create Fluora account** at [fluora.ai](https://fluora.ai)
2. **Submit your MonetizedMCP server** for marketplace listing
3. **Agents discover and use your services automatically**
4. **Receive payments in USDC to your wallet**

### Option 2: Private Distribution

1. **Deploy to your own infrastructure** (AWS, GCP, etc.)
2. **Share server details** with specific AI agent developers
3. **Handle payments and service delivery directly**

## 💰 Revenue Optimization Tips

### Pricing Strategy
- **Start conservative** ($0.01-$0.05) to build usage
- **Monitor agent behavior** and adjust pricing based on demand
- **Bundle related services** for higher per-transaction value

### Service Quality
- **Fast response times** (< 500ms preferred)
- **Clear error messages** for better agent experience
- **Reliable uptime** (99%+ availability)

### Market Positioning
- **Research competitor pricing** in Fluora marketplace
- **Highlight unique value** in service descriptions
- **Optimize for common agent use cases**

## 🔧 Common Integration Patterns

### Authentication Patterns

**API Key Header:**
```typescript
headers: {
  'X-API-Key': process.env.YOUR_API_KEY,
  'Content-Type': 'application/json'
}
```

**Bearer Token:**
```typescript
headers: {
  'Authorization': `Bearer ${process.env.YOUR_API_TOKEN}`,
  'Content-Type': 'application/json'
}
```

**Basic Auth:**
```typescript
headers: {
  'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
  'Content-Type': 'application/json'
}
```

### Error Handling Patterns

```typescript
try {
  const response = await fetch(apiUrl, options);
  
  if (!response.ok) {
    // Handle specific HTTP errors
    switch (response.status) {
      case 401:
        return { toolResult: "API authentication failed. Please check your API key." };
      case 429:
        return { toolResult: "API rate limit exceeded. Please try again later." };
      case 404:
        return { toolResult: "Requested resource not found." };
      default:
        return { toolResult: `API error: ${response.status} - ${response.statusText}` };
    }
  }
  
  const data = await response.json();
  return { toolResult: JSON.stringify(data) };
  
} catch (error) {
  return { 
    toolResult: `Service unavailable: ${error.message}. Please try again later.` 
  };
}
```

## 🔗 Next Steps

- **[Deploy to Production](../guides/marketplace-integration.md)** - Get listed on Fluora marketplace
- **[Monitor Performance](../guides/monitoring.md)** - Track usage and revenue
- **[Scale Your Service](../guides/scaling.md)** - Handle high-volume usage
- **[Optimize Revenue](../guides/revenue-optimization.md)** - Advanced pricing strategies

## 📞 Support

**Need help with your specific API?**
- **[GitHub Issues](https://github.com/MonetizedMCP/starter-kit-template/issues)** - Technical questions
- **[Discord Community](https://discord.gg/fluora)** - Real-time support  
- **[Documentation](../guides/)** - Detailed implementation guides

---

**🎊 Congratulations!** You've successfully monetized your existing API. AI agents can now discover and pay for your services automatically.

[← Back to Main README](../../README.md) | [Build New Service →](new-service.md)
