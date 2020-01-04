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

      return { show, showSlug, year, quarter };
    }
  </script>

  <script>
    import Archivelist from '../../components/Archivelist.svelte';
    export let showSlug;
    export let show;
    export let year;
    export let quarter;
  </script>


  {#if show.name}
    <h1>{ show.name }</h1>
    <h2>{ show.definition }</h2>
    <div>{@html show.description }</div>

    <Archivelist {year} {quarter} { ...show } ></Archivelist>

  {:else}
    <h1>{ showSlug } nevű műsor nem létezik</h1>
  {/if}
