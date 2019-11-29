
<script>
  import { format } from 'date-fns';

  const archiveLink = `archive/${format(new Date(), 'yyyy-MM-dd')}`;

export let segment;
</script>

<style>
 nav {
    border-bottom: 1px solid rgba(170,30,30,0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(170,30,30);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
		<li><a class='{segment === "archive" ? "selected" : ""}' href={archiveLink} rel=prefetch>Archívum</a></li>
		<li><a class='{segment === "shows" ? "selected" : ""}' href='shows' rel=prefetch>Műsorok</a></li>
	</ul>
</nav>
