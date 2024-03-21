<template>
  <div>
    <h1>Создание нового товара</h1>
    <p>Примечание: Важные для заполнения поля закрашены оранжевым цветом.</p>
    <form @submit.prevent="createProduct">
      <label class="important">Название товара:</label>
      <input
        type="text"
        v-model="productName"
        placeholder="Введите название товара"
      />
      <br />

      <label class="important">ID поставщика:</label>
      <input type="number" v-model="supplierID" placeholder="Введите Число" />
      <br />

      <label class="important">ID категории товаров:</label>
      <input type="number" v-model="categoryID" placeholder="Введите Число" />
      <br />

      <label>Кол-во штук за единицу:</label>
      <input
        type="text"
        v-model="quantityPerUnit"
        placeholder="Введите количество"
      />
      <br />

      <label>Стоимость товара за штуку:</label>
      <input
        type="number"
        v-model="unitPrice"
        placeholder="Введите Стоимость"
      />
      <br />

      <label>Кол-во товаров на складе:</label>
      <input type="number" v-model="unitsInStock" placeholder="Введите Число" />
      <br />

      <label>Кол-во заказанных товаров:</label>
      <input type="number" v-model="unitsOnOrder" placeholder="Введите Число" />
      <br />

      <label>reorder_level:</label>
      <input type="number" v-model="reorderLevel" placeholder="Введите Число" />
      <br />

      <label class="important">discontinued (0 или 1):</label>
      <input type="number" v-model="discontinued" placeholder="Введите Число" />
      <br />

      <button type="submit">Создать категорию</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "CreateCategory",
  setup() {
    const productName = ref("");
    const supplierID = ref(null);
    const categoryID = ref(null);
    const quantityPerUnit = ref(null);
    const unitPrice = ref(null);
    const unitsInStock = ref(null);
    const unitsOnOrder = ref(null);
    const reorderLevel = ref(null);
    const discontinued = ref("");

    /**
     * Создаёт новый товар, используя данные формы.
     *
     * Для данной формы есть следующие ограничения:
     * - Название товара не может быть пустым.
     * - Значение discontinued может быть либо '0', либо '1'.
     * - Значение поля 'reorder_level' не может быть меньше '0'.
     * - Цена товара не может быть меньше '0'.
     * - Кол-во товаров на складе не может быть меньше '0'.
     * - Кол-во товаров в доставке не может быть меньше '0'.
     * - Поставщик с таким ID должен существовать.
     * - Категория товаров с таким ID должна существовать.
     */
    const createProduct = async () => {
      try {
        if (productName.value.trim().length == 0) {
          throw new Error("Введите название товара! ❌");
        } else if (discontinued.value === null) {
          throw new Error("Введите значение discontinued! ❌");
        } else if (unitPrice.value <= 0 && unitPrice.value !== null) {
          throw new Error("Цена товара не может быть меньше '0'! ❌");
        } else if (unitsInStock.value <= 0 && unitsInStock.value !== null) {
          throw new Error(
            "Кол-во товаров на складе не может быть меньше '0'! ❌"
          );
        } else if (unitsOnOrder.value <= 0 && unitsOnOrder.value !== null) {
          throw new Error(
            "Кол-во товаров в доставке не может быть меньше '0'! ❌"
          );
        } else if (discontinued.value !== 0 && discontinued.value !== 1) {
          throw new Error(
            "Значение discontinued может быть либо '0', либо '1'! ❌"
          );
        } else if (reorderLevel.value <= 0 && reorderLevel.value !== null) {
          throw new Error(
            "Значение поля 'reorder_level' не может быть меньше '0'! ❌"
          );
        } else if (supplierID.value === null) {
          throw new Error("Введите ID поставщика! ❌");
        } else if (categoryID.value === null) {
          throw new Error("Введите ID категории товаров! ❌");
        }

        // Получаем Максимальный ID категории
        const maxID = await axios.get("/api/getMaxProductID");

        let supplierExists, categoryExists;

        categoryExists = await axios.get(
          `/api/checkCategory/${categoryID.value}`
        );

        supplierExists = await axios.get(
          `/api/checkSupplier/${supplierID.value}`
        );

        // if (supplierExists.status == 200) {
        //   throw new Error("Поставшика с таким ID не существует! ❌");
        // } else if (categoryExists.status == 200) {
        //   throw new Error("Категории товаров с таким ID не существует ❌");
        // }

        await axios.post("/api/createProduct", {
          product_id: maxID.data[0].max + 1,
          product_name: productName.value,
          supplier_id: supplierID.value,
          category_id: categoryID.value,
          quantity_per_unit: quantityPerUnit.value,
          unit_price: unitPrice.value,
          units_in_stock: unitsInStock.value,
          units_on_order: unitsOnOrder.value,
          reorder_level: reorderLevel.value,
          discontinued: discontinued.value,
        });

        alert("Новый товар успешно создан! ✅");

        productName.value = "";
        supplierID.value = null;
        categoryID.value = null;
        quantityPerUnit.value = null;
        unitPrice.value = null;
        unitsInStock.value = null;
        unitsOnOrder.value = null;
        reorderLevel.value = null;
        discontinued.value = "";
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        console.log("Процесс СОЗДАНИЯ товара завершён!");
      }
    };

    return {
      productName,
      supplierID,
      categoryID,
      quantityPerUnit,
      unitPrice,
      unitsInStock,
      unitsOnOrder,
      reorderLevel,
      discontinued,
      createProduct,
    };
  },
};
</script>
