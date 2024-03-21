<template>
  <div>
    <div v-if="loading" style="color: limegreen">Загрузка...</div>
    <div v-else-if="error" style="color: crimson">Ошибка загрузки данных</div>
    <div v-else>
      <TableHints
        msg="у таблицы есть возможность сортировки по столбцу. Нажмите на столбец, чтобы отсортировать таблицу! 🤩"
      />
      <table>
        <thead>
          <tr>
            <th @click="sortBy('category_id')">category_id</th>
            <th @click="sortBy('category_name')">category_name</th>
            <th @click="sortBy('description')">description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in sortedCategories" :key="category.category_id">
            <td>{{ category.category_id }}</td>
            <td>{{ category.category_name }}</td>
            <td>{{ category.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import TableHints from "../components/tableHints.vue";

export default {
  components: { TableHints },
  setup() {
    const categories = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const sortByField = ref(null);

    onMounted(async () => {
      try {
        loading.value = true;
        const response = await axios.get("/api/getCategories");
        categories.value = response.data;
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        error.value = "Ошибка загрузки данных";
      } finally {
        loading.value = false;
        sortBy("category_id");
      }
    });

    const sortedCategories = ref([]);

    /**
     * Сортировка данных категорий товаров по выбранному полю.
     */
    const sortBy = (field) => {
      if (field === sortByField.value) {
        sortedCategories.value.reverse();
      } else {
        sortByField.value = field;
        sortedCategories.value = [...categories.value].sort((a, b) =>
          a[field] > b[field] ? 1 : -1
        );
      }
    };

    return {
      categories,
      loading,
      error,
      sortBy,
      sortedCategories,
    };
  },
};
</script>
