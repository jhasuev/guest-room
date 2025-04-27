<template>
  <div class="about">
    <div class="about__container">
      <section>
        <h2>🇺🇸 English</h2>
        <p>
          <strong>Guest Room</strong> is a simple and lightweight guestbook app
          built with <strong>Vue 3</strong>, <strong>Pinia</strong> and
          <strong>jsonbin.io</strong> for free backend storage.
        </p>
        <p>
          Users can leave short public messages, stored securely and updated
          instantly. All data is saved using a free external API.
        </p>
        <p class="tech">Technologies: Vue 3, Pinia, Vite, jsonbin.io, SCSS.</p>
      </section>

      <hr class="divider" />

      <section>
        <h2>🇷🇺 Русский</h2>
        <p>
          <strong>Guest Room</strong> — это простое приложение-гостевая книга на
          <strong>Vue 3</strong> и <strong>Pinia</strong>, с бесплатным
          хранением данных через <strong>jsonbin.io</strong>.
        </p>
        <p>
          Пользователи могут оставлять короткие публичные сообщения, которые
          мгновенно сохраняются и обновляются. Все данные сохраняются с помощью
          бесплатного внешнего API.
        </p>
        <p class="tech">Технологии: Vue 3, Pinia, Vite, jsonbin.io, SCSS.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
// без логики пока
</script>

<style scoped lang="scss">
.about {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  &__container {
    width: 100%;
    background: #fff;
    padding: 15px;
    @include default-shadow;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;

      line-height: 1.6;

      & + p {
        margin-top: 1rem;
      }
    }
    strong {
      color: var(--action-color);
    }

    .tech {
      font-size: 0.85rem;
      color: #777;
    }
  }
}
</style>
