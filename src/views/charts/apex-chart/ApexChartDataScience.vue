<script setup>
import { getColumnChartConfig } from '@core/libs/apex-chart/apexCharConfig'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const chartConfig = computed(() => getColumnChartConfig(vuetifyTheme.current.value))

const series = [
  {
    name: 'Aplicables',
    data: [
      40,
      40,
      40,
      40,
      40,
      125,
      175,
      70,
      88,
      88,
      88,
      88,
    ],
  },
  {
    name: 'Ingresos',
    data: [
      85,
      100,
      30,
      40,
      95,
      90,
      30,
      110,
      62,
      62,
      62,
      62,
    ],
  },
  {
    name: 'Gastos',
    data: [
      40,
      50,
      25,
      80,
      110,
      50,
      80,
      10,
      5,
      5,
      5,
      5,
    ],
  },
]
</script>

<template>
  <VueApexCharts
    type="bar"
    height="250"
    :options="chartConfig"
    :series="series"
  />
</template>
