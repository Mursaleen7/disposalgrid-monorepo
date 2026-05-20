const url = "https://jogfubnnajfjfayyomrg.supabase.co/rest/v1/facilities?city=ilike.*Boston*&limit=5";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZ2Z1Ym5uYWpmamZheXlvbXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NDM3MDUsImV4cCI6MjA5MjUxOTcwNX0.mBWOXYbPsp_rMzKdnavIJgJg4D8ZoE4JQMuPr-iWgzo";

fetch(url, {
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`
  }
}).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
