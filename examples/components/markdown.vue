<template>
	<div class="markdown-wrapper-parse">	
		<div v-html="compiledMarkdown"></div>
		<div class="slot-wrapper" ref="original">
			<slot></slot>
		</div>
	</div>
</template>

<script>	
	import marked from 'marked';

	export default {
		name: 'Markdown',
		data() {
			return {
				originalHtml: ''
			}
		},
		computed: {
		    compiledMarkdown: function () {
		      	return marked('' +this.originalHtml, { sanitize: true })
		    }
		},
		beforeMount() {
			
		},
		mounted() {
			this.originalHtml = this.$refs.original.innerHTML;
		}
	}
</script>