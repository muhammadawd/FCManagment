<template>
  <component :is="tag"
             @click.native="hideSidebar"
             class="nav-item"
             v-bind="$attrs"
             tag="li">
    <a class="nav-link">
      <slot>
        <span class="badge badge-info position-absolute" v-if="soon">
          {{soon}}
        </span>
        <i v-if="icon" :class="icon"></i>
        <p>{{name}}</p>
      </slot>
    </a>
  </component>
</template>
<script>
  export default {
    name: "sidebar-link",
    inheritAttrs: false,
    inject: {
      autoClose: {
        default: true
      },
      addLink: {
        default: () => {
        }
      },
      removeLink: {
        default: () => {
        }
      }
    },
    props: {
      name: String,
      icon: String,
      soon: String,
      tag: {
        type: String,
        default: "router-link"
      }
    },
    methods: {
      hideSidebar() {
        if (this.autoClose) {
          this.$sidebar.displaySidebar(false);
        }
      },
      isActive() {
        return this.$el.classList.contains("active");
      }
    },
    mounted() {
      if (this.addLink) {
        this.addLink(this);
      }
    },
    beforeDestroy() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
      if (this.removeLink) {
        this.removeLink(this);
      }
    }
  };
</script>
<style>
</style>
