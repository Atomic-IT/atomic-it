<script setup lang="ts">
const beats = ['a', 'b', 'c'] as const
const pings = ['call', 'chat', 'book'] as const
const { root } = useAnimeReveal({ y: 24, staggerMs: 80 })
</script>

<template>
  <section
    id="work"
    ref="root"
    class="section work"
    aria-labelledby="work-title"
  >
    <div class="container work-layout">
      <div class="work-copy">
        <p class="section-eyebrow reveal">{{ $t('work.eyebrow') }}</p>
        <h2 id="work-title" class="section-title reveal">
          {{ $t('work.title') }}
        </h2>
        <p class="section-lead reveal">{{ $t('work.lead') }}</p>

        <ol class="work-beats">
          <li v-for="beat in beats" :key="beat" class="work-beat reveal">
            <span class="work-step">{{ $t(`work.beats.${beat}.step`) }}</span>
            <div>
              <h3>{{ $t(`work.beats.${beat}.title`) }}</h3>
              <p>{{ $t(`work.beats.${beat}.text`) }}</p>
            </div>
          </li>
        </ol>

        <p class="work-note reveal">{{ $t('work.note') }}</p>
      </div>

      <div class="work-stage reveal">
        <p class="work-hint">{{ $t('work.phone.hint') }}</p>
        <div class="work-phone" aria-hidden="true">
          <div class="work-bezel">
            <div class="work-screen">
              <img
                class="work-wallpaper"
                src="/images/work/clinic.jpg"
                alt=""
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <div class="work-notch" />
              <div class="work-lock">
                <p class="work-time">{{ $t('work.phone.time') }}</p>
                <p class="work-date">{{ $t('work.phone.date') }}</p>
                <ul class="work-pings">
                  <li
                    v-for="ping in pings"
                    :key="ping"
                    :class="`work-ping work-ping-${ping}`"
                  >
                    <span class="work-ping-icon">
                      <svg
                        v-if="ping === 'call'"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M6.6 10.8c1.4 2.7 3.9 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z"
                        />
                      </svg>
                      <svg
                        v-else-if="ping === 'chat'"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 3C6.5 3 2 7.1 2 12.1c0 1.8.5 3.5 1.5 5L2 21l4.1-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.1 10-9.1S17.5 3 12 3Zm5 8.3-1.7 2.6H8.8L7 11.3 12 7l5 4.3Z"
                        />
                      </svg>
                      <svg v-else viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M7 3h2v2h6V3h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V3Zm12 7H5v9h14v-9Z"
                        />
                      </svg>
                    </span>
                    <span>
                      <small>{{ $t(`work.pings.${ping}.app`) }}</small>
                      <strong>{{ $t(`work.pings.${ping}.title`) }}</strong>
                      <em>{{ $t(`work.pings.${ping}.text`) }}</em>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.work {
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 18%, rgb(24 73 214 / 38%), transparent 42%),
    radial-gradient(circle at 8% 88%, rgb(24 73 214 / 16%), transparent 36%),
    $color-hero-deep;

  :deep(.section-eyebrow) {
    color: #9db6ff;
  }

  :deep(.section-title) {
    color: #fff;
  }

  :deep(.section-lead) {
    color: rgb(255 255 255 / 68%);
  }

  &-layout {
    display: grid;
    gap: $space-xl;
    align-items: center;

    @include breakpoint(md) {
      grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.9fr);
      gap: $space-2xl;
    }
  }

  &-copy {
    min-width: 0;
  }

  &-beats {
    display: grid;
    gap: 0;
    margin: $space-lg 0 0;
    padding: 0;
    list-style: none;
  }

  &-beat {
    display: grid;
    grid-template-columns: 2.6rem 1fr;
    gap: 0.85rem;
    padding: 1.05rem 0;
    border-top: 1px solid rgb(255 255 255 / 10%);

    h3 {
      margin: 0 0 0.25rem;
      color: #fff;
      font-size: 1.12rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    p {
      margin: 0;
      color: rgb(255 255 255 / 62%);
      font-size: 0.98rem;
    }
  }

  &-step {
    color: #9db6ff;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1.4;
  }

  &-note {
    margin: 1.15rem 0 0;
    color: rgb(255 255 255 / 42%);
    font-size: 0.9rem;
  }

  &-stage {
    display: grid;
    justify-items: center;
    gap: 0.85rem;
  }

  &-hint {
    margin: 0;
    color: rgb(255 255 255 / 55%);
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  &-phone {
    position: relative;
    width: min(100%, 19rem);
  }

  &-bezel {
    padding: 0.72rem;
    border-radius: 2.55rem;
    background: #0b0d12;
    box-shadow:
      0 42px 80px rgb(0 0 0 / 46%),
      inset 0 0 0 1px rgb(255 255 255 / 12%);
  }

  &-screen {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    aspect-ratio: 9 / 19.2;
    border-radius: 1.9rem;
    background: #151820;
  }

  &-wallpaper {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 18%;
    filter: saturate(0.78) brightness(0.58);
  }

  &-screen::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgb(7 11 20 / 18%) 0%,
      rgb(7 11 20 / 8%) 28%,
      rgb(7 11 20 / 62%) 100%
    );
  }

  &-notch {
    position: absolute;
    top: 0.7rem;
    left: 50%;
    z-index: 3;
    width: 5.4rem;
    height: 1.15rem;
    border-radius: 999px;
    background: #0b0d12;
    transform: translateX(-50%);
  }

  &-lock {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 3.4rem 0.85rem 1rem;
  }

  &-time {
    margin: 0;
    color: #fff;
    font-size: 4.2rem;
    font-weight: 700;
    letter-spacing: -0.07em;
    line-height: 0.9;
    text-align: center;
  }

  &-date {
    margin: 0.45rem 0 1.35rem;
    color: rgb(255 255 255 / 82%);
    font-size: 0.95rem;
    font-weight: 600;
    text-align: center;
  }

  &-pings {
    display: grid;
    gap: 0.5rem;
    margin: auto 0 0;
    padding: 0;
    list-style: none;
  }

  &-ping {
    display: grid;
    grid-template-columns: 2.15rem 1fr;
    gap: 0.65rem;
    align-items: start;
    padding: 0.62rem 0.7rem;
    border-radius: 1.05rem;
    background: rgb(255 255 255 / 88%);
    box-shadow: 0 10px 24px rgb(7 11 20 / 18%);
    backdrop-filter: blur(14px);

    small,
    strong,
    em {
      display: block;
    }

    small {
      color: $color-fg-muted;
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    strong {
      margin: 0.08rem 0 0.12rem;
      color: $color-secondary;
      font-size: 0.86rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    em {
      color: $color-fg-muted;
      font-size: 0.78rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.35;
    }
  }

  &-ping-icon {
    display: grid;
    place-items: center;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 0.7rem;
    color: #fff;

    svg {
      width: 1.05rem;
      height: 1.05rem;
    }
  }

  &-ping-call .work-ping-icon {
    background: $color-primary;
  }

  &-ping-chat .work-ping-icon {
    background: #1f9e4b;
  }

  &-ping-book .work-ping-icon {
    background: $color-warning;
  }
}
</style>
