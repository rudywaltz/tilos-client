<script context="module">
export async function preload({ params }) {
  const id = params.slug;
  let news = {};
  try {
    const res = await this.fetch(`/api/v1/text/news/${id}`);
    news = await res.json();
  } catch (e) {
    console.log('error in Fetch', e);
  }

  return {
    news,
  };
}
</script>

<script>
export let news;
</script>

<h1>{news.title}</h1>
{#if news.leadFormatted}
  <div>{news.leadFormatted}</div>
{/if}
<div>
  {@html news.formatted}
</div>
