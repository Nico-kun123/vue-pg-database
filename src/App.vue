<script>
import { ref } from "vue";
import axios from "axios";

import { RouterLink, RouterView } from "vue-router";
import HeaderComp from "./components/header.vue";

export default {
  components: {
    HeaderComp,
  },
  setup() {
    const submitForm = async () => {
      let selectElement = document.querySelector("select")?.value;
      if (selectElement !== "" && selectElement !== undefined) {
        formData.job.value = selectElement;
        $v.value.job.$validate();
      }

      const InvalidFields = [];

      if ($v.value.$silentErrors.length == 0) {
        console.log("✅Форма валидна, можно отправлять данные!");
      } else {
        console.log("❌Форма содержит ошибки валидации!");

        const Fields = [
          "name",
          "surname",
          "secondName",
          "snils",
          "job",
          "phone",
          "email",
        ];

        for (const field of Fields) {
          if ($v.value[field]?.$silentErrors.length > 0) {
            InvalidFields.push(field);
          }
        }
      }

      try {
        const response = await axios.post("/validateData", InvalidFields);
        console.log("Ответ от сервера:", response.data);
      } catch (error) {
        console.error("Ошибка при отправке POST-запроса:", error);
      }
    };

    return {
      submitForm,
    };
  },
  methods: {
    cancelEvent() {
      alert("Событие ОТМЕНЫ 👀");
    },
    closeEvent() {
      alert("Событие ЗАКРЫТИЯ 👀");
    },
  },
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/pgsql.svg"
      width="100em"
      height="100em"
      loading="lazy"
    />

    <div class="wrapper">
      <HeaderComp />

      <nav>
        <RouterLink to="/">Главная Страница</RouterLink>
        <RouterLink to="/products">Показать "products"</RouterLink>
        <RouterLink to="/categories">Показать "categories"</RouterLink>
      </nav>
    </div>
    <div class="separator"></div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    flex-flow: column;
  }

  header .wrapper {
    justify-content: center;
    align-items: center;
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
