<style lang="less">
	.container {
		width: 800px;
		margin: 60px auto 0;
	}
	.router-view-container {
		padding: 20px 0;
	}
	html {
    	-webkit-font-smoothing: antialiased;
    	-moz-osx-font-smoothing: grayscale;
    }
</style>

<template>
	<div class="container">
		<nav>
			<ul>
				<li>
					<router-link to="/button">Button</router-link>
				</li>
				<li>
					<router-link to="/grid">Grid</router-link>
				</li>
			</ul>
		</nav>
		<div class="router-view-container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {}
</script>