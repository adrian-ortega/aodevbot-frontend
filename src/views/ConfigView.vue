<script setup>
import PageHeader from '../components/PageHeader.vue'
import PageContent from '../components/PageContent.vue'
import PageNotifications from '../components/PageNotifications.vue'
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
