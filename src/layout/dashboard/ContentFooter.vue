<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{name:'dashboard'}">{{$ml.get('dashboard')}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="" target="_blank"> &nbsp; Muhammad Awd </a>&nbsp;
        <a href="" target="_blank">&nbsp; Al Rights Are Reserved </a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {};
</script>
<style>
</style>
