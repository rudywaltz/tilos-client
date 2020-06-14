<style>
  .wrap {
    max-width: 85ch;
    margin: 0 auto;
    padding-bottom: 30px;
  }
</style>

<script>
  import { playlist, song } from '../components/stores';

  const clearAll = () => {
    $song = {};
    $playlist = [];
    localStorage.clear();
    console.log('cleared', $song, $playlist);
  };
</script>

<svelte:head>
  <title>Tilos Rádió</title>
</svelte:head>
<button on:click="{clearAll}">Clear all</button>
<div class="wrap">
  <h1>A Tilos Rádió új honlapja</h1>
  <p>
    Korai változat a készülő új honlapra, a fejlesztés fő hangsúlya a lejátszón
    van. Jelenleg csak a technikai megvalósíttással foglalkozunk, a Design és a
    UX kutatás egy másik szálon folyik.
  </p>

  <h2>
    Működő funkciók
    <small>
      (inkább nagyobb monitorra igazítva, mert a mobil layout design függő)
    </small>
  </h2>
  <p>
    <strong>Disclaimer:</strong>
    localStorage-ben tárolja az adatokat, így csak az adott böngészőre az adott
    gépen érvényes. Folyamatos a fejlesztés, így bármikor törhetnek funkciók,
    lehet ideiglenesen elérheteten a honlap. Ingyenes szolgáltatáson fut a kód,
    így időnként lassan tölt be az első alkalommal, illetve kvóta van a havi
    előrhetőségre (túl nagy forgalom esetén elérhetetlen lesz egy időre)
  </p>
  <ul>
    <li>
      Lejátszó:
      <ul>
        <li>Lejátszólistához adás/elvevés</li>
        <li>Következő szám betöltése és lejátszása</li>
        <li>
          Böngésző firssítésekor, vagy elnavigáláskor megjegyzi a lejtászott
          szám pozícióját
        </li>
        <li>Beletekerés</li>
      </ul>
    </li>
    <li>
      Archívum:
      <ul>
        <li>URL alapján navigál a napok között</li>
        <li>Jövőbeli műsort nem lehet hozzáadáni a lejátszólistához</li>
      </ul>
    </li>
    <li>
      Műsorok:
      <ul>
        <li>
          Archivum menüpont alatt el lehet rejteni műsorokat, azok nem jelennek
          meg késöbb a listában
        </li>
        <li>Műsorok menüpont alatt kereshetőek a műsorok címek alapján</li>
        <li>Műsorok menüpont alatt elrejthetőek/visszaállíthatóak a műsorok</li>
      </ul>
    </li>
  </ul>

</div>
