<script lang='ts'>
	import '../app.css';
  // @ts-ignore
  import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
  // @ts-ignore
  import FaNpm from 'svelte-icons/fa/FaNpm.svelte';

</script>

<div class='navbar bg-base-300 fixed top-0 left-0 w-screen h-16'>
  <div>

  </div>
  <div>
    <div class='menu menu-horizontal'>
      <a class='btn btn-ghost' href=''>Documentation</a>
    </div>
    <div>
      <a class='btn btn-ghost px-2' href=''>
        <div class='w-fit h-8'>
          <FaGithub />
        </div>
      </a>
      <a class='btn btn-ghost px-2' href=''>
        <div class='w-fit h-8'>
          <FaNpm />
        </div>
      </a>
    </div>
  </div>
  <div>

  </div>
</div>
<div class='mt-16 flex justify-center'>
  <div class='prose'>
    <slot />
  </div>
</div>