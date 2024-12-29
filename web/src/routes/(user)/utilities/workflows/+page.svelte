<script lang="ts">
  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<UserPageLayout title={data.meta.title}>
  <div class="w-full h-full bg-gray-50 dark:bg-immich-dark-gray rounded-xl p-6">hello</div>
</UserPageLayout>
