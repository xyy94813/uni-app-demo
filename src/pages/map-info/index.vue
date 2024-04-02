<template>
    <view>
        <map class="map-container" :longitude="pointCoords[0]" :latitude="pointCoords[1]" :markers="markers"
            :circles="circles" :polyline="polyline" :polygons="polygons" :polygon="polygons"></map>
    </view>
    <view>
        <up-text type="info" :text="`当前位置：${pointCoords.join(', ')}`" class="title" />
    </view>
    <view>
        <up-text type="warning" text="Tips:" />
        <up-text v-for="tip in tips" type="info" :text="tip" :key="tip" />
    </view>
</template>

<script setup lang="ts">
// https://uniapp.dcloud.net.cn/component/map.html
// <map> 组件的宽/高推荐写直接量，比如：750rpx，不要设置百分比值。
// map 相关的 key 需要 manifest 中配置

// const curLocation = await new Promise(r => {
//     uni.getLocation({
//         type: 'gcj02',
//         success: res => r(res),
//     })
// })
const tips = [
    '`<map>` 相关的 key 需要 manifest 中配置',
    '`<map>` 组件的宽/高推荐写 vw/vh，目前观测兼容较好',
    '未采用 GeoJSON 结构，`<map>` 自己封装了一层数据结构需要做转换. 参考官方文档.',
    '不支持 `MultiplePolyline/MultiplePolygon` 等 coords, 需要转换成 `Array<Polygon|Polyline>`',
    '不支持 PolygonWithHole 需要转换成多个 Polygon',
    '支付宝小程序中的覆盖物样式必填，出于鲁棒性，最好不使用任何默认配置！！！！',
    '支付宝小程序颜色必须采用 rgba hex 格式，但构建 h5 时，该格式会异常!!!!'
];

const coordsToMapPoint = (coords: number[]) => ({
    longitude: coords[0],
    latitude: coords[1],
});

// geojson coords 兼容情况
const pointCoords = [116.470642, 39.954485];
// 需要使用内部数据结构
const markers = [
    [116.470642, 39.954485],
    [116.468287, 39.953937],
].map((coords, index) => ({
    ...coordsToMapPoint(coords),
    id: index,
    iconPath: '//webapi.amap.com/theme/v1.3/markers/b/mark_bs.png', // required
    width: 18, // 不填会报错
    height: 32, // 不填会报错
})); //	Array 标记点

const circles = markers.map(marker => ({
    longitude: marker.longitude,
    latitude: marker.latitude,
    radius: 200,
    fillColor: '#FF6456DD',
    color: '#000000DD',
    strokeWidth: 4, // 支付宝必须填
}))

const ring1 = [
    [116.472833, 39.962855],
    [116.471476, 39.963143],
    [116.469709, 39.963297],
    [116.46826, 39.961842],
    [116.470652, 39.960202],
    [116.474724, 39.960193],
    [116.473896, 39.961207],
    [116.473988, 39.962838],
];

// ring2 in ring1
const ring2 = [
    [116.472867, 39.962644],
    [116.472987, 39.962015],
    [116.47198, 39.961771],
    [116.471148, 39.961864],
    [116.471017, 39.962166],
    [116.470656, 39.961889],
    [116.470667, 39.961369],
    [116.470721, 39.961126],
    [116.473578, 39.961226],
    [116.473392, 39.962652],
]

const ring3 = [
    [116.470642, 39.954485],
    [116.468287, 39.953937],
    [116.468165, 39.956291],
    [116.467968, 39.958317],
    [116.4678, 39.958853],
    [116.470095, 39.959657],
    [116.473104, 39.95968],
    [116.473089, 39.955265],
];

// ring4 in ring3
const ring4 = [
    [116.472174, 39.956411],
    [116.469913, 39.955826],
    [116.469784, 39.956135],
    [116.470082, 39.956623],
    [116.470309, 39.957031],
    [116.470653, 39.957249],
    [116.471079, 39.957332],
    [116.471824, 39.957188],
    [116.472228, 39.957002],
    [116.472353, 39.956871],
];
// ring5 in ring3, 且与 ring4 不重叠
const ring5 = [
    [116.469962, 39.959104],
    [116.469268, 39.958791],
    [116.469238, 39.957987],
    [116.469917, 39.957757],
    [116.47067, 39.957868],
    [116.470641, 39.958368],
    [116.470211, 39.958756],
];

//	Array 路线	飞书小程序不支持, 貌似支付宝也不支持
const polyline = [ring1, ring2].map((line, index) => ({
    points: line.map(coordsToMapPoint),
    // id: index,
    width: 10, // 微信环境必须此属性
    color: '#000000DD', // 支付宝小程序必须要该属性, 而且必须得是 rgba hex
}));
// const circles = []; //	Array 圆
const polygons = [
    // multiple hole 不支持
    // [ring3, ring4, ring5],
    ring3, ring4, ring5,
    // multiple polygon ??
].map((polygonCoords, index) => {
    const mapToPoint = (coords) => {
        if (Array.isArray(coords) && Array.isArray(coords[0])) {
            return coords.map(mapToPoint)
        }
        return coordsToMapPoint(coords)
    }
    return ({
        points: mapToPoint(polygonCoords),
        fillColor: index === 0 ? '#FF0000DD' : '#FFFFFFDD', // trick way
        strokeWidth: index === 0 ? 8 : 4, // trick way
        strokeColor: '#000000DD',
    })
});

const mapToPoint = (coords: any) => {
    if (Array.isArray(coords) && Array.isArray(coords[0])) {
        return coords.map(mapToPoint)
    }
    return coordsToMapPoint(coords as number[])
}
//
</script>

<style lang="scss" scoped>
.map-container {
    width: 100vw;
    height: 50vh;
}
</style>
