<template>
  <component :is="tag"
             @click.native="hideSidebar"
             class="nav-item"
             v-bind="$attrs"
             tag="li">
    <a class="nav-link">
      <slot>
        <i v-if="icon" :class="icon"></i>
        <p>{{name}}</p>
        <div>
          <ul class="nav" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="" style="display: none;">
            <li class=""><!----> <!----> <a href="/admin/overview" class=""><span class="sidebar-mini">O</span> <span
              class="sidebar-normal">Overview</span></a></li>
            <li class=""><!----> <!----> <a href="/admin/stats" class=""><span class="sidebar-mini">S</span> <span
              class="sidebar-normal">Stats</span></a></li>
          </ul>
        </div>
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
