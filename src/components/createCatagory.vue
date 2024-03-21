<template>
  <div>
    <h1>Создание категории</h1>
    <p>Примечание: Важные для заполнения поля закрашены оранжевым цветом.</p>
    <form @submit.prevent="createCategory">
      <label class="important">Название категории:</label>
      <input
        type="text"
        v-model="categoryName"
        placeholder="Введите Название"
      />
      <br />
      <label>Описание категории:</label>
      <input type="text" v-model="description" placeholder="Введите Описание" />
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
    const categoryName = ref("");
    const description = ref(null);

    /**
     * Создаёт новую категорию, используя данные формы.
     *
     * Для данной формы есть следующие ограничения:
     * - Название категории не должно быть пустым.
     */
    const createCategory = async () => {
      try {
        if (categoryName.value.trim().length == 0) {
          throw new Error("Введите название категории! ❌");
        }

        // Получаем Максимальный ID категории
        const maxID = await axios.get("/api/getMaxCategoryID");

        await axios.post("/api/createCategory", {
          category_id: maxID.data[0].max + 1,
          category_name: categoryName.value,
          description: description.value,
        });

        alert("Категория успешно создана! ✅");

        categoryName.value = "";
        description.value = "";
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        console.log("Процесс СОЗДАНИЯ категории завершён!");
      }
    };

    return {
      categoryName,
      description,
      createCategory,
    };
  },
};
</script>
