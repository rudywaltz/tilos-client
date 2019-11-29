<script context="module">
  export async function preload({ params }) {
    console.log(params);
    let show = {};
    try {
      const res = await this.fetch(`/api/v1/show/${params.slug}`);
      show = await res.json();
    } catch(e) {
      console.log('error in Fetch', e);
    }

    console.log(show);
    return { show };
  }
</script>

<script>
export let show;
</script>

<h1>{show.name}</h1>
<h2>{show.definition}</h2>
<div>{@html show.description }</div>
