<template>
  <div id="imgContainer">
    <!-- <img
      ref="imageRef"
      crossOrigin="anonymous"
      src="https://zhixuetest-sc.oss-cn-hangzhou.aliyuncs.com/scDV2dv_hanzhang_test/marking/scanFile/2025/11/14/AfterCorrect_e1e9479e-91e8-4b15-aa38-e3678db2dc7b.jpg"
    /> -->

    <button @click="generateOriginalImage">生成原卷图片</button>
    <div style="background: red; width: 100px; height: 100px">
      <label>重绘图片</label>
      <img :src="reRenderImg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import html2canvas from "html2canvas";
import { ref } from "vue";

const imageRef = ref<HTMLImageElement | null>(null);

const reRenderImg = ref<string>("");

const init = () => {
  const imgContainer = document.getElementById("imgContainer");
  if (!imgContainer) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src =
    "https://zhixuetest-sc.oss-cn-hangzhou.aliyuncs.com/scDV2dv_hanzhang_test/marking/scanFile/2025/11/14/AfterCorrect_e1e9479e-91e8-4b15-aa38-e3678db2dc7b.jpg";
  img.onload = () => {
    imgContainer.appendChild(img);
  };
};

const generateOriginalImage = async () => {
  if (!imageRef.value) return;
  let htmlContainer = imageRef.value;
  let width = htmlContainer.offsetWidth;
  let height = htmlContainer.offsetHeight;
  let scale = window.devicePixelRatio || 1; // 定义任意放大倍数 支持小数
  while (width * height * scale * scale > 15000000) {
    scale = scale - 1;
    if (scale < 1) {
      scale = 1;
      break;
    }
  }
  let opts = {
    allowTaint: false,
    backgroundColor: "#fff",
    useCORS: true,
    scale: scale,
  };
  window.pageYOffset = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  reRenderImg.value = await html2canvas(htmlContainer, opts).then((canvas) => {
    let context = canvas.getContext("2d");
    if (!context) return "";
    // 【重要】关闭抗锯齿
    context.imageSmoothingEnabled = false;

    // 默认转化的格式为png，也可设置为其他格式
    const imgUrl = canvas.toDataURL("image/png");
    console.log(imgUrl);
    return imgUrl;
  });
};
</script>
