<script lang="ts">
  import { Card, CardBody, CardHeader, Heading, immichLogo, Logo, VStack } from '@immich/ui';
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    children?: Snippet;
  }

  let { title, children }: Props = $props();
</script>

<section class="min-w-screen flex min-h-dvh items-center justify-center relative">
  <div class="absolute -z-10 w-full h-full flex place-items-center place-content-center overflow-hidden">
    <img src={immichLogo} class="w-[750px] py-8 mb-2 antialiased" alt="Immich logo" />
    <div
      class="w-full h-full absolute left-0 top-0 backdrop-blur-[200px] bg-immich-bg/80 dark:bg-immich-dark-bg/20"
    ></div>
  </div>

  <Card color="secondary" class="w-full max-w-lg border m-2">
    <CardHeader class="mt-6">
      <VStack>
        <Logo variant="icon" size="giant" />
        <Heading size="large" class="font-semibold" color="primary">{title}</Heading>
      </VStack>
    </CardHeader>

    <div class="pb-4">
      <CardBody>
        {@render children?.()}
      </CardBody>
    </div>
  </Card>
</section>
