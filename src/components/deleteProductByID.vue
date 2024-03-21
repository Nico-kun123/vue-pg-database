<template>
  <div>
    <h1>Удаление продукта по ID</h1>
    <p>Примечание: Поле с ID продукта не должно быть пустым.</p>

    <form @submit.prevent="deleteProductByID">
      <label>Введите ID продукта:</label>
      <input type="number" v-model="productID" placeholder="Введите Число" />
      <br />
      <button type="submit">Удалить продукт</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "deleteProductByID",
  setup() {
    const productID = ref(null);

    /**
     * Удаление товара по его ID (product_id).
     * 
     * Для данной формы есть следующие ограничения:
     * - ID товара не должен быть пустым.
     * - Значение ID товара должно быть больше нуля.
     */
    const deleteProductByID = async () => {
      try {
        if (productID.value === null) {
          throw new Error("Введите ID продукта! ❌");
        }
        if (productID.value <= 0) {
          throw new Error("ID продукта должен быть больше '0'! ❌");
        }

        // Проверка товара на существование
        try {
          const product_ID = await axios.get(
            `/api/checkProductByID/${productID.value}`
          );
        } catch (error) {
          throw new Error(`Продукт с ID '${productID.value}' не найден! ❌`);
        }

        // Удаление товара по ID
        await axios.delete(`/api/deleteProductByID/${productID.value}`);
        alert(`Продукт с ID '${productID.value}' был успешно удален! ✅`);

        productID.value = null;
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        console.log("Процесс УДАЛЕНИЯ продукта завершён!");
      }
    };

    return {
      productID,
      deleteProductByID,
    };
  },
};
</script>
