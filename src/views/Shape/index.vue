<template>
  <div class="map-container">
    <div>
      <span>通过Entity添加形状——立方体</span>
      <div class="map" id="box-map1"></div>
    </div>
    <div>
      <span>通过CZML添加形状——立方体</span>
      <div class="map" id="box-map2"></div>
    </div>
    <div>
      <span>通过Entity添加形状——点</span>
      <div class="map" id="point-map"></div>
    </div>
  </div>
  <div class="explain">
    <h3>形状相关描述</h3>
    <ul>
      <li>
        point：点，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/PointGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        box：立方体，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Box.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/BoxGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        ellipse：椭圆，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/EllipseGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        corridor：走廊，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Corridor.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/CorridorGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        cylinder：圆柱，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/CylinderGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        polygon：多边形，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Polygon.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/PolygonGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        polyline：折线，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Polyline.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/PolylineGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        polylineVolume：立体折线，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/PolylineVolumeGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        rectangle：长方形，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Rectangle.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/RectangleGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        ellipsoid：椭球体，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/EllipsoidGraphics.html"
          >中文文档</a
        >
      </li>
      <li>
        Wall：墙，
        <a
          target="_blank"
          href="https://sandcastle.cesium.com/index.html?src=Wall.html"
          >示例</a
        >，
        <a
          target="_blank"
          href="http://cesium.xin/cesium/cn/Documentation1.62/WallGraphics.html"
          >中文文档</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  setup() {
    const config = {
      geocoder: false, // 查找位置工具
      homeButton: false, // 视角返回初始位置
      sceneModePicker: false, // 选择视角的模式。2d,3d,哥伦布视图(CV)
      baseLayerPicker: false, // 图层选择器，选择要显示的地图服务和地形服务
      navigationHelpButton: false, // 导航帮助按钮
      animation: false, // 动画器件，控制动画播放速度
      timeline: false, //时间线，指当前时间，并允许用户跳到指定时间
      fullscreenButton: false, // 全屏按钮
      vrButton: false // 用于切换vr模式的单按钮小部件
    };

    const initBoxMap1 = () => {
      // eslint-disable-next-line
      const viewer = new Cesium.Viewer('box-map1', config);
      // eslint-disable-next-line
      const redBox = viewer.entities.add({
        name: 'Red box with black outline',
        // eslint-disable-next-line
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 300000.0),
        box: {
          // eslint-disable-next-line
          dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0), // 长宽高
          // eslint-disable-next-line
          material: Cesium.Color.RED.withAlpha(0.5),
          outline: true,
          // eslint-disable-next-line
          outlineColor: Cesium.Color.BLACK
        }
      });
      viewer.zoomTo(viewer.entities);
    };

    const initBoxMap2 = () => {
      const czml = [
        {
          id: 'document',
          name: 'box',
          version: '1.0'
        },
        {
          id: 'shape2',
          name: 'Red box with black outline',
          position: {
            cartographicDegrees: [-107.0, 40.0, 300000.0]
          },
          box: {
            dimensions: {
              cartesian: [400000.0, 300000.0, 500000.0]
            },
            material: {
              solidColor: {
                color: {
                  rgba: [255, 0, 0, 128]
                }
              }
            },
            outline: true,
            outlineColor: {
              rgba: [0, 0, 0, 255]
            }
          }
        }
      ];
      // eslint-disable-next-line
      const viewer = new Cesium.Viewer('box-map2', config);
      // eslint-disable-next-line
      const dataSourcePromise = Cesium.CzmlDataSource.load(czml);
      viewer.dataSources.add(dataSourcePromise);
      viewer.zoomTo(dataSourcePromise);
    };

    const initPointMap = () => {
      // eslint-disable-next-line
      const viewer = new Cesium.Viewer('point-map', config);
      // eslint-disable-next-line
      const redPoint = viewer.entities.add({
        name: 'Red box with black outline',
        // eslint-disable-next-line
        position: Cesium.Cartesian3.fromDegrees(-107.0, 40.0, 0.0),
        point: {
          pixelSize: 10, //点的大小
          // eslint-disable-next-line
          color: Cesium.Color.RED, //点的颜色
          // eslint-disable-next-line
          outlineColor: Cesium.Color.YELLOW, //外圈颜色
          outlineWidth: 1 //外圈大小
        }
      });
      viewer.zoomTo(viewer.entities);
    };

    onMounted(() => {
      initBoxMap1();
      initBoxMap2();
      initPointMap();
    });
  }
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 25%;
    height: 25%;
    div {
      margin: 10px 10px 10px 0;
    }
  }
}
// 隐藏版本信息
:deep(.cesium-viewer-bottom) {
  display: none;
}
</style>
