<style lang="scss" module>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: $color-blue-normal;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;

  p {
    margin-bottom: 10px;
    margin-top: 15px;
  }
}
</style>

<template>
  <section>
    <v-header type="pure"/>
    <v-layout>
      <h2 :class="$style.subtitle">
        calibur.tv sitemap
      </h2>
      <div :class="$style.links">
        <p>社区：</p>
        <nuxt-link to="/world/post">帖子</nuxt-link>
        <nuxt-link to="/world/pins">相册</nuxt-link>
        <nuxt-link to="/world/review">漫评</nuxt-link>
        <nuxt-link to="/world/qaq">问答</nuxt-link>
        <p>番剧：</p>
        <nuxt-link to="/bangumi/news">新番放送</nuxt-link>
        <nuxt-link to="/bangumi/timeline">时间轴</nuxt-link>
        <nuxt-link to="/bangumi/tags">分类索引</nuxt-link>
        &nbsp;|&nbsp;
        <nuxt-link to="/bangumi/3/post">帖子</nuxt-link>
        <nuxt-link to="/bangumi/3/video">视频</nuxt-link>
        <nuxt-link to="/bangumi/3/cartoon">漫画</nuxt-link>
        <nuxt-link to="/bangumi/3/role">偶像</nuxt-link>
        <nuxt-link to="/bangumi/3/pins">相册</nuxt-link>
        <nuxt-link to="/bangumi/3/review">漫评</nuxt-link>
        <nuxt-link to="/bangumi/3/qaq">问答</nuxt-link>
        <nuxt-link to="/bangumi/3/setting">设置</nuxt-link>
        <p>用户：</p>
        <nuxt-link to="/user/bing-yu/bangumi">番剧</nuxt-link>
        <nuxt-link to="/user/bing-yu/post">帖子</nuxt-link>
        <nuxt-link to="/user/bing-yu/pins">相册</nuxt-link>
        <nuxt-link to="/user/bing-yu/review">漫评</nuxt-link>
        <nuxt-link to="/user/bing-yu/qaq">问答</nuxt-link>
        <nuxt-link to="/user/bing-yu/role">偶像</nuxt-link>
        <nuxt-link to="/user/bing-yu/draft">草稿</nuxt-link>
        <nuxt-link to="/user/bing-yu/setting">设置</nuxt-link>
        <p>偶像：</p>
        <nuxt-link to="/role/trending">排行榜</nuxt-link>
        <nuxt-link to="/role/1">详情页</nuxt-link>
        <p>帖子：</p>
        <nuxt-link to="/post/1">详情页</nuxt-link>
        <p>图片：</p>
        <nuxt-link to="/pin/1">详情页</nuxt-link>
        <p>漫评：</p>
        <nuxt-link to="/review/1">详情页</nuxt-link>
        <p>提问：</p>
        <nuxt-link to="/qaq/1">详情页</nuxt-link>
        <p>回答：</p>
        <nuxt-link to="/soga/1">详情页</nuxt-link>
        <p>视频：</p>
        <nuxt-link to="/video/1">详情页</nuxt-link>
        <p>其它：</p>
        <nuxt-link to="/search">搜索</nuxt-link>
        <nuxt-link to="/about/hello">欢迎</nuxt-link>
        <nuxt-link to="/about/thanks">品牌与站娘</nuxt-link>
        <nuxt-link to="/about/invite/1">邀请注册</nuxt-link>
        <nuxt-link to="/app/download">下载APP</nuxt-link>
        <p>创作：</p>
        <nuxt-link to="/review/create">写漫评</nuxt-link>
        <nuxt-link to="/review/edit/1">编辑漫评</nuxt-link>
        <p>异常：</p>
        <nuxt-link to="/error/401">401</nuxt-link>
        <nuxt-link to="/error/403">403</nuxt-link>
        <nuxt-link to="/error/404">404</nuxt-link>
        <nuxt-link to="/error/500">500</nuxt-link>
      </div>
    </v-layout>
  </section>
</template>
