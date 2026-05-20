# IndexNow Submission Scripts

These scripts manually submit your pages to IndexNow API for instant indexing on Bing, Yahoo, Yandex, and other search engines.

## 📋 Available Scripts

### 1. `submit-indexnow.js` - Quick Important Pages
Submits ~200 most important pages (core pages, top materials, major cities).

**Best for:**
- Quick submissions
- Testing IndexNow
- Submitting key pages only

**Usage:**
```bash
cd site
node scripts/submit-indexnow.js
```

### 2. `submit-all-pages.js` - Complete Site Submission
Submits ALL pages including:
- Static pages (home, search, materials, etc.)
- All facility pages from database
- All event pages from database
- All state/region pages
- All material pages

**Best for:**
- Initial site submission
- After major updates
- Maximum search visibility

**Usage:**
```bash
cd site
node scripts/submit-all-pages.js
```

## 🚀 Quick Start

### Step 1: Install Dependencies (if needed)

The basic script (`submit-indexnow.js`) has no dependencies - it uses Node.js built-in modules.

For the complete script (`submit-all-pages.js`), you need Supabase:
```bash
cd site
npm install @supabase/supabase-js dotenv
```

### Step 2: Run the Script

**Option A: Quick submission (recommended for first time)**
```bash
cd site
node scripts/submit-indexnow.js
```

**Option B: Complete submission (all pages)**
```bash
cd site
node scripts/submit-all-pages.js
```

### Step 3: Monitor Results

Check Bing Webmaster Tools:
1. Go to https://www.bing.com/webmasters
2. Select your site: `disposalgrid.com`
3. Go to **Reports & Data** → **IndexNow**
4. See submission history and status

## 📊 What Gets Submitted

### Quick Script (`submit-indexnow.js`)
- ✅ Core pages (home, search, materials, events, business)
- ✅ Top 50+ material pages (batteries, electronics, paint, etc.)
- ✅ All 50 US states
- ✅ Top 100 major cities
- **Total: ~200 URLs**

### Complete Script (`submit-all-pages.js`)
- ✅ Everything from quick script
- ✅ ALL facility pages from database (~1,000+)
- ✅ ALL event pages from database
- ✅ Extended material pages
- ✅ More city/region pages
- **Total: 1,000+ URLs**

## 🔑 Configuration

Both scripts use your IndexNow key:
- **Key:** `2fd1ad9e7c044fdaab90931cf2a6de09`
- **Key Location:** `https://www.disposalgrid.com/2fd1ad9e7c044fdaab90931cf2a6de09.txt`
- **Host:** `www.disposalgrid.com`

The key is already configured in the scripts. No changes needed!

## 🌐 Search Engines Notified

When you submit to IndexNow, these search engines are automatically notified:
- ✅ **Bing** (Microsoft)
- ✅ **Yahoo** (uses Bing index)
- ✅ **Yandex** (Russian search engine)
- ✅ **DuckDuckGo** (uses Bing index)
- ✅ **Ecosia** (uses Bing index)
- ✅ Other IndexNow partners

**Note:** Google does NOT support IndexNow. Use Google Search Console for Google.

## ⏱️ Expected Timeline

| Time | What Happens |
|------|--------------|
| **Immediate** | IndexNow API receives your URLs |
| **5-10 minutes** | Search engines acknowledge submission |
| **1-6 hours** | Search engines start crawling pages |
| **24-48 hours** | Pages appear in search results |
| **1 week** | Full indexing complete |

## 📈 Monitoring & Verification

### Check Submission Status

**Bing Webmaster Tools:**
```
https://www.bing.com/webmasters
→ Reports & Data → IndexNow
```

**Yandex Webmaster:**
```
https://webmaster.yandex.com/
```

### Verify Indexing

After 24-48 hours, search for:
```
site:www.disposalgrid.com
```

In Bing, Yahoo, or Yandex to see indexed pages.

### Check Specific Pages

Search for specific pages:
```
site:www.disposalgrid.com/search
site:www.disposalgrid.com/materials/batteries
site:www.disposalgrid.com/california/los-angeles
```

## 🔄 When to Run These Scripts

### Run Immediately:
- ✅ First time setup (use `submit-all-pages.js`)
- ✅ After major site updates
- ✅ After adding new content

### Run Periodically:
- ✅ Weekly: `submit-indexnow.js` (quick important pages)
- ✅ Monthly: `submit-all-pages.js` (complete site)

### Don't Run:
- ❌ More than once per day
- ❌ For minor text changes
- ❌ For styling updates only

## 🛠️ Troubleshooting

### Error: "403 Forbidden"

**Problem:** IndexNow API rejects request

**Solutions:**
1. Verify key file is accessible:
   ```
   https://www.disposalgrid.com/2fd1ad9e7c044fdaab90931cf2a6de09.txt
   ```
2. Check key matches in script and file
3. Ensure URLs are properly formatted (https://)

### Error: "Cannot find module '@supabase/supabase-js'"

**Problem:** Missing dependencies for complete script

**Solution:**
```bash
cd site
npm install @supabase/supabase-js dotenv
```

### Error: "ENOTFOUND api.indexnow.org"

**Problem:** Network/DNS issue

**Solutions:**
1. Check internet connection
2. Try again in a few minutes
3. Check if behind firewall/proxy

### No Pages Appearing in Search

**Problem:** Submitted but not indexed

**Notes:**
- IndexNow notifies search engines, but doesn't guarantee indexing
- Quality content is more likely to be indexed
- Can take 24-48 hours even with IndexNow
- Check Bing Webmaster Tools for submission status

## 📝 Script Output Example

```
🚀 IndexNow Bulk Submission
═══════════════════════════════════════════════════

📄 Total URLs to submit: 200
🔑 API Key: 2fd1ad9e7c044fdaab90931cf2a6de09
🌐 Host: www.disposalgrid.com

📦 Batches: 1


🔄 Submitting to api.indexnow.org...
─────────────────────────────────────────────────
   Batch 1/1: 200 URLs
   ✅ Success (200)


📊 Summary
═══════════════════════════════════════════════════
✅ Successful submissions: 1
❌ Failed submissions: 0
📄 Total URLs submitted: 200
🔍 Search engines notified: 1


🎯 What happens next?
─────────────────────────────────────────────────
• Search engines have been notified of your pages
• Indexing typically happens within minutes to hours
• Check Bing Webmaster Tools for submission status
• Monitor search results over the next 24-48 hours

✨ Done!
```

## 🎯 Best Practices

### DO:
- ✅ Run after publishing new content
- ✅ Submit important pages first
- ✅ Monitor results in Bing Webmaster Tools
- ✅ Wait 24-48 hours before checking indexing
- ✅ Use complete script for initial submission

### DON'T:
- ❌ Submit same URLs multiple times per day
- ❌ Submit for minor changes
- ❌ Expect instant results (takes hours)
- ❌ Submit invalid or broken URLs
- ❌ Overuse the API (rate limits apply)

## 🔗 Useful Links

**IndexNow Protocol:**
- https://www.indexnow.org/

**Bing Webmaster Tools:**
- https://www.bing.com/webmasters

**Yandex Webmaster:**
- https://webmaster.yandex.com/

**Your Key File:**
- https://www.disposalgrid.com/2fd1ad9e7c044fdaab90931cf2a6de09.txt

## 💡 Tips for Maximum Visibility

1. **Run complete script first** (`submit-all-pages.js`)
2. **Wait 48 hours** for initial indexing
3. **Check Bing Webmaster Tools** for status
4. **Run quick script weekly** for new content
5. **Monitor search results** with `site:` operator
6. **Keep content fresh** - update regularly
7. **Use Google Search Console** for Google (separate from IndexNow)

## 📞 Support

If you encounter issues:

1. Check this README first
2. Verify key file is accessible
3. Check Bing Webmaster Tools for errors
4. Review script output for error messages
5. Check network/firewall settings

## ✅ Success Checklist

- [ ] Installed dependencies (if using complete script)
- [ ] Verified key file is accessible
- [ ] Ran submission script successfully
- [ ] Checked Bing Webmaster Tools
- [ ] Waiting 24-48 hours for indexing
- [ ] Monitoring search results

---

**Last Updated:** April 26, 2026  
**IndexNow Key:** `2fd1ad9e7c044fdaab90931cf2a6de09`  
**Status:** ✅ Ready to use
