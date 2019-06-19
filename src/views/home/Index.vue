<template>
  <div class="home">
      <nav class="navbar navbar-inverse navbar-embossed navbar-expand-lg" role="navigation">

        <router-link  class="navbar-brand" :to="'home'">Gtensor</router-link>
        <button type="button" class="navbar-toggler"></button>
        <div class="collapse navbar-collapse" id="navbar-collapse-01">
          <ul class="nav navbar-nav mr-auto">
            <li><router-link :to="'fitte'">线性回归<span class="navbar-unread">2</span></router-link></li>
            <li><router-link :to="'imgtrain'">手写字识别</router-link></li>
            <li><router-link :to="'crawler'">爬虫</router-link></li>
            <li><router-link :to="'test'">Test</router-link></li>
            <!--             
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Messages</a>
              <span class="dropdown-arrow"></span>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
            <li><a href="#fakelink">About Us</a></li> -->
            </ul>
            <form class="navbar-form form-inline my-2 my-lg-0" action="#" role="search">
            <div class="form-group">
              <div class="input-group">
                <input class="form-control" id="navbarInput-01" type="search" placeholder="Search">
                <span class="input-group-btn">
                  <button type="submit" class="btn"><span class="fui-search"></span></button>
                </span>
              </div>
            </div>
          </form>
        </div><!-- /.navbar-collapse -->
      </nav><!-- /navbar -->
      <div>
        <div class="gy-home-page">
          <router-view/>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  components: {
  
  }
}
</script>
<style>
  .gy-home-page{
    max-width: 1280px;
    margin: 0 auto
  }
</style>
