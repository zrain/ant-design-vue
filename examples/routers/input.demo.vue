<style lang="less" scoped>
	.demo-container {
		padding-bottom: 80px;
		p,
		.demo-row {
			margin: 10px 0;
			padding: 0 20px;
		}
		h1,h2,h3,h4 {
			margin: 10px 0;
		}
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
		<h1>Input输入框</h1>
		<p>通过鼠标或键盘输入内容，是最基础的表单域的包装。</p>
		<h2>何时使用</h2>
		<p>
			需要用户输入表单域内容时。
			提供组合型输入框，带搜索的输入框，还可以进行大小选择。
		</p>
		<h2>代码演示</h2>
		<section>
			<h4>基本使用</h4>
			<p>基本使用。</p>
			<p>
				<Input placeholder="Basic usage" />
			</p>
			<p>
				<Input placeholder="Basic usage" type="textarea" />
			</p>
		</section>
		<section>
			<h4>三种大小</h4>
			<p>
				我们为 &lt;Input /&gt; 输入框定义了三种尺寸（大、默认、小），高度分别为 32px、28px 和 22px。
				注意： 在表单里面，我们只使用大尺寸的输入框。
			</p>
			<p>
				<Input size="large" placeholder="large size" />
			</p>
			<p>
				<Input placeholder="default size" />
			</p>
			<p>
				<Input size="small" placeholder="small size" />
			</p>
		</section>
		<section>
			<h4>前置/后置标签</h4>
			<p>
				用于配置一些固定组合。
			</p>
			<p>
				<Input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
			</p>
			<p>
				<!-- <Input addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" /> -->
			</p>
			<p>
				<!-- <Input addonAfter={<Icon type="setting" />} defaultValue="mysite" /> -->
			</p>
		</section>
		<section>
			<h4>文本域</h4>
			<p>用于多行输入，指定 type 为一个特殊的 textarea。</p>
			<p>
				<Input type="textarea" rows="4" />
			</p>
		</section>
		<section>
			<h4>适应文本高度的文本域</h4>
			<p>
				autosize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autosize 可以设定为一个对象，指定最小行数和最大行数。
			</p>
			<p>
				<Input type="textarea" placeholder="Autosize height based on content lines" autosize />
			</p>
			<p>
				<Input 
					type="textarea" 
					placeholder="Autosize height with minimum and maximum number of lines" 
					:autosize="{ minRows: 2, maxRows: 6 }"/>
			</p>
			<p>
				<Button @click="disabled=!disabled">Toggle Disabled</Button>
			</p>
			<p>
				<Input type="textarea" placeholder="Autosize height based on content lines" autosize :disabled="disabled" />
			</p>
		</section>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				disabled: false,
			}
		}
	}
</script>