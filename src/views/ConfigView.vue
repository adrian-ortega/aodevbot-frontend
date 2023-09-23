<script setup>
import PageHeader from '../components/page/PageHeader.vue'
import PageContent from '../components/page/PageContent.vue'
import PageNotifications from '../components/page/PageNotifications.vue'
import ConfigTabs from '../components/ConfigTabs.vue'
</script>

<template>
  <PageHeader title="Settings" />
  <PageContent>
    <ConfigTabs />
    <router-view class="tabs__content" />
  </PageContent>
  <PageNotifications />
</template>
