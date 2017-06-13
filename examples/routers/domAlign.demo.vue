<style lang="less" scoped>
	.source {
		background: red;
		width: 50px;
		height: 50px;
		left: 0;
		top: 0;
		// position: absolute;
		transition: all 0.5s;
	}
	.target {
		width: 400px;
		height: 400px;
		overflow: auto;
		border: 1px solid green;
		position: relative;
		margin: 50px 50px 50px 430px;
	}
	section {
		margin: 32px 0;
	}
	p {
		margin: 8px 32px;
	}
	p.tips {
		color: #888888;
		font-size: 12px;
	}
	.scrollWrapper {
		height: 400px;
		overflow: auto;
	}
</style>

<template>
	<div>
		<section style="padding-left: 400px;">
			<p>
				<span style="display:inline-block;width:80px;">source: </span>
				<select v-model="sourcePointX" @change="handlePoint">
					<option value="t">t</option>
					<option value="c">c</option>
					<option value="b">b</option>
				</select>
				<select v-model="sourcePointY" @change="handlePoint">
					<option value="l">l</option>
					<option value="c">c</option>
					<option value="r">r</option>
				</select>
			</p>
			<p class="tips">
				<span>t: top</span>
				<span>c: center</span>
				<span>b: bottom</span>
				<span>l: left</span>
				<span>c: center</span>
				<span>r: right</span>
			</p>
			<p>
				<span style="display:inline-block;width:80px;">target: </span>
				<select v-model="targetPointX" @change="handlePoint">
					<option value="t">t</option>
					<option value="c">c</option>
					<option value="b">b</option>
				</select>
				<select v-model="targetPointY" @change="handlePoint">
					<option value="l">l</option>
					<option value="c">c</option>
					<option value="r">r</option>
				</select>
			</p>
			<p class="tips">
				<span>t: top</span>
				<span>c: center</span>
				<span>b: bottom</span>
				<span>l: left</span>
				<span>c: center</span>
				<span>r: right</span>
			</p>
			<p>
				points: {{points}}
			</p>
			<p>
				<span style="display:inline-block;width:110px;">sourceOffset: </span>
				X:&nbsp;&nbsp;<input type="text" v-model="sourceOffset[0]">
				&nbsp;&nbsp;Y:&nbsp;&nbsp;<input type="text" v-model="sourceOffset[1]">
				{{sourceOffset}}
			</p>
			<p>
				<span style="display:inline-block;width:110px;">targetOffset: </span>
				X:&nbsp;&nbsp;<input type="text" v-model="targetOffset[0]">
				&nbsp;&nbsp;Y:&nbsp;&nbsp;<input type="text" v-model="targetOffset[1]">
				{{targetOffset}}
			</p>
			<!-- <p>
				<span style="display:inline-block;width:110px;">useCssBottom: </span>
				<input v-model="useCssBottom" type="checkbox">
				{{useCssBottom}}
			</p>
			<p>
				<span style="display:inline-block;width:110px;">useCssRight: </span>
				<input v-model="useCssRight" type="checkbox">
				{{useCssRight}}
			</p> -->
			<p>
				<span style="display:inline-block;width:110px;">useCssTransform: </span>
				<input v-model="useCssTransform" type="checkbox">
				{{useCssTransform}}
			</p>
			<p>
				<span style="display:inline-block;width:110px;">adjustX: </span>
				<input v-model="adjustX" type="checkbox">
				{{adjustX}}
			</p>
			<p>
				<span style="display:inline-block;width:110px;">adjustY: </span>
				<input v-model="adjustY" type="checkbox">
				{{adjustY}}
			</p>
			<p>
				<Button @click="count++">Align</Button>{{count}}
			</p>
		</section>
		
		<!-- source/target -->
		<!-- <div class="source" ref="source">source</div>
		<section 
			class="scrollWrapper" 
			style="position: relative;margin: 32px 100px;border: 1px solid blue;">
			<DomAlign 
				source="source" 
				target="target" 
				:points="points"
				:sourceOffset="sourceOffset"
				:targetOffset="targetOffset"
				:adjustX="adjustX"
				:adjustY="adjustY">
				<div class="target" ref="target" style="margin-left:330px;width: 600px;height:600px;">target</div>
			</DomAlign>
		</section> -->
		
		<!-- source1/target1 -->
		<!-- <div class="source-wrapper" style="width:300px;height:300px;border:1px solid red;overflow:hidden;top:300px;left:0;">
			<div class="source" ref="source1">source1</div>
		</div>
		<section 
			class="scrollWrapper" 
			style="position: relative;margin: 32px 100px;border: 1px solid blue;">
			<DomAlign 
				source="source1" 
				target="target1" 
				:points="points"
				:sourceOffset="sourceOffset"
				:targetOffset="targetOffset"
				:adjustX="adjustX"
				:adjustY="adjustY">
				<div class="target" ref="target1" style="margin-left:330px;width: 600px;height:600px;">target1</div>
			</DomAlign>
		</section> -->
		
		<!-- source2/target2 -->
		<!-- <section 
			style="position: relative;margin: 32px 100px;border: 1px solid blue;">
			<DomAlign source="source2" target="target2" :points="points">
				<div class="source" ref="source2">source1</div>
				<div class="target" ref="target2">target2</div>
			</DomAlign>
		</section> -->
		
		<!-- source3/target3 -->
		<!-- <section style="position: relative;margin: 32px 100px;border: 1px solid blue;">
			<div class="source" ref="source3" style="margin: 40px;">source3</div>
			<DomAlign source="source3" target="target3" :points="points">
				<div class="target" ref="target3">target3</div>
			</DomAlign>
		</section> -->
		
		<!-- source4/target4 -->
		<!-- <section 
			class="scrollWrapper" 
			style="position: relative;margin: 32px 100px;border: 1px solid blue;">
			<div class="source" ref="source4">source4</div>
			<DomAlign source="source4" target="target4" :points="points">
				<div 
					class="target" 
					ref="target4" 
					style="margin-left:330px;width: 600px;height:600px;">target4</div>
			</DomAlign>
		</section> -->

		<!-- source5/target5 -->
		<div class="source" ref="source5">source</div>
		<section 
			class="scrollWrapper" 
			style="width: 400px;position: relative;margin: 32px 100px;border: 1px solid blue;">
			<DomAlign 
				source="source5" 
				target="target5" 
				:points="points"
				:sourceOffset="sourceOffset"
				:targetOffset="targetOffset"
				:adjustX="adjustX"
				:adjustY="adjustY">
				<div class="target" ref="target5" style="margin-left:330px;width: 600px;height:600px;">target</div>
			</DomAlign>
		</section>
	</div>
</template>

<script>
	import DomAlign from '../../src/components/domAlign/domAlign.vue';

	export default {
		components: {
			DomAlign
		},
		data() {
			return {
				sourceOffset: [0,0],
				targetOffset: [0,0],
				sourcePointX: 'b',
				sourcePointY: 'l',
				targetPointX: 't',
				targetPointY: 'l',
				points: ['bl','tl'],
				useCssBottom: false,
				useCssRight: false,
				useCssTransform: false,
				adjustX: true,
				adjustY: true,
				count: 0
			}
		},
		methods: {
			handlePoint() {
				let { sourcePointX, sourcePointY, targetPointX, targetPointY } = this;
				this.points.splice(0,1, sourcePointX+sourcePointY);
				this.points.splice(1,1, targetPointX+targetPointY);
			}
		}
	}
</script>