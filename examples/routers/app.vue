<style lang="less" scoped>
	.layout {
		min-height: 100vh;
	}
	.header {
		background-color: #fff;
		transition: opacity .5s;
	    height: 80px;
	    margin-bottom: 24px;
	    padding: 0 48px;
	}
	.content {
		margin: 0 48px;
	    border-radius: 4px;
	    padding: 24px 0 0;
	    margin-bottom: 24px;
	    background: #fff;
	    position: relative;
	}
</style>

<template>
	<Layout class="layout">
		<Header class="header">
			
		</Header>
		<Content class="content">
			<nav>
				<ul>
					<li>
						<router-link to="/button">Button</router-link>
					</li>
					<li>
						<router-link to="/grid">Grid</router-link>
					</li>
					<li>
						<router-link to="/input">Input</router-link>
					</li>
					<li>
						<router-link to="/layout">Layout</router-link>
					</li>
					<li>
						<router-link to="/menu">Menu</router-link>
					</li>
				</ul>
			</nav>
			<router-view></router-view>
			
		</Content>
		<Footer></Footer>
	</Layout>
</template>

<script>
	export default {}
</script>