<style lang="less" src="./style/index.less"></style>

<template>
	<i :class="classes"></i>
</template>

<script>
	export default {
		name: 'Icon',
		props: {
			type: String,
			spin: Boolean
		},
		computed: {
			classes () {
				let { spin, type } = this;
				return [
                    `anticon`,
                    {
                        ['anticon-spin']: !!spin || type === 'loading',
                    },
                    `anticon-${type}`
                ]
			}
		}
	}
</script>

