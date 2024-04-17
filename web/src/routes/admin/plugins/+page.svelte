<script lang="ts">
  import LinkButton from '$lib/components/elements/buttons/link-button.svelte';
  import Icon from '$lib/components/elements/icon.svelte';
  import UserPageLayout from '$lib/components/layouts/user-page-layout.svelte';
  import { mdiCheckDecagram, mdiWrench } from '@mdi/js';
  import type { PageData } from './$types';
  import { range } from 'lodash-es';
  import SettingSwitch from '$lib/components/shared-components/settings/setting-switch.svelte';

  export let data: PageData;
  const plugins = range(0, 8).map((index) => ({
    name: `Plugin-${index}`,
    description: `Plugin ${index} is awesome because it can do x and even y!`,
    isEnabled: Math.random() < 0.5,
    isInstalled: Math.random() < 0.5,
    isOfficial: Math.random() < 0.5,
    version: 1,
  }));
</script>

<UserPageLayout title={data.meta.title} admin>
  <svelte:fragment slot="sidebar" />
  <div class="flex justify-end gap-2" slot="buttons">
    <LinkButton on:click={() => console.log('clicked')}>
      <div class="flex place-items-center gap-2 text-sm">
        <Icon path={mdiWrench} size="18" />
        Test
      </div>
    </LinkButton>
  </div>
  <section id="setting-content" class="flex place-content-center sm:mx-4">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {#each plugins as plugin}
        <section
          class="flex flex-col gap-4 justify-between dark:bg-immich-dark-gray bg-immich-gray dark:border-0 border-gray-200 border border-solid rounded-2xl p-4"
        >
          <div class="flex flex-col gap-2">
            <h1 class="m-0 items-start flex gap-2">
              {plugin.name}
              {#if plugin.isOfficial}
                <Icon path={mdiCheckDecagram} size="18" color="green" />
              {/if}
              <div class="place-self-end justify-self-end justify-end self-end">Version {plugin.version}</div>
            </h1>

            <p class="m-0 text-sm text-gray-600 dark:text-gray-300">{plugin.description}</p>
          </div>
          <div class="flex">Is {plugin.isInstalled ? '' : 'not '}installed</div>
          <SettingSwitch checked={plugin.isEnabled} id={plugin.name} title="Enabled" />
        </section>
      {/each}
    </div>
  </section>
</UserPageLayout>
