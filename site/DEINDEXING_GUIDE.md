# Guide: Deindexing Removed Pages from Google & Bing

## Overview
When you delete pages from your site, search engines need to be notified to remove them from their index. Here are the best methods to deindex removed pages.

---

## ✅ Method 1: Automatic Deindexing (Recommended)

**How it works**: When search engines crawl deleted pages and receive 404/410 status codes, they automatically deindex them.

### Status Codes:
- **404 (Not Found)**: Page temporarily unavailable → Deindexed in 2-4 weeks
- **410 (Gone)**: Page permanently removed → Deindexed in 1-2 weeks (faster)

### Next.js Implementation:
Your Next.js app automatically returns 404 for deleted pages. No action needed!

**Timeline**: 1-4 weeks for automatic deindexing

---

## 🚀 Method 2: IndexNow API (Fastest)

**Best for**: Immediate notification to search engines (Bing, Yandex)

### Steps:

1. **Find your IndexNow key**:
   ```bash
   ls disposalgrid-monorepo/site/public/*.txt
   ```

2. **Edit the script**:
   ```bash
   nano disposalgrid-monorepo/site/scripts/remove-urls-indexnow.js
   ```

3. **Add your deleted URLs**:
   ```javascript
   const DELETED_URLS = [
     'https://disposalgrid.com/california/los-angeles/batteries',
     'https://disposalgrid.com/texas/houston/electronics',
     // Add all deleted URLs
   ];
   ```

4. **Run the script**:
   ```bash
   cd disposalgrid-monorepo/site
   node scripts/remove-urls-indexnow.js
   ```

**Timeline**: Notified immediately, deindexed within 24-48 hours

---

## 🔧 Method 3: Google Search Console (Manual)

**Best for**: Urgent removal of specific pages from Google

### Steps:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: **disposalgrid.com**
3. Navigate to: **Removals** → **Temporary Removals**
4. Click **"New Request"**
5. Enter the URL to remove
6. Click **"Next"** → **"Submit Request"**

### Bulk Removal:
- Use URL prefix to remove entire sections:
  - Example: `https://disposalgrid.com/old-section/` (removes all pages under this path)

### Important Notes:
- ⏰ Temporary removal lasts **6 months**
- ✅ For permanent removal, page must return 404/410
- 📊 Check removal status in the "Removals" tab

**Timeline**: Removed from search results within 24 hours

---

## 🔧 Method 4: Bing Webmaster Tools (Manual)

**Best for**: Urgent removal from Bing search results

### Steps:

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Select your site: **disposalgrid.com**
3. Navigate to: **URL Removal** → **Block URLs**
4. Enter the URLs you want to remove
5. Click **"Submit"**

### Options:
- **Remove this URL only**: Removes exact URL
- **Remove all URLs with this prefix**: Removes entire sections

**Timeline**: Removed within 24-48 hours

---

## 📋 Method 5: Update Sitemap

**Best for**: Preventing search engines from crawling deleted pages

### For Next.js with App Router:

Create or update `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://disposalgrid.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://disposalgrid.com/materials',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Only include active pages
    // Remove deleted pages from this list
  ]
}
```

### Verify Sitemap:
```bash
curl https://disposalgrid.com/sitemap.xml
```

**Timeline**: Search engines will stop crawling removed URLs on next sitemap fetch

---

## 📊 Recommended Workflow

For the pages you just deleted, follow this order:

### 1. **Immediate** (Do Now):
   - ✅ Ensure deleted pages return 404 (automatic in Next.js)
   - ✅ Run IndexNow script to notify Bing/Yandex

### 2. **Within 24 Hours**:
   - ✅ Submit urgent removals via Google Search Console
   - ✅ Submit urgent removals via Bing Webmaster Tools

### 3. **Within 1 Week**:
   - ✅ Update sitemap to exclude deleted URLs
   - ✅ Monitor deindexing progress in Search Console

### 4. **Ongoing**:
   - ✅ Check "Coverage" report in Google Search Console
   - ✅ Verify 404 pages are being deindexed

---

## 🔍 Monitoring Deindexing Progress

### Google Search Console:
1. Go to **Coverage** report
2. Look for **"Excluded"** → **"Not found (404)"**
3. These pages are being deindexed

### Manual Check:
```bash
# Check if page is still indexed
site:disposalgrid.com/deleted-page-url
```

If no results appear, the page is deindexed.

---

## 📝 Which Pages Were Deleted?

Based on your recent commit, these page routes were removed:

1. **State/Region/Material pages**: `/[state]/[region]/[material]/page.tsx`
2. **State/Region pages**: `/[state]/[region]/page.tsx`

### Example URLs that may need deindexing:
- `https://disposalgrid.com/california/los-angeles/batteries`
- `https://disposalgrid.com/texas/houston/electronics`
- `https://disposalgrid.com/new-york/new-york-city`
- etc.

### To get a list of all indexed pages:

1. **Google Search Console**:
   - Go to **Coverage** → **Valid**
   - Export the list of indexed URLs

2. **Site Search**:
   ```
   site:disposalgrid.com
   ```

3. **Compare** with your current sitemap to identify deleted pages

---

## ⚡ Quick Action Checklist

- [ ] Verify deleted pages return 404
- [ ] Run IndexNow script with deleted URLs
- [ ] Submit removal requests in Google Search Console
- [ ] Submit removal requests in Bing Webmaster Tools
- [ ] Update sitemap to exclude deleted URLs
- [ ] Monitor deindexing progress weekly

---

## 🆘 Troubleshooting

### Pages not deindexing?
- Verify they return 404/410 (not 301/302 redirects)
- Check robots.txt isn't blocking search engines
- Ensure sitemap doesn't include deleted URLs

### Need faster deindexing?
- Use Google Search Console removal tool (24 hours)
- Use IndexNow API for Bing (24-48 hours)
- For Google, 404 pages typically deindex in 2-4 weeks

---

## 📚 Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters/answer/9689846)
- [Bing URL Removal Tool](https://www.bing.com/webmasters/help/url-removal-tool-8d6f3f8f)
- [IndexNow Documentation](https://www.indexnow.org/)
