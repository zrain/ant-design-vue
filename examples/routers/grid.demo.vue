<style lang="less" scoped>
	.demo-container {
		padding-bottom: 80px;
		p,
		.demo-row {
			margin: 10px 0;
			padding: 0 20px;
		}
		h4 {
			margin: 10px 0;
		}
	}
	.demo-container .ant-row-flex > div:not(.gutter-row):nth-child(odd), 
	.demo-container .ant-row>div:not(.gutter-row):nth-child(odd) {
	    background: rgba(0,160,233,.7);
	}
	.demo-container .ant-row-flex>div:not(.gutter-row), 
	.demo-container .ant-row>div:not(.gutter-row) {
	    background: #00a0e9;
	    padding: 16px 0;
	}
	.demo-container .ant-row-flex>div, 
	.demo-container .ant-row>div {
	    padding: 5px 0;
	    text-align: center;
	    border-radius: 0;
	    min-height: 30px;
	    margin-top: 8px;
	    margin-bottom: 8px;
	    color: #fff;
	}
	.gutter-box {
	    background: #00A0E9;
	    padding: 5px 0;
	}
	.demo-flex {
		background: #f5f5f5;
	}
	.api-table {
		width: 100%;
		margin: 20px 0;
		text-align: left;
		border-top: 1px solid #eee;
		border-left: 1px solid #eee;
		th {
			font-weight: 400;
		}
		th,td {
			padding: 5px 10px;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
		}
	}
</style>

<template>
	<div class="demo-container">
		<h1>Grid Demo</h1>
		<section>
			<h4>基础栅格</h4>
			<p>从堆叠到水平排列。</p>
			<p>使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 Row 内。</p>
			<p>
				<Row>
				    <Col :span="12">col-12</Col>
				    <Col :span="12">col-12</Col>
				</Row>
				<Row>
				    <Col :span="8">col-8</Col>
				    <Col :span="8">col-8</Col>
				    <Col :span="8">col-8</Col>
				</Row>
				<Row>
				    <Col :span="6">col-6</Col>
				    <Col :span="6">col-6</Col>
				    <Col :span="6">col-6</Col>
				    <Col :span="6">col-6</Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>区块间隔</h4>
			<p>栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性，我们推荐使用 (16+8n)px 作为栅格间隔。</p>
			<p>
				<button @click="num++">Num++</button>
				<button @click="num--">Num--</button>
				<button @click="gutter = gutter + 10">Gutter10++</button>
				<button @click="gutter = gutter - 10">Gutter10--</button>
			</p>
			<p>
				<Row :gutter="gutter">
				    <Col class="gutter-row" :span="6" v-for="i in num" :key="i">
				        <div class="gutter-box">col-6</div>
				    </Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>左右偏移</h4>
			<p>
				列偏移。
			</p>
			<p>
				使用 offset 可以将列向右侧偏。例如，offset="4"/:offset="4" 将元素向右侧偏移了 4 个列（column）的宽度。
			</p>
			<p>
				<Row>
				    <Col span="8">col-8</Col>
				    <Col span="8" offset="8">col-8</Col>
				</Row>
				<Row>
				    <Col span="6" offset="6">col-6 col-offset-6</Col>
				    <Col span="6" offset="6">col-6 col-offset-6</Col>
				</Row>
				<Row>
				    <Col span="12" offset="6">col-12 col-offset-6</Col>
				</Row>
			</p>	
		</section>
		<section>
			<h4>栅格排序</h4>
			<p>
				列排序。
			</p>
			<p>
				通过使用 push 和 pull 类就可以很容易的改变列（column）的顺序。
			</p>
			<p>
				<Row>
				    <Col span="18" push="6">col-18 col-push-6</Col>
				    <Col span="6" pull="18">col-6 col-pull-18</Col>
				</Row>
			</p>
			<p>
				<Row>
				    <Col span="12" push="6">col-12 col-push-6</Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>Flex布局</h4>
			<p>
				Flex 布局基础。
			</p>
			<p>
				使用 row-flex 定义 flex 布局，其子元素根据不同的值 start,center,end,space-between,space-around，分别定义其在父节点里面的排版方式。
			</p>
			<div class="demo-row">
				<h6>sub-element align left</h6>
			    <Row type="flex" justify="start" className="demo-flex">
			      <Col span="4">col-4</Col>
			      <Col span="4">col-4</Col>
			      <Col span="4">col-4</Col>
			      <Col span="4">col-4</Col>
			    </Row>
			</div>
			<div class="demo-row">
				<h6>sub-element align center</h6>
				<Row type="flex" justify="center" className="demo-flex">
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				</Row>
			</div>
			<div class="demo-row">
				<h6>sub-element align right</h6>
				<Row type="flex" justify="end" className="demo-flex">
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				</Row>

			</div>
			<div class="demo-row">
				<h6>sub-element monospaced arrangement</h6>
				<Row type="flex" justify="space-between" className="demo-flex">
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				</Row>
			</div>
			<div class="demo-row">
				<h6>sub-element align full</h6>
				<Row type="flex" justify="space-around" className="demo-flex">
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				  <Col span="4">col-4</Col>
				</Row>
			</div>
		</section>
		<section>
			<h4>Flex 对齐</h4>
			<div class="demo-row">
				<h6>Align Top</h6>
			    <Row type="flex" justify="center" align="top" className="demo-flex">
			      	<Col span="4"><div style="height:100px">col-4</div></Col>
			      	<Col span="4"><div style="height:50px">col-4</div></Col>
			      	<Col span="4"><div style="height:120px">col-4</div></Col>
			      	<Col span="4"><div style="height:80px">col-4</div></Col>
			    </Row>
			</div>
			<div class="demo-row">
				<h6>Align Center</h6>
				<Row type="flex" justify="space-around" align="middle" className="demo-flex">
				  	<Col span="4"><div style="height:100px">col-4</div></Col>
			      	<Col span="4"><div style="height:50px">col-4</div></Col>
			      	<Col span="4"><div style="height:120px">col-4</div></Col>
			      	<Col span="4"><div style="height:80px">col-4</div></Col>
				</Row>
			</div>
			<div class="demo-row">
				<h6>Align Bottom</h6>
				<Row type="flex" justify="space-between" align="bottom" className="demo-flex">
				  	<Col span="4"><div style="height:100px">col-4</div></Col>
			      	<Col span="4"><div style="height:50px">col-4</div></Col>
			      	<Col span="4"><div style="height:120px">col-4</div></Col>
			      	<Col span="4"><div style="height:80px">col-4</div></Col>
				</Row>
			</div>
		</section>
		<section>
			<h4>Flex 排序</h4>
			<p>
				通过 Flex 布局的 Order 来改变元素的排序。
			</p>
			<p>
				<Row type="flex">
				    <Col span="6" order="4">1 col-order-4</Col>
				    <Col span="6" order="3">2 col-order-3</Col>
				    <Col span="6" order="2">3 col-order-2</Col>
				    <Col span="6" order="1">4 col-order-1</Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>响应式布局</h4>
			<p>
				参照 Bootstrap 的 响应式设计，预设五个响应尺寸：xs sm md lg xl。
			</p>
			<p>
				<Row>
				    <Col xs="2" sm="4" md="6" lg="8" xl="10">Col</Col>
				    <Col xs="20" sm="16" md="12" lg="8" xl="4">Col</Col>
				    <Col xs="2" sm="4" md="6" lg="8" xl="10">Col</Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>其他响应式布局</h4>
			<p>
				span pull push offset order 属性可以通过内嵌到 xs sm md lg xl 属性中来使用。其中 :xs="6" 相当于 :xs="{ span: 6 }"。
			</p>
			<p>
				<Row>
				    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
				    <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
				    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
				</Row>
			</p>
		</section>
		<section>
			<h4>API</h4>
			<h4>Row</h4>
			<table class="api-table">
				<thead>
					<tr>
						<th>属性</th>
						<th>说明</th>
						<th>类型</th>
						<th>默认值</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>gutter</td>
						<td>栅格间隔</td>
						<td>number</td>
						<td>0</td>
					</tr>
					<tr>
						<td>type</td>
						<td>布局模式，可选 flex，现代浏览器 下有效</td>
						<td>string</td>
						<td>-</td>
					</tr>
					<tr>
						<td>align</td>
						<td>flex 布局下的垂直对齐方式：top middle bottom</td>
						<td>string</td>
						<td>top</td>
					</tr>
					<tr>
						<td>justify</td>
						<td>flex 布局下的水平排列方式：start end center space-around space-between</td>
						<td>string</td>
						<td>start</td>
					</tr>
				</tbody>
			</table>
			<h4>Col</h4>
			<table class="api-table">
				<thead>
					<tr>
						<th>属性</th>
						<th>说明</th>
						<th>类型</th>
						<th>默认值</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>span</td>
						<td>栅格占位格数，为 0 时相当于 display: none</td>
						<td>
							<p>number | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
					<tr>
						<td>order</td>
						<td>栅格顺序，flex 布局模式下有效</td>
						<td>
							<p>number | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>0</td>
					</tr>
					<tr>
						<td>offset</td>
						<td>栅格左侧的间隔格数，间隔内不可以有栅格</td>
						<td>
							<p>number | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>0</td>
					</tr>
					<tr>
						<td>push</td>
						<td>栅格向右移动格数</td>
						<td>
							<p>number | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>0</td>
					</tr>
					<tr>
						<td>pull</td>
						<td>栅格向左移动格数</td>
						<td>
							<p>number | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>0</td>
					</tr>
					<tr>
						<td>xs</td>
						<td><768px 响应式栅格，可为栅格数或一个包含其他属性的对象 </td>
						<td>
							<p>number | object | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
					<tr>
						<td>sm</td>
						<td>≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象</td>
						<td>
							<p>number | object | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
					<tr>
						<td>md</td>
						<td>≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象</td>
						<td>
							<p>number | object | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
					<tr>
						<td>lg</td>
						<td>≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象</td>
						<td>
							<p>number | object | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
					<tr>
						<td>xl</td>
						<td>≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象</td>
						<td>
							<p>number | object | string</p>
							<p>(string会进行parseInt处理后当number输入)</p>
						</td>
						<td>-</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				num: 4,
				gutter: 16,
			}
		}
	}
</script>