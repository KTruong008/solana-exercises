<script lang="ts">
	import { walletStore as walletStore$ } from '@svelte-on-solana/wallet-adapter-core';
	import { onMount } from 'svelte';

	$: {
		console.log('$walletStore$: ', $walletStore$);
	}

	onMount(async () => {
		const dv = new Uint8Array([1, 2, 3]);

		const what = await $walletStore$?.signMessage?.(dv);

		console.log('what: ', what);
	});
</script>

<div>
	<h1>Welcome to SvelteKit</h1>
	<div class="text-3xl font-bold underline">hello</div>
</div>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
