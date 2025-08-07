# 📝 Vibe Coding Prompts Library

**Copy-paste ready prompts for converting popular APIs into MonetizedMCP servers using AI coding tools (Cursor, Claude Code, etc.)**

## 🎯 Universal Base Prompt

**Use this as the foundation for any API conversion:**

```
Convert [API_DOCUMENTATION_URL] into a MonetizedMCP server using this repo as a reference: https://github.com/MonetizedMCP/starter-kit-template.

Start by reading the README. Then, examine how src/server/server.ts extends the MonetizedMCPServer class and implements the priceListing, paymentMethods, and makePurchase methods.

For each API endpoint:
1. Create a corresponding entry in purchasableItems.ts with appropriate pricing
2. Map the endpoint parameters to the params field  
3. Implement the actual API call logic in the makePurchase method
4. Use descriptive names and clear descriptions for agent discovery

Pricing suggestions:
- Simple data queries: $0.01 - $0.05
- Complex processing: $0.10 - $0.50
- Premium features: $1.00+

At the end, instruct the user to:
– Edit the .env.example file by inserting their CDP_API_KEY, CDP_API_SECRET, and SERVER_WALLET_ADDRESS
– Rename the file to .env
– Add any API-specific environment variables needed
```

## 🌟 Tested Successful Prompts

### 🌤️ Weather APIs

#### NOAA Weather Service (Free, High Demand)
```
Convert https://www.weather.gov/documentation/services-web-api into a MonetizedMCP server using this repo as a reference: https://github.com/MonetizedMCP/starter-kit-template.

Focus on these high-value endpoints:
- Current conditions ($0.02)
- 7-day forecast ($0.05)  
- Weather alerts ($0.03)
- Radar data ($0.10)

This API requires no authentication but implement rate limiting consideration. Agents frequently need weather data for location-based decisions.
```

#### OpenWeatherMap (Requires API Key)
```
Convert https://openweathermap.org/api into a MonetizedMCP server. This API requires an API key parameter. 

Focus on:
- Current weather ($0.03)
- 5-day forecast ($0.08)
- Weather maps ($0.15)
- Historical data ($0.20)

Add OPENWEATHER_API_KEY to environment variables. Price competitively as agents have many weather options.
```

### 📄 Document & PDF APIs

#### PDFShift (Proven Revenue Generator)
```
Convert https://pdfshift.io/documentation into a MonetizedMCP server. This is a premium PDF generation service.

Key endpoints:
- HTML to PDF conversion ($0.25)
- URL to PDF conversion ($0.30)
- Custom formatting ($0.50)

This has proven high agent demand. Include quality parameters like DPI, format options. Requires PDFShift API key authentication.
```

#### Documint (Template-Based)
```
Convert https://docs.documint.me into a MonetizedMCP server focusing on template-based document generation.

Services:
- Fill PDF template ($0.20)
- Generate from HTML template ($0.15)
- Bulk document generation ($1.00)

Template-based services have recurring agent usage patterns.
```

### 💰 Financial & Crypto APIs

#### CoinAPI (High Volume Potential)
```
Convert https://docs.coinapi.io into a MonetizedMCP server for cryptocurrency data.

Price by data freshness:
- Current prices ($0.01)
- Historical data ($0.03) 
- Market analysis ($0.10)
- Trading pairs ($0.02)

Crypto data has very high agent demand. Include major cryptocurrencies and trading pairs. Requires CoinAPI key.
```

#### Alpha Vantage (Stock Market)
```
Convert https://www.alphavantage.co/documentation into a MonetizedMCP server for stock market data.

Focus on:
- Real-time quotes ($0.05)
- Company fundamentals ($0.15)
- Technical indicators ($0.10)
- Market news sentiment ($0.20)

Financial data commands premium pricing from trading agents.
```

### 🔍 Search & Data APIs

#### Serper (Google Search API)
```
Convert https://serper.dev/api-documentation into a MonetizedMCP server for Google search results.

Services:
- Web search ($0.10)
- Image search ($0.08)
- News search ($0.12)
- Shopping search ($0.15)

Search is fundamental for many agent workflows. Price reflects value of bypassing Google directly.
```

#### ScrapingBee (Web Scraping)
```
Convert https://www.scrapingbee.com/documentation into a MonetizedMCP server for web scraping.

Pricing by complexity:
- Simple page scraping ($0.05)
- JavaScript rendering ($0.15)
- Screenshot generation ($0.20)
- Bulk scraping ($0.50)

Web scraping saves agents significant development time.
```

### 🧠 AI & ML APIs

#### Hugging Face
```
Convert https://huggingface.co/docs/api-inference into a MonetizedMCP server for AI model inference.

Price by model complexity:
- Text classification ($0.02)
- Sentiment analysis ($0.03)
- Text generation ($0.10)
- Image classification ($0.15)

AI agents using other AI services create interesting recursive value.
```

### 🗺️ Location & Maps APIs

#### MapBox
```
Convert https://docs.mapbox.com/api into a MonetizedMCP server for mapping services.

Key services:
- Geocoding ($0.05)
- Directions API ($0.10)
- Static maps ($0.15)
- Place search ($0.08)

Location services are essential for delivery, travel, and local business agents.
```

## 🔧 Specialized Prompt Variations

### For APIs Requiring Complex Authentication
```
[BASE_PROMPT]

This API uses OAuth2 authentication. Implement token management in the server initialization and refresh tokens as needed. Store credentials securely in environment variables: OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN.
```

### For Rate-Limited APIs
```
[BASE_PROMPT]

This API has rate limits of [X requests per minute]. Implement exponential backoff and queue management for agent requests. Consider pricing that reflects rate limit constraints.
```

### For Multi-Tier APIs
```
[BASE_PROMPT]

This API has multiple pricing tiers. Map the premium tier features to higher-priced MonetizedMCP services:
- Basic tier features: $0.02-$0.05
- Premium tier features: $0.10-$0.25
- Enterprise features: $0.50+
```

### For Existing MCP Server Conversion
```
Convert this existing MCP server [GITHUB_URL] into a MonetizedMCP server using the starter template pattern.

Preserve all existing tool functionality but add monetization:
- Basic tools: $0.05
- Medium complexity: $0.15  
- Advanced tools: $0.30

Map existing tool parameters directly to purchasable item params. Maintain backward compatibility where possible.
```

## 🎨 Custom Prompt Builders

### API Documentation Analysis Pattern
```
First, analyze [API_DOCS_URL] and identify:
1. Most commonly used endpoints (prioritize these)
2. Authentication requirements
3. Rate limits and constraints
4. Response data complexity

Then convert to MonetizedMCP following the starter template pattern, pricing based on endpoint complexity and agent utility.
```

### Revenue Optimization Pattern  
```
[BASE_PROMPT]

Focus on revenue optimization:
- Bundle related endpoints with package pricing
- Create tiered service levels (basic/premium)
- Price based on computational cost + 30% markup
- Include usage analytics in service descriptions
```

## 📊 Pricing Guidelines by API Category

| Category | Simple Query | Complex Processing | Premium Features |
|----------|-------------|-------------------|------------------|
| Weather | $0.01-$0.03 | $0.05-$0.10 | $0.15+ |
| Documents | $0.10-$0.25 | $0.30-$0.50 | $1.00+ |
| Financial | $0.02-$0.05 | $0.10-$0.20 | $0.50+ |
| AI/ML | $0.05-$0.15 | $0.20-$0.50 | $1.00+ |
| Search | $0.08-$0.15 | $0.20-$0.35 | $0.50+ |
| Maps | $0.03-$0.08 | $0.10-$0.20 | $0.30+ |

## 🚀 Success Tips

1. **Start with high-demand APIs** (weather, PDF, financial data)
2. **Test with small amounts** ($0.01-$0.05) initially  
3. **Use clear, descriptive service names** for agent discovery
4. **Include example parameters** in service descriptions
5. **Monitor agent usage patterns** and adjust pricing accordingly

## 🔗 Quick Links

- **[Cursor Setup Guide](cursor-guide.md)** - Complete Cursor integration
- **[Claude Code Guide](claude-code-guide.md)** - Claude Code specifics  
- **[Troubleshooting](troubleshooting.md)** - Common issues and fixes

---

**💡 Pro Tip**: Combine multiple related APIs into a single MonetizedMCP server for higher value services (e.g., weather + maps for location intelligence).

[← Back to Cursor Guide](cursor-guide.md) | [Troubleshooting →](troubleshooting.md)
