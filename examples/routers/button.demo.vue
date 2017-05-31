<style lang="less">
	.demo-container {
		padding-bottom: 80px;
	}
	p {
		margin: 10px 0;
		width: 466px;
		padding: 0 20px;
	}
	.api-table {
		text-align: left;
		margin-left: 10px;
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
		<section>
			<h4>测试</h4>
			<p>测试 class 属性, class/style 会直接继承到 button 原生HTML标签上</p>
			<p>
				<Button type="primary" class="test-classname" style="color:red;">Primary</Button>
			</p>
		</section>
		<section>
			<h4>按钮类型</h4>
			<p>Type: primary | default | dashed | danger</p>
			<p>
				按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。
			</p>
			<p>
				<Button type="primary">Primary</Button>
				<Button type="default">Default</Button>
				<Button type="dashed">Dashed</Button>
				<Button type="danger">Danger</Button>
			</p>
		</section>
		<section>
			<h4>图标按钮</h4>
			<p>
				当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性，或者直接在 Button 内使用 Icon 组件。
				如果想控制 Icon 具体的位置，只能直接使用 Icon 组件，而非 icon 属性。
			</p>
			<p>
				<Button type="primary" shape="circle" icon="search" />
			    <Button type="primary" icon="search">Search</Button>
			    <Button shape="circle" icon="search" />
			    <Button icon="search">Search</Button>
			</p>
			<p>
				<Button shape="circle" icon="search" />
				<Button icon="search">Search</Button>
				<Button type="dashed" shape="circle" icon="search" />
				<Button type="dashed" icon="search">Search</Button>
			</p>
		</section>
		<section>
			<h4>按钮尺寸</h4>
			<p>
				Size: large | default | small
			</p>
			<p>
				按钮有大、中、小三种尺寸。
				通过设置 size 为 large small 分别把按钮设为大、小尺寸。若不设置 size，则尺寸为中。
			</p>
			<p>
				<Button type="default" size="large" @click="size = 'large'">Large</Button>
				<Button type="default" size="default" @click="size = 'default'">Default</Button>
				<Button type="default" size="small" @click="size = 'small'">Small</Button>
			</p>
			<p>
				<Button type="primary" shape="circle" icon="download" :size="size" />
		        <Button type="primary" icon="download" :size="size">Download</Button>
		        <Button type="primary" :size="size">Normal</Button>
			</p>
			<p>
				<ButtonGroup>
			        <Button type="primary" :size="size">
			            <Icon type="left" />Backward
			        </Button>
			        <Button type="primary" :size="size">
			            Forward<Icon type="right" />
			        </Button>
				</ButtonGroup>
			</p>
		</section>
		<section>
			<h4>不可用状态</h4>
			<p>
				添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变
			</p>
			<p>
			    <Button type="primary">Primary</Button>
			    <Button type="primary" disabled>Primary(disabled)</Button>
			</p>
			<p>
				<Button>Default</Button>
				<Button disabled>Default(disabled)</Button>
			</p>
			<p>
				<Button>Ghost</Button>
				<Button disabled>Ghost(disabled)</Button>
			</p>
			<p>
				<Button type="dashed">Dashed</Button>
				<Button type="dashed" disabled>Dashed(disabled)</Button>
			</p>
		</section>
		<section>
			<h4>加载中状态</h4>
			<p>
				添加 loading 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。
			</p>
			<p>
				<Button type="primary" :loading='true' size="large"></Button>
				<Button type="primary" loading>
		          Loading
		        </Button>
		        <Button type="primary" size="small" loading>
		          Loading
		        </Button>
			</p>
			<p>
				<Button type="primary" :loading='loading' @click="enterLoading">
		          	Click me!
		        </Button>
		        <Button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
		          	Click me!
		        </Button>
			</p>
			<p>
				<Button shape="circle" loading />
				<Button type="primary" shape="circle" loading />
			</p>
		</section>
		<section>
			<h4>Basic</h4>
			<p>
				<ButtonGroup>
				    <Button>Cancel</Button>
				    <Button type="primary">OK</Button>
			    </ButtonGroup>
			    <ButtonGroup>
			      	<Button disabled>L</Button>
			      	<Button disabled>M</Button>
			      	<Button disabled>R</Button>
			    </ButtonGroup>
			    <ButtonGroup>
			      	<Button type="primary">L</Button>
			      	<Button>M</Button>
			      	<Button>M</Button>
			      	<Button type="dashed">R</Button>
			    </ButtonGroup>
			</p>
			<h4>With Icon</h4>
			<p>
				<ButtonGroup>
					<Button type="primary">
						<Icon type="left" />Go back
					</Button>
					<Button type="primary">
						Go forward<Icon type="right" />
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button type="primary" icon="cloud" />
					<Button type="primary" icon="cloud-download" />
				</ButtonGroup>
			</p>
		</section>
		<section>
			<h4>延迟loading</h4>
			<p>
				<Button type="primary" @click="enterTimeoutLoading" :loading="timeoutLoading"> Click Me! 延迟Loading </Button>
			</p>
		</section>
		<section>
			<h4>API</h4>
			<p>
				通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled
			</p>
			<p>
				按钮的属性说明如下：
			</p>
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
						<td>type</td>
						<td>设置按钮类型，可选值为 primary dashed danger(版本 2.7 中增加) 或者不设</td>
						<td>string</td>
						<td>-</td>
					</tr>
					<tr>
						<td>htmlType</td>
						<td>设置 button 原生的 type 值，可选值请参考 HTML 标准</td>
						<td>string</td>
						<td>button</td>
					</tr>
					<tr>
						<td>icon</td>
						<td>设置按钮的图标类型</td>
						<td>string</td>
						<td>-</td>
					</tr>
					<tr>
						<td>shape</td>
						<td>设置按钮形状，可选值为 circle 或者不设</td>
						<td>string</td>
						<td>-</td>
					</tr>
					<tr>
						<td>size</td>
						<td>设置按钮大小，可选值为 small large 或者不设	</td>
						<td>string</td>
						<td>default</td>
					</tr>
					<tr>
						<td>loading</td>
						<td>设置按钮载入状态</td>
						<td>boolean | { delay: number }</td>
						<td>false</td>
					</tr>
					<tr>
						<td>ghost</td>
						<td>幽灵属性，使按钮背景透明</td>
						<td>boolean</td>
						<td>false</td>
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
				size: 'default',
				loading: false,
				iconLoading: false,
				timeoutLoading: false,
			}
		},
		methods: {
			enterLoading () {
				this.loading = true;
			},
			enterIconLoading () {
				this.iconLoading = true;
			},
			enterTimeoutLoading() {
				this.timeoutLoading = {
					delay: 3000
				}
			}
		}
	}
</script>