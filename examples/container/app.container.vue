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
	.lang {
		float: right;
		margin-top: 29px;
		margin-left: 10px;
	}
	.nav {
		border: 0;
		float: right;
		font-size: 14px;
		font-family: Lato,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
		li {
			height: 80px;
		    line-height: 80px;
		    min-width: 72px;
		    text-align: center;
		    border-bottom-width: 3px;
		}
	}
</style>

<template>
	<Layout class="layout">
		<Header class="header clearfix">
			<Row>
				<Col :xs="24" :sm="24" :md="5" :lg="4"></Col>
				<Col :xs="0" :sm="0" :md="19" :lg="20">
					<Button class="lang" size="small">EN</Button>
					<Menu 
						class="nav"
						mode="horizontal"
					>
						<MenuItem name="home">首页</MenuItem>
						<MenuItem name="guidelines">指引</MenuItem>
						<MenuItem name="components">
							<router-link to="/components">组件</router-link>
						</MenuItem>
						<MenuItem name="patterns">模式</MenuItem>
						<MenuItem name="resources">资源</MenuItem>
					</Menu>
				</Col>
			</Row>
		</Header>
		<Content class="content">
			<router-view></router-view>
		</Content>
		<Footer></Footer>
	</Layout>
</template>

<script>
	export default {}
</script>