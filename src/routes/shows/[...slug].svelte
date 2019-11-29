<script context="module">
    export async function preload({ params }) {
      let [showSlug, year, quarter] = params.slug;
      let show = {};
      try {
        const res = await this.fetch(`/api/v1/show/${showSlug}`);
        show = await res.json();
      } catch(e) {
        console.log('error in Fetch', e);
      }

      return { show, showSlug, year, quarter};
    }
  </script>

  <script>
    export let showSlug;
    export let show;
  </script>


  {#if show.name}
    <h1>{ show.name }</h1>
    <h2>{ show.definition }</h2>
    <div>{@html show.description }</div>
  {:else}
    <h1>{ showSlug } nevű műsor nem létezik</h1>
  {/if}
