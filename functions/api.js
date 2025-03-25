export async function onRequestGet({ request }) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  const type = searchParams.get("type") || "A";

  if (!domain) {
    return new Response(JSON.stringify({ error: "Missing domain" }), { status: 400 });
  }

  const dnsQueryUrl = `https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`;

  const response = await fetch(dnsQueryUrl, {
    headers: { accept: 'application/dns-json' }
  });

  const data = await response.json();

  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
