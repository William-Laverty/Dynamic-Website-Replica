<template>
<!-- Vue if selected page => display color profile and navbar select -->
    <div class="hero-cover" :id="selected == 'Home' ? 'hero-coverHome' : 'hero-cover'">
      <div class="hero-cover" :id="selected == 'Game' ? 'hero-coverGame' : 'hero-cover'">
        <div class="hero-cover" :id="selected == 'API' ? 'hero-coverAPI' : 'hero-cover'">
          <div class="container">
            <div class="topnav" id="topOfPage">
              <button class="button-navbar" :class="selected == 'Home' ? 'onSelected' : 'button-navbar'" onclick="window.location.href='index.html';">Home</button>
              <button class="button-navbar" :class="selected == 'Game' ? 'onSelected' : 'button-navbar'" onclick="window.location.href='game.html';">Game</button>
              <button class="button-navbar" :class="selected == 'API' ? 'onSelected' : 'button-navbar'" onclick="window.location.href='api.html';">API</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      props: {
        selected: String
      }
    }
</script>

<style>
  #hero-coverHome { background-image: linear-gradient(135deg, #ff8a00, #e52e71, #B5179E) }
  #hero-coverGame { background-image: linear-gradient(135deg, #4568DC, #C95FCB, #FF67A2, #FF8E77, #FFC45E, #F9F871) }
  #hero-coverAPI { background-image: linear-gradient(135deg, #36d1dc, #5b86e5, #2a27fd) }
</style>

