// 控制侧边栏伸缩，同时cesium界面大小跟随变化
const sidebar = document.querySelector('.sidebar')
const button = document.querySelector('.sidebarbutton')
const p = document.querySelector('.point')
const cesiumWindow = document.querySelector('.cesiumwindow')

button.addEventListener('click', function () {
	sidebar.classList.toggle('move')
	this.classList.toggle('open')
	p.classList.toggle('move2')
	// sidebar.style.left = '-80px'
	cesiumWindow.classList.toggle('cesiumwindowMove')
})

// cesium
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZjVmZDAzMi02YjdjLTRkODYtYThlNC0zNTYxNWJjMzUwZjUiLCJpZCI6MTE4NzYxLCJpYXQiOjE2NzE0NDg0OTB9.QXcMQA2md9gpXCUSmw9OnJe1NLL2ZzaI3eql6Zap-80'
var viewer = new Cesium.Viewer('cesiumContainer')
const viewlayer = viewer.imageryLayers
viewlayer.remove(viewlayer.get(0))
// arcgis地图服务
const esri = new Cesium.ArcGisMapServerImageryProvider({
	url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer'
})
viewer.imageryLayers.addImageryProvider(esri)
// 定义增加模型函数
function add_entity(pos) {
	const entity = viewer.entities.add({
		id: `myEntity2`,
		position: pos, //模型的位置
		// orientation: orientation_air,
		model: {
			// uri: './model/BoomBox.gltf',
			uri: './sources/Apps/SampleData/models/GroundVehicle/GroundVehicle.glb',
			minimumPixelSize: 40,
			maximumScale: 10000,
			show: true,
		},
	});
	// 让摄像机视口快速定位到模型位置
	viewer.trackedEntity = entity;
}

// 设定坐标
let x = 116.39
let y = 39.91
let k = 0
const position3 = Cesium.Cartesian3.fromDegrees(x, y, 20)
add_entity(position3, k)
function aa() {
	timer = setInterval(() => {
		// 新的模型坐标
		const position2 = Cesium.Cartesian3.fromDegrees(x, y, 20)

		// 通过移除和重新添加来移动模型
		// viewer.entities.remove(viewer.entities.getById(`myEntity2`))
		// add_entity(position2, k)

		// 通过修改模型位置来移动模型
		viewer.entities.getById('myEntity2').position.setValue(position2)
		// 改变坐标值
		x += 0.00001
		y += 0.00001
		// console.log(document.visibilityState);

	}, 10)
	// if (button.className.includes('open')) {
	// 	clearInterval(timer)
	// } else {
	// 	timer
	// }
}
setTimeout(aa, 3000)


// 添加暂停事件
button.addEventListener('click', function () {
	if (button.className.includes('open')) {
		clearInterval(timer)
	} else {
		aa()
	}
})

const box = document.createElement('div')
box.className = 'box'
const style = {
	width: '100px',
	// height: '20px',
	color: 'red',
	backgroundColor: 'pink'
}




Object.assign(box.style, style)

sidebar.addEventListener('click', function () {
	// axios({
	// 	url: "https://hmajax.itheima.net/api/province"
	// }).then(sdf => {
	// 	console.log(sdf.data.list)
	// 	console.log(this)
	// 	box.innerHTML = sdf.data.list.splice(1, 4).join('<br>')
	// 	this.appendChild(box)
	// })
	// console.log($.ajax());
	// $.ajax({
	// 	url: "https://hmajax.itheima.net/api/province",
	// 	success: sdf => {
	// console.log(sdf.list)
	// console.log(this)
	// 		box.innerHTML = sdf.list.splice(1, 4).join('<br>')
	// 		this.appendChild(box)
	// 	}
	// });

	$.ajax({
		url: "http://127.0.0.1:2020",

		success: sdf => {
			console.log(typeof sdf)
			const newWindow = open('http://127.0.0.1:2020')
			newWindow.document.write(sdf)
			setTimeout(() => {
				newWindow.close()
			}, 2000)
			// console.log(this)
			// box.innerHTML = sdf.list.splice(1, 4).join('<br>')
			// this.appendChild(box)
		}
	});
})
// sidebar.appendChild(box)