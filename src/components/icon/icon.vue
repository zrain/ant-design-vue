<style lang="less" src="./style/index.less"></style>

<template>
	<i :class="classes"></i>
</template>

<script>
	export default {
		name: 'Icon',
		props: {
			type: String,
			spin: Boolean,
			className: String
		},
		computed: {
			classes () {
				let { spin, type, className } = this;
				return [
                    `anticon`,
                    {
                        ['anticon-spin']: !!spin || type === 'loading',
                        ['${className}']: !!className
                    },
                    `anticon-${type}`
                ]
			}
		}
	}
</script>

