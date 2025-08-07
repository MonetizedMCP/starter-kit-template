# 🚀 MonetizedMCP Starter Kit Template

**Turn any API into AI agent revenue in minutes** – Transform your existing APIs into monetized services that AI agents can discover, pay for, and use automatically through the Fluora marketplace.

## 🎯 Choose Your Path

### 🤖 **[Vibe Coding (Recommended)](docs/vibe-coding/cursor-guide.md)**
Use AI coding tools (Cursor, Claude Code) to automatically convert APIs into MonetizedMCP servers
- **Zero configuration needed** - AI handles the conversion
- **Works with any REST API** - Weather, PDF, Data, etc.
- **Ready-to-use prompts** included

### ⚡ **[Quick Start Guides](docs/quick-start/)**
Step-by-step manual implementation
- **[Monetize Existing API](docs/quick-start/existing-api.md)** - Wrap your current API
- **[Build New Service](docs/quick-start/new-service.md)** - Create from scratch  
- **[Migrate MCP Server](docs/quick-start/migration.md)** - Convert existing MCP

### 💰 **Revenue Potential**
- **$0.01 - $10+** per API call from AI agents
- **Auto-discovery** through Fluora marketplace
- **Global distribution** to millions of AI agents

## 🛠 Installation & Setup

```bash
# Clone this template
git clone https://github.com/MonetizedMCP/starter-kit-template
cd starter-kit-template

# Install dependencies
npm install

# Configure environment (see guides for details)
cp .env.example .env
# Edit .env with your credentials
```

## 📚 Documentation

### 🤖 **Vibe Coding (Primary Focus)**
- **[Cursor Guide](docs/vibe-coding/cursor-guide.md)** - Complete Cursor integration guide
- **[Claude Code Guide](docs/vibe-coding/claude-code-guide.md)** - Claude Code setup and usage
- **[Prompts Library](docs/vibe-coding/prompts-library.md)** - Ready-to-use conversion prompts
- **[Troubleshooting](docs/vibe-coding/troubleshooting.md)** - Common issues and solutions

### 📖 **Implementation Guides**
- **[Payment Setup](docs/guides/payment-setup.md)** - Coinbase CDP configuration
- **[Marketplace Integration](docs/guides/marketplace-integration.md)** - Fluora marketplace setup
- **[Revenue Optimization](docs/guides/revenue-optimization.md)** - Pricing strategies

### 📋 **Reference**
- **[API Reference](docs/reference/api-reference.md)** - Complete SDK documentation
- **[Types & Interfaces](docs/reference/types.md)** - TypeScript definitions
- **[Code Examples](docs/reference/examples.md)** - Working implementation samples

## 🔗 Key Links

- **[Fluora Marketplace](https://www.fluora.ai)** - Where agents discover your services
- **[Local Testing Guide](https://www.fluora.ai/alpha/guides/local-testing-guide)** - Test with Claude Desktop
- **[Sample Implementation](https://github.com/MonetizedMCP/monetized-mcp-sample)** - PDFShift example

## 🆘 Support

- **[Issues](https://github.com/MonetizedMCP/starter-kit-template/issues)** - Bug reports and feature requests  
- **[Discussions](https://github.com/MonetizedMCP/starter-kit-template/discussions)** - Community Q&A

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**⭐ Star this repo** if it helps you monetize your APIs with AI agents!

## Supported Payment Networks

### Base Sepolia Testnet

- Supported Tokens: USDC

### Base Mainnet

- Supported Tokens: USDC

## API Reference

### `PaymentsTools` Class

#### Constructor

```typescript
constructor();
```

Initializes the PaymentsTools instance.

#### `signTransaction`

```typescript
async signTransaction(
  amount: number,
  sellerWalletAddress: string,
  buyerWalletAddress: string,
  resource: `${string}://${string}`,
  paymentMethod: PaymentMethods
): Promise<string>
```

Signs a transaction for X402 payment.

#### `verifyAndSettlePayment`

```typescript
async verifyAndSettlePayment(
  amount: Money,
  address: Address,
  {
    facilitatorUrl,
    paymentHeader,
    resource,
    paymentMethod
  }: {
    facilitatorUrl: `${string}://${string}`;
    paymentHeader: string;
    resource: `${string}://${string}`;
    paymentMethod: PaymentMethods;
  }
): Promise<{ success: boolean; message: string; responseHeader: string }>
```

Verifies and settles a payment using the X402 facilitator.

### `MonetizedMCPServer` Class

Abstract class for implementing monetized MCP services.

#### `priceListing`

```typescript
abstract priceListing(
  request: PriceListingRequest
): Promise<PriceListingResponse>
```

Returns available items and their prices.

#### `paymentMethod`

```typescript
abstract paymentMethods(): Promise<PaymentMethodsResponse>
```

Returns payment method information.

#### `makePurchase`

```typescript
abstract makePurchase(
  request: MakePurchaseRequest
): Promise<MakePurchaseResponse>
```

Handles the purchase process.

## Types

### PaymentMethods

```typescript
enum PaymentMethods {
  USDC_BASE_SEPOLIA = "USDC_BASE_SEPOLIA",
  USDC_BASE_MAINNET = "USDC_BASE_MAINNET",
}
```

### Money

```typescript
type Money = string; // Format: "0.01", "1.00", etc.
```

## Testing your server locally

To test your MonetizedMCP server locally, follow these steps:

1. **Configure Claude Desktop** - Set up your development environment
2. **Interact with your server** - Test the payment flow and functionality

For detailed instructions, refer to the [Fluora Local Testing Guide](https://www.fluora.ai/alpha/guides/local-testing-guide) and [Getting Started Guide](https://www.fluora.ai/alpha/getting-started).

## Tips

#### Environment Variable Management

- **Keep sensitive data in environment variables**
- **Use a configuration file**: Create a config file that pulls from environment variables to reduce direct access to the environment and import them when it is needed.
- **Example configuration setup**:
  ```typescript
  // config.ts
  export const config = {
    apiKey: process.env.API_KEY || "",
    apiUrl: process.env.API_URL || "https://someapi/api",
  };
  ```

## Future Improvements

- Additional payment methods
- Enhanced error handling
- More network support
- Additional token standards

## Samples

Check out our implementation of a MonetizedMCP server using [PDFShift](https://github.com/MonetizedMCP/monetized-mcp-sample).

#### Network Configuration

- **Test on testnets first**: Always test your implementation on Base Sepolia before deploying to mainnet
- **Environment-specific configs**: Use different configurations for development, staging, and production

## Troubleshooting

### Common Issues

#### ES Modules Configuration

If you encounter module-related errors, ensure your project is using ES Modules:

1. **Update `package.json`**:

   ```json
   {
     "type": "module"
   }
   ```

2. **Configure `tsconfig.json`**:
   ```json
   {
     "compilerOptions": {
       "target": "ESNext",
       "module": "NodeNext",
       "moduleResolution": "NodeNext"
     }
   }
   ```

#### MonetizedMCP Library to import 

**Configure `package.json`**:
```json
{
  "monetizedmcp-sdk": "file:monetizedmcp-sdk-0.1.23.tgz",
}
```

#### Payment Verification Issues

- Ensure you're using the correct network (Base Sepolia for testing, Base Mainnet for production)
- Verify your wallet has sufficient USDC balance
- Check that the facilitator URL is accessible

#### MCP Server Connection

- Confirm your server is running and accessible
- Verify the MCP server URL is correct
- Check that all required tools are properly implemented

For additional help, open an issue in our repository.

## Vibe Integration

If you're using a Vibe coding tool (like Cursor, VS Code, or Claude Code)  to create or modify a MonetizedMCP server, this integration is designed to automatically expose your service logic as monetized tools.

### 🛠 When Creating a New MonetizedMCP Server

When you generate a new MonetizedMCP server using a Vibe tool:

- Each **endpoint** or **API method** you define will be exposed as a separate entry in the `priceListing` tool.
- The **parameters** required by the endpoint will be mapped automatically to the `params` field of each price listing entry.
- Pricing, metadata, and payment method support can be added inline or configured via the Vibe interface.

This allows you to instantly launch a monetized service where agents can discover and call your endpoints programmatically with payment.

### 🔄 When Converting an Existing MCP Server

If you use a Vibe tool to **convert an existing MCP server** into a MonetizedMCP server:

- Each existing MCP **tool** (i.e. RPC method) will be listed as an entry in the `priceListing` tool.
- Vibe will preserve tool names, schemas, and descriptions, and append pricing and monetization metadata.
- Parameters will be preserved as-is, and you’ll be able to set pricing options directly within Vibe.

This enables seamless migration of existing agent services into a monetized environment with minimal changes to your code.

### 📦 Example Generated Price Listing Entry

```json
{
  "name": "getSummary",
  "description": "Returns a summary of a document",
  "price": {
    "amount": 0.25,
    "currency": "USDC"
  },
  "paymentMethod": "USDC_BASE_SEPOLIA",
  "params": {
    "documentUrl": "https://example.com/doc.pdf"
  }
}
```

### License

MIT
