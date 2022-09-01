<template>


	<div class="intering">

		<div>
			<el-container id="mainContainer">
				<el-header>
					&lt; 商户藏宝&gt;
				</el-header>
				<el-container>
					<!-- <el-aside width="200px">
						<h2>选择站点</h2>
						<h3>线路</h3>
						<p>
							<el-select v-model="ruleForm.selectFirstColumnObj" value-key="id"
								@change="first_change($event)" placeholder="请选择">
								<el-option v-for="item in line_list" :key="item.id" :label="item.text" :value="item">
								</el-option>
							</el-select>
						</p>
						<h3>站点</h3>
						<p>

							<el-select v-model="station" placeholder="请选择" value-key="id" @change="position($event)">
								<el-option v-for="item in secondColumnList" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>

						</p>

					</el-aside> -->
					<el-container>
						<el-main>
							<iframe src="http://thelittlestar.cn:8866/SubwayFootPrint/manager/dist/static/xxx.html"
								id="iFrameC" name="myiframe" frameborder="0" width="100%" scrolling="no"
								style="min-height: 500px;"></iframe>
						</el-main>
					</el-container>
				</el-container>
				<el-footer>
					<el-button type="primary" @click="confirm">
						确认
					</el-button>
					<!-- <el-button @click="undo">
	               重置
	           </el-button> -->
				</el-footer>
			</el-container>
		</div>
	</div>


	<el-dialog v-model="dialog_visible" title="请选择要添加的奖品" width="60%">
		<el-select v-model="treasureData.val" @change="selected" placeholder="请选择">
			<el-option v-for="item in tableData.arr" :key="item" :label="item.name" :value="item">
			</el-option>
		</el-select>
		<!--宝藏信息展示-->
		<div>


			<el-row id="ccnd">
				<el-col :span="11">
					<el-form>
						<el-form-item label="奖品编号">
							<el-input v-model="treasureData.aid" disabled placeholder="{{treasureData.aid}}">
								<!-- <template #default="placeholder">
									<span>
										{{treasureData.aid}}
									</span>scope
								</template> -->
							</el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="2" />
				<el-col :span="11">
					<el-form :model="treasureData">
						<el-form-item label="投放数量">
							<el-input v-model="treasureData.num" placeholder="1" type="number" min="1"
								oninput="value=value.replace(/[^\d]/g,'')" />
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="11">
					<el-form :model="treasureData">
						<el-form-item label="对应碳积分">
							<el-input v-model="treasureData.credit" placeholder="{{treasureData.credit}}" type="number"
								min="1" oninput="value=value.replace(/[^\d]/g,'')" />
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="2" />
				<el-col :span="11">
					<el-form :model="station">
						<el-form-item label="埋藏站点">
							<el-input v-model="treasureData.pid" placeholder="{{treasureData.pid}}" disabled />
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>


			<el-form v-model="treasureData">
				<el-form-item label="宝箱留言">
					<el-input v-model="treasureData.message" type="textarea" />
				</el-form-item>
			</el-form>


		</div>
		<el-button type="primary" @click="inter">
			确认
		</el-button>

	</el-dialog>

</template>

<script>
	import {
		onMounted,
		reactive
	} from "vue";
	import {
		ref
	} from 'vue'
	import AMapLoader from "@amap/amap-jsapi-loader";
	import {
		getAllAwards,
		interTreasure
	} from "../../api/api";
	import _ from "lodash";
	import {
		ElMessage,
		ElNotification
	} from "element-plus";


	export default {
		setup() {
			//挂载
			onMounted(() => {

				console.log("mounted");
				//getSub(131);
				//监听子页面传参
				window.addEventListener('message', function(event) {
					//此处执行事件
					// console.log('监听到子页面的传参')
					// console.log(event.data.data)
					// this.station = event.data.data
					console.log("pid is:" + event.data.data)
					treasureData.pid = event.data.data
					//this.treasureData.pid=this.station
				})

			});
			const dialog_visible = ref(false)
			//商户奖品列表
			const tableData = reactive({
				arr: [],
			})

			const treasureData = reactive({
				aid: "aid",
				credit: 1,
				num: 1,
				message: 'message',
				pid: 'pid',
				val: {}
			})
			//点击确认按钮
			function confirm() {
				//显示宝藏池框
				console.log("confirm")
				dialog_visible.value = true;
				console.log(treasureData.pid)
				// console.log(this.treasureData)
				getAllAwards({})
					.then((res) => {
						tableData.arr = _.cloneDeep(res.data.data);
					})
					.catch((err) => console.log(err));
			}

			function selected() {

				console.log("selected")
				console.log(treasureData.val)
				treasureData.aid = treasureData.val.aid
			}

			function inter() {
				console.log("inter")
				console.log(treasureData)
				interTreasure({
					"aid": treasureData.aid,
					"num": treasureData.num,
					"credit": treasureData.credit,
					"pid": treasureData.pid,
					"message": treasureData.message,
				}).then((res) => {
					ElMessage({
						message: "藏宝成功",
						type: "success"
					})
				}).catch((err) => {
					ElMessage({
						message: "藏宝失败",
						type: "warning"
					})
				})
				dialog_visible.value = false
			}

			return {
				dialog_visible,
				tableData,
				treasureData,
				confirm,
				selected,
				inter
			}
		}




	}
</script>

<style scoped>
	#dz2 {
		background-color: white;
		position: absolute;
		top: 60px;
		left: 0;
		right: 0;
		padding: 10px 0;
		/* margin: 0 10px; */
		margin-top: 0px;
		margin-bottom: -10px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		bottom: 0px;
	}

	#mainContainer {
		height: 100%;
	}

	#map {
		overflow: hidden;
		width: 100%;
		height: 100%;
		margin: 0;
		font-family: "微软雅黑";
	}

	.amap-logo {
		display: none !important;
	}

	.amap-copyright {
		display: none !important;
	}

	.el-container {
		height: 100%;
	}

	.el-header {
		margin-top: 100px;
		background-color: rgb(220, 220, 220, 0.9);
		color: #333;
		text-align: center;
		font-size: 30px;
		;
		line-height: 60px;
		border-radius: 15px 15px 0 0;
	}

	.el-footer {
		background-color: rgb(220, 220, 220, 0.9);
		color: #333;
		text-align: center;
		line-height: 60px;
		border-radius: 0px 0px 0px 15px;
	}

	.el-aside {
		background-color: #d3dce6;
		color: #333;
		text-align: left;
		vertical-align: text-top;
		height: 500px;
		opacity: 0.9;
	}

	.el-main {
		/* background-color: #e9ff23; */
		background-color: white;
		color: #333;
		text-align: left;
		vertical-align: text-top;
		height: 500px;
		opacity: 0.9;
	}

	.el-menu {
		background-color: #e9ff23;
		opacity: 0.9;
	}

	.el-input {
		width: 200px;
	}

	#iFrameC {
		height: 100%;
	}

	#head {
		;
	}

	#foot {
		height: 100%;
	}

	#ccnd {
		margin-top: 10px;
	}
</style>
