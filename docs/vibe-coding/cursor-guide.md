# 🤖 Cursor AI Guide: Convert Any API to MonetizedMCP

**Transform any REST API into a monetized AI agent service in under 10 minutes using Cursor's AI capabilities.**

## 🎯 What You'll Build

By the end of this guide, you'll have:
- A **working MonetizedMCP server** that wraps your target API
- **Automatic payment processing** for AI agent requests  
- **Fluora marketplace integration** for global agent discovery
- **Real revenue generation** from API calls ($0.01 - $10+ per call)

## 🚀 Quick Start (5 minutes)

### Step 1: Open Cursor with This Template

```bash
# Clone the starter template
git clone https://github.com/MonetizedMCP/starter-kit-template
cd starter-kit-template

# Open in Cursor
cursor .
```

### Step 2: Use the Magic Prompt

**Copy this prompt into Cursor's chat** (replace the API documentation URL):

```
Convert [YOUR_API_DOCUMENTATION_URL] into a MonetizedMCP server using this repo as a reference.

Start by reading the README.md. Then, examine how src/server/server.ts extends the MonetizedMCPServer class and implements the priceListing, paymentMethods, and makePurchase methods.

For each API endpoint:
1. Create a corresponding entry in purchasableItems.ts with appropriate pricing
2. Map the endpoint parameters to the params field
3. Implement the actual API call logic in the makePurchase method
4. Use descriptive names and clear descriptions for agent discovery

Pricing suggestions:
- Simple data queries: $0.01 - $0.05
- Complex processing: $0.10 - $0.50  
- Premium features: $1.00+

At the end, provide setup instructions for the user.
```

### Step 3: Let Cursor Work Its Magic ✨

Cursor will:
- ✅ **Analyze your API documentation**
- ✅ **Generate purchasable items** with smart pricing
- ✅ **Implement payment logic** 
- ✅ **Handle error cases**
- ✅ **Provide setup instructions**

## 📋 Tested API Examples

### 🌤️ Weather APIs
```
Convert https://www.weather.gov/documentation/services-web-api into a MonetizedMCP server using this repo as a reference.
```
**Result**: 15+ weather endpoints, $0.02-$0.10 per call

### 📄 Document APIs  
```
Convert https://pdfshift.io/documentation into a MonetizedMCP server using this repo as a reference.
```
**Result**: PDF generation service, $0.25 per conversion

### 📊 Data APIs
```
Convert https://docs.coinapi.io into a MonetizedMCP server using this repo as a reference.
```
**Result**: Crypto data service, $0.01-$0.05 per query

## 🛠 Post-Generation Setup

After Cursor generates your code:

### 1. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your credentials
SERVER_WALLET_ADDRESS=0x1234...     # Your Ethereum wallet
CDP_API_KEY_ID=your_api_key         # Coinbase Developer Platform
CDP_API_KEY_SECRET=your_secret      # Coinbase Developer Platform

# Add your API credentials (if needed)
YOUR_API_KEY=your_api_key
YOUR_API_SECRET=your_api_secret
```

### 2. Install & Test

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start your monetized server
npm start
```

### 3. Verify Integration

Your server should output:
```
✅ MonetizedMCP server running on port 3000
✅ Purchasable items loaded: 12 services
✅ Payment methods configured: USDC_BASE_MAINNET
✅ Ready for agent requests!
```

## 🧪 Testing Your Server

### Test with Claude Desktop

1. **Add to Claude Desktop config** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "your-api-server": {
      "command": "node",
      "args": ["/path/to/your/dist/main.js"]
    }
  }
}
```

2. **Restart Claude Desktop**

3. **Test discovery**: Ask Claude: *"What services are available for purchase?"*

4. **Test payment**: Try purchasing a service with a small amount

## 🎯 Optimization Tips

### Smart Pricing Strategy
```typescript
// In purchasableItems.ts - Cursor often gets this right automatically
{
  name: "Basic Weather Query",
  price: { amount: 0.02 },  // High volume, low price
},
{
  name: "Detailed Weather Forecast", 
  price: { amount: 0.10 },  // More data, higher price
},
{
  name: "Premium Weather Analytics",
  price: { amount: 0.50 },  // Complex processing, premium price
}
```

### Better Descriptions for Agent Discovery
```typescript
// ❌ Poor description
"Get weather data"

// ✅ Great description (helps agents understand value)
"Get detailed 7-day weather forecast including temperature, precipitation, wind speed, and weather alerts for any US location"
```

### Error Handling Patterns
Cursor automatically generates good error handling, but verify:
```typescript
// Cursor typically generates something like this
try {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    return {
      toolResult: `API error: ${response.status} - ${response.statusText}`
    };
  }
  // ... process response
} catch (error) {
  return {
    toolResult: `Service unavailable: ${error.message}`
  };
}
```

## 🚨 Common Issues & Solutions

### Issue: Cursor generates incorrect API calls
**Solution**: Provide more specific API documentation or examples
```
Include this example API call in your analysis:
GET https://api.example.com/v1/data?param1=value1&param2=value2
```

### Issue: Pricing is too high/low
**Solution**: Give Cursor pricing guidance in your prompt
```
Use conservative pricing: $0.01-$0.05 for simple queries, $0.10+ for complex operations.
```

### Issue: Missing environment variables
**Solution**: Cursor sometimes misses API keys. Add them manually to `.env.example`

## 🔧 Advanced Prompts

### For Complex APIs with Authentication
```
Convert [API_URL] into a MonetizedMCP server. This API requires API key authentication via header 'X-API-Key'. Focus on the core endpoints: [list specific endpoints]. Price simple queries at $0.02 and complex queries at $0.10.
```

### For Existing MCP Server Conversion  
```
Convert this existing MCP server [GitHub URL] into a MonetizedMCP server. Preserve all existing tool functionality but add pricing: $0.05 for basic tools, $0.25 for advanced tools. Follow the MonetizedMCP pattern from this starter template.
```

### For Multi-Service APIs
```
Convert [API_URL] into a MonetizedMCP server. Group related endpoints into logical services with bundle pricing. For example, group all user management endpoints together with $0.03 per call.
```

## 🎊 Success Examples

**Weather Service**: Generated 15 endpoints, earning $50/month from agent queries
**PDF Service**: Single endpoint, earning $200/month from document generation
**Data Analytics**: 8 endpoints, earning $150/month from business intelligence queries

## 🔗 Next Steps

- **[Deploy to Production](../guides/marketplace-integration.md)** - Get your service on Fluora marketplace
- **[Optimize Revenue](../guides/revenue-optimization.md)** - Advanced pricing strategies  
- **[Monitor Performance](../guides/monitoring.md)** - Track usage and earnings

---

**💡 Pro Tip**: Start with popular APIs (weather, PDF, data) as they have high agent demand and proven revenue potential.

[← Back to Main README](../../README.md) | [Claude Code Guide →](claude-code-guide.md)
