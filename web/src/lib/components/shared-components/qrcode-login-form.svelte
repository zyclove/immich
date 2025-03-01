<script lang="ts">
  import FullScreenModal from '$lib/components/shared-components/full-screen-modal.svelte';
  import { qrCodeLoginStore } from '$lib/stores/qrcode-login.svelte';
  import { Button, Input } from '@immich/ui';

  let password = $state('');

  const submitPassword = (event: Event) => {
    event.preventDefault();

    console.log('Password submitted:', password);
  };
</script>

{#if qrCodeLoginStore.shouldShowForm}
  <div id="instance-qr-login">
    <FullScreenModal title={'Login QR Code'} onClose={() => {}}>
      <p class="text-xs">Enter your password to show the QR code</p>

      <div class="mt-4">
        <form onsubmit={submitPassword}>
          <Input size="small" placeholder="Password" type="password" bind:value={password} required />

          <div class="mt-6">
            <Button type="submit" size="small" shape="round" fullWidth>Confirm</Button>
          </div>
        </form>
      </div>
    </FullScreenModal>
  </div>
{/if}
