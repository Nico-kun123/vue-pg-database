<template>
  <div>
    <div v-if="loading" style="color: limegreen">Загрузка...</div>
    <div v-else-if="error" style="color: crimson">Ошибка загрузки данных</div>
    <div v-else>
      <FindProduct
        @answer="
          (selectedCategory, searchValue, moreOrLess) =>
            emitAnswer(selectedCategory, searchValue, moreOrLess)
        "
      />
      <div class="separator"></div>
      <TableHints
        msg="у таблицы есть возможность сортировки по столбцу. Нажмите на столбец, чтобы отсортировать таблицу! 🤩"
      />
      <table>
        <thead>
          <tr>
            <th @click="sortBy('product_id')">product_id</th>
            <th @click="sortBy('product_name')">product_name</th>
            <th @click="sortBy('supplier_id')">supplier_id</th>
            <th @click="sortBy('category_id')">category_id</th>
            <th @click="sortBy('quantity_per_unit')">quantity_per_unit</th>
            <th @click="sortBy('unit_price')">unit_price</th>
            <th @click="sortBy('units_in_stock')">units_in_stock</th>
            <th @click="sortBy('units_on_order')">units_on_order</th>
            <th @click="sortBy('reorder_level')">reorder_level</th>
            <th @click="sortBy('discontinued')">discontinued</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in displayedProducts" :key="product.product_id">
            <td>{{ product.product_id }}</td>
            <td>{{ product.product_name }}</td>
            <td>{{ product.supplier_id }}</td>
            <td>{{ product.category_id }}</td>
            <td>{{ product.quantity_per_unit }}</td>
            <td>{{ product.unit_price }}</td>
            <td>{{ product.units_in_stock }}</td>
            <td>{{ product.units_on_order }}</td>
            <td>{{ product.reorder_level }}</td>
            <td>{{ product.discontinued }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

import TableHints from "@/components/tableHints.vue";
import FindProduct from "@/components/findProduct.vue";

export default {
  components: {
    TableHints,
    FindProduct,
  },
  setup() {
    const products = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const sortedProducts = ref([]);
    const sortByField = ref(null);
    const displayedProducts = ref([]);

    onMounted(async () => {
      try {
        loading.value = true;
        const response = await axios.get("/api/getProducts");
        products.value = response.data;
        displayedProducts.value = response.data;
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        error.value = "Ошибка загрузки данных";
      } finally {
        loading.value = false;
        sortBy("product_id");
        sortBy("product_id");
      }
    });

    /**
     * Сортировка данных товаров по выбранному полю.
     */
    const sortBy = (field) => {
      if (field === sortByField.value) {
        displayedProducts.value.reverse();
      } else {
        sortByField.value = field;
        displayedProducts.value = [...displayedProducts.value].sort((a, b) =>
          a[field] > b[field] ? 1 : -1
        );
      }
    };

    // Слушаем изменения в displayedProducts и применяем сортировку
    watch(displayedProducts, () => {
      if (sortByField.value) {
        sortBy(sortByField.value);
      }
    });

    return {
      products,
      loading,
      error,
      sortBy,
      sortedProducts,
      displayedProducts,
    };
  },

  methods: {
    /**
     * Получает ответ от дочернего компонента (emit) и фильтрует данные в таблице.
     */
    emitAnswer(selectedCategory, searchValue, moreLess) {
      this.displayedProducts = this.products.filter((product) => {
        if (selectedCategory === "category_id") {
          return product.category_id == searchValue;
        } else if (selectedCategory === "product_name") {
          return product.product_name === searchValue;
        } else if (selectedCategory === "units_in_stock") {
          return moreLess
            ? product.units_in_stock < +searchValue
            : product.units_in_stock > +searchValue;
        }
      });

      this.sortBy("product_id");
    },
  },
};
</script>

