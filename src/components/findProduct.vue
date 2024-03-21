<template>
  <div>
    <h1>Поиск товара по параметру</h1>
    <form @submit.prevent="findProducts">
      <label>Выберите параметр для поиска:</label>
      <select id="search__option" v-model="searchBy" @change="deleteInput">
        <option value="category_id" name="category_id">
          ID категории товаров
        </option>
        <option value="product_name" name="product_name">
          Название товара
        </option>
        <option value="units_in_stock" name="units_in_stock">
          Кол-во товаров на складе
        </option>
      </select>
      <br />
      <!-- Поля для поиска -->
      <div v-if="searchBy === 'category_id'">
        <label>Введите ID категории товаров:</label>
        <input
          type="number"
          v-model="searchValue"
          placeholder="Введите Число"
          name="category_id"
        />
      </div>
      <div v-else-if="searchBy === 'product_name'">
        <label>Введите название товара:</label>
        <input
          type="text"
          v-model="searchValue"
          placeholder="Введите название товара"
          name="product_name"
        />
      </div>
      <div v-else-if="searchBy === 'units_in_stock'">
        <label>Выберите оператор сравнения:</label>

        <div class="radios">
          <input
            type="radio"
            id="more"
            value="false"
            @submit.prevent="findProducts"
            v-model="moreOrLess"
          />
          <label for="more">Больше</label>
        </div>
        <div class="radios">
          <input
            type="radio"
            id="less"
            value="true"
            @submit.prevent="findProducts"
            v-model="moreOrLess"
          />
          <label for="more">Меньше</label>
        </div>

        <label>Введите кол-во товаров на складе:</label>
        <input
          type="number"
          v-model="searchValue"
          placeholder="Введите Число"
          name="units_in_stock"
        />
      </div>

      <button type="submit">Найти товар</button>
    </form>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";

export default {
  name: "findProducts",
  setup() {
    const searchBy = ref("");
    const searchValue = ref("");
    const moreOrLess = ref(false); // false - больше, true - меньше

    const { emit } = getCurrentInstance(); // получаем emit из контекста текущего компонента

    /**
     * Функция для поиска товаров по параметру.
     * Отправляет данные формы к родительскому компоненту.
     */
    const findProducts = async () => {
      moreOrLess.value == "false"
        ? (moreOrLess.value = false)
        : (moreOrLess.value = true);

      emit("answer", searchBy.value, searchValue.value, moreOrLess.value);
    };

    return {
      searchBy,
      searchValue,
      moreOrLess,
      findProducts,
    };
  },
  methods: {
    /**
     * Очищает поле ввода при смене параметра поиска.
     */
    deleteInput() {
      this.searchValue = "";
    },
  },
};
</script>
