# 🔧 Vibe Coding Troubleshooting Guide

**Common issues and solutions when using AI coding tools (Cursor, Claude Code) to create MonetizedMCP servers.**

## 🚨 Quick Fixes for Common Issues

### ❌ "AI didn't understand the API documentation"

**Symptoms:**
- Generated code doesn't match actual API endpoints
- Missing or incorrect authentication
- Wrong parameter mappings

**Solutions:**

1. **Provide API Examples**
```
Include this working API example in your analysis:
GET https://api.example.com/v1/weather?lat=40.7128&lon=-74.0060
Authorization: Bearer YOUR_API_KEY
```

2. **Break Down Complex APIs**
```
Focus only on these 3 endpoints first:
1. GET /current-weather
2. GET /forecast  
3. GET /alerts

Ignore the other 50+ endpoints for now.
```

3. **Use Official Examples**
```
Here's the official curl example from their documentation:
[paste exact curl command]

Please implement this exact endpoint first.
```

### ❌ "Generated code won't compile/run"

**Symptoms:**
- TypeScript errors
- Missing imports
- Incorrect MonetizedMCP patterns

**Solutions:**

1. **Point to Working Template**
```
Please follow the exact patterns from this working file:
[paste src/server/server.ts content]

Don't deviate from these patterns.
```

2. **Fix Imports Step by Step**
```
Let's fix the imports first. Here are the correct imports for MonetizedMCP:
import { MonetizedMCPServer, type PriceListingRequest, ... } from "monetizedmcp-sdk";

Please update all import statements to match this pattern.
```

3. **Validate Against Template**
```
Compare your generated server.ts with the template version and fix any structural differences.
The class should extend MonetizedMCPServer and implement all three required methods.
```

### ❌ "Pricing strategy is completely wrong"

**Symptoms:**
- $10+ for simple API calls
- $0.001 for complex processing
- No consideration of operational costs

**Solutions:**

1. **Provide Pricing Context**
```
AI agents typically pay:
- Simple data queries: $0.01-$0.05
- Document processing: $0.10-$0.50
- Complex AI/ML: $0.25-$1.00+

Please adjust pricing to these ranges.
```

2. **Show Competitive Analysis**
```
Similar services in the Fluora marketplace charge:
- Weather data: $0.02-$0.08 per query
- PDF generation: $0.15-$0.35 per document
- Financial data: $0.05-$0.15 per query

Price competitively within these ranges.
```

### ❌ "Authentication implementation is missing/wrong"

**Symptoms:**
- No API key handling
- Hardcoded credentials  
- Missing environment variables

**Solutions:**

1. **Show Environment Pattern**
```
Follow this exact environment variable pattern:

// In .env
YOUR_API_KEY=abc123
YOUR_API_SECRET=def456

// In config.ts
export const Config = {
  YOUR_API_KEY: process.env.YOUR_API_KEY || "",
  YOUR_API_SECRET: process.env.YOUR_API_SECRET || "",
};

// In server.ts
headers: {
  'Authorization': `Bearer ${Config.YOUR_API_KEY}`
}
```

2. **Provide Auth Examples**
```
Here's how this API's authentication works according to their docs:
[paste exact auth example from API docs]

Please implement exactly this pattern.
```

## 🛠 Tool-Specific Issues

### 🤖 Cursor-Specific Problems

#### Issue: Cursor generates overly complex abstractions
**Solution:** Guide toward simplicity
```
Keep it simple. Don't create abstract classes or complex interfaces.
Just implement the three required methods (priceListing, paymentMethods, makePurchase) directly.
Follow the template structure exactly.
```

#### Issue: Cursor misses error handling
**Solution:** Request explicit error handling
```
Add comprehensive error handling for:
1. Network failures (API down)
2. Authentication errors (invalid key)
3. Rate limiting (429 responses)  
4. Invalid parameters (400 responses)

Return helpful error messages in the toolResult field.
```

#### Issue: Cursor doesn't handle environment setup
**Solution:** Ask for complete setup instructions
```
At the end, provide complete setup instructions including:
1. Required environment variables
2. How to get API credentials
3. Testing commands to verify everything works
4. Example .env file contents
```

### 🧠 Claude Code-Specific Problems

#### Issue: Claude gets stuck on analysis paralysis
**Solution:** Push for implementation
```
Skip the detailed analysis. Let's implement a basic working version first with just 2-3 endpoints.
We can optimize and add more features later.
```

#### Issue: Claude suggests architectural changes
**Solution:** Constrain to template
```
Please don't modify the overall architecture. 
Just adapt the existing template pattern to work with [YOUR_API].
The MonetizedMCPServer class structure must remain unchanged.
```

#### Issue: Claude over-explains and under-implements
**Solution:** Request code-first approach
```
Show me the actual code changes needed. 
Provide complete file contents for:
1. src/server/purchasableItems.ts
2. Updated src/server/server.ts makePurchase method
3. Any new environment variables needed
```

## 🔍 Debugging Generated Code

### Step 1: Verify Template Compliance

**Check these key files match the template pattern:**

```typescript
// server.ts - Must have this structure
export class Server extends MonetizedMCPServer {
  async priceListing(request: PriceListingRequest): Promise<PriceListingResponse> {
    // Implementation here
  }
  
  async paymentMethods(): Promise<PaymentMethodsResponse[]> {
    // Implementation here  
  }
  
  async makePurchase(request: MakePurchaseRequest): Promise<MakePurchaseResponse> {
    // Implementation here
  }
  
  constructor() {
    super();
    super.runMonetizeMCPServer();
  }
}
```

### Step 2: Test Basic Functionality

```bash
# Verify it compiles
npm run build

# Check for runtime errors  
npm start

# Look for these success messages:
# ✅ MonetizedMCP server running
# ✅ Purchasable items loaded: X services
# ✅ Payment methods configured
```

### Step 3: Validate Service Definitions

**Check `purchasableItems.ts` has proper structure:**

```typescript
export const purchasableItems: PurchasableItem[] = [
  {
    id: "1",
    name: "Clear Service Name", // ✅ Descriptive
    description: "What this service does for agents", // ✅ Clear value
    price: {
      amount: 0.05, // ✅ Reasonable pricing  
      paymentMethod: PaymentMethods.USDC_BASE_MAINNET,
    },
    params: {
      "paramName": "Example: actual example value", // ✅ Helpful examples
    },
  },
];
```

## 🧪 Testing Your Generated Server

### Test 1: Basic Server Startup
```bash
npm start
# Should see server startup messages without errors
```

### Test 2: Service Discovery  
Test with Claude Desktop or direct MCP call:
```json
{
  "method": "tools/call",
  "params": {
    "name": "price-listing",
    "arguments": {}
  }
}
```

### Test 3: Mock Purchase (Skip Payment)
Test the API integration logic:
```typescript
// Temporarily comment out payment verification in makePurchase
// const payment = await paymentsTools.verifyAndSettlePayment(...);
// if (payment.success) {

// Add this instead:
const mockPaymentSuccess = true;
if (mockPaymentSuccess) {
  // ... rest of logic
}
```

## 📝 Prompt Refinement Strategies

### When AI Gets It Wrong, Try These Refinements:

#### Too Complex → Simplify
```
This is too complex. Please simplify by:
1. Using only basic TypeScript (no advanced patterns)
2. Following the template structure exactly
3. Implementing only the core endpoints (skip edge cases)
4. Using straightforward error handling
```

#### Missing Context → Add Examples
```
Here's a working example of exactly what I want:
[paste working code example]

Please adapt this pattern for [YOUR_API] but keep the same structure.
```

#### Wrong Pricing → Provide Market Data
```
Research shows similar services charge:
- Basic queries: $0.02-$0.05
- Complex processing: $0.10-$0.25
- Premium features: $0.50+

Please reprice your suggestions within these market ranges.
```

#### Poor Descriptions → Show Good Examples
```
Here are examples of good service descriptions that help agents understand value:

❌ "Get weather data"
✅ "Get detailed 7-day weather forecast including temperature, precipitation, wind speed, and severe weather alerts for any US location"

Please rewrite all service descriptions to be this specific and value-focused.
```

## 🔧 Environment & Dependencies Issues

### Common Dependency Problems

#### Missing Types
```bash
# If you see TypeScript errors about missing types
npm install --save-dev @types/node @types/uuid
```

#### Module Resolution Issues  
```bash
# If imports fail, verify package.json has:
{
  "type": "module",
  "main": "dist/main.js"
}
```

#### SDK Version Mismatch
```bash
# Check you're using the latest SDK
npm install monetizedmcp-sdk@latest
```

### Environment Variable Problems

#### Missing Variables
Common missing variables in AI-generated code:
```bash
# .env - These are often missed by AI
CDP_API_KEY_ID=your_cdp_key
CDP_API_KEY_SECRET=your_cdp_secret  
SERVER_WALLET_ADDRESS=0x...

# API-specific (AI often forgets these)
WEATHER_API_KEY=your_weather_key
PDF_API_SECRET=your_pdf_secret
```

#### Wrong Variable Names
AI sometimes generates inconsistent variable names:
```typescript
// ❌ Inconsistent naming
process.env.API_KEY
process.env.WEATHER_KEY  
process.env.WeatherAPIKey

// ✅ Consistent pattern
process.env.WEATHER_API_KEY
process.env.PDF_API_KEY
process.env.CRYPTO_API_KEY
```

## 🚀 Getting Back on Track

### If Everything Breaks, Reset Strategy:

1. **Start Fresh with Minimal Scope**
```
Let's start over with just 1 endpoint. 
Implement only the most basic API call first.
We'll add complexity incrementally.
```

2. **Use Proven Working Example**
```
Here's a working MonetizedMCP server for weather data [paste code].
Please modify this to work with [YOUR_API] instead.
Change only what's necessary.
```

3. **Manual Fix Common Issues**
```
I'll fix the imports and environment setup manually.
Please focus only on:
1. The purchasableItems array
2. The API call logic in makePurchase
```

4. **Test Each Component Separately**
```
Let's test each part individually:
1. First, just the server startup
2. Then, the service listing  
3. Finally, the API integration
```

## 📞 When to Ask for Human Help

**Contact the MonetizedMCP community when:**

- AI consistently generates broken code after multiple attempts
- Authentication patterns are unclear from API documentation  
- Pricing strategy needs market research
- Complex rate limiting or caching requirements
- Integration with unusual API patterns (GraphQL, WebSocket, etc.)

**Resources:**
- **[GitHub Issues](https://github.com/MonetizedMCP/starter-kit-template/issues)** - Technical problems
- **[Discord Community](https://discord.gg/fluora)** - Real-time help
- **[Documentation](../guides/)** - Implementation guides

## 🔗 Quick Links

- **[Back to Cursor Guide](cursor-guide.md)** - Cursor-specific guidance
- **[Claude Code Guide](claude-code-guide.md)** - Claude Code best practices  
- **[Prompts Library](prompts-library.md)** - Ready-to-use prompts

---

**💡 Remember**: AI coding tools are powerful but not perfect. Start simple, test frequently, and iterate based on results.

[← Claude Code Guide](claude-code-guide.md) | [Quick Start Guides →](../quick-start/)
