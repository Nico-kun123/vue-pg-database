<script setup>
import TheWelcome from "@/components/TheWelcome.vue";
import CreateCategory from "@/components/createCatagory.vue";
import DeleteProductByID from "@/components/deleteProductByID.vue";
import CreateProduct from "@/components/addProduct.vue";
</script>

<template>
  <main>
    <TheWelcome />
    <CreateCategory />
    <div class="separator"></div>
    <CreateProduct />
    <div class="separator"></div>
    <DeleteProductByID />
    <div class="separator"></div>
  </main>
</template>
