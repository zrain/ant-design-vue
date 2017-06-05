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

	#components-layout-demo-basic {
	    text-align: center;
	}

	#components-layout-demo-basic > .ant-layout {
	    margin-bottom: 48px;
	}
	#components-layout-demo-basic .ant-layout-header, 
	#components-layout-demo-basic .ant-layout-footer {
	    background: #7dbcea;
	    color: #fff;
	}
	#components-layout-demo-basic .ant-layout-content {
	    background: rgba(16, 142, 233, 1);
	    color: #fff;
	    min-height: 120px;
	    line-height: 120px;
	}
	#components-layout-demo-basic .ant-layout-sider {
	    background: #3ba0e9;
	    color: #fff;
	    line-height: 120px;
	}

	.logo {
		width: 120px;
		height: 31px;
		background: #333;
		border-radius: 6px;
		margin: 16px 24px 16px 0;
		float: left;
	}
	.logo-2 {
		height: 32px;
	    background: #333;
	    border-radius: 6px;
	    margin: 16px;
	}
	.breadcrumb {
		height: 18px;
		margin: 12px 0;
	}
</style>

<template>
	<div class="demo-container">
		<h1>Layout</h1>
		<section id="components-layout-demo-basic">
			<Layout>
				<Header>Header</Header>
				<Content>Content</Content>
				<Footer>Footer</Footer>
			</Layout>

			<Layout>
				<Header>Header</Header>
				<Layout>
					<Sider>Sider</Sider>
					<Content>Content</Content>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>

			<Layout>
				<Header>Header</Header>
				<Layout>
					<Content>Content</Content>
					<Sider>Sider</Sider>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>

			<Layout>
				<Sider>Sider</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>Content</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		</section>

		<section style="margin-bottom:48px;">
			<Layout>
				<Header>
					<div class="logo"></div>
				</Header>
				<Content :style="{ padding: '0 50px' }">
					<div class="breadcrumb"></div>
					<div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>
				</Content>
				<Footer :style="{ textAlign: 'center' }">
				    Ant Design ©2016 Created by Ant UED
				</Footer>
			</Layout>
		</section>

		<section>
			<Layout>
				<Sider collapsible :collapsed="collapsed" :onCollapse="onCollapse">
					<div class="logo-2"></div>
				</Sider>
				<Layout>
					<Header :style="{ background: '#fff', padding: 0 }" />
						
					</Header>
					<Content :style="{ margin: '0 16px' }">
						<div class="breadcrumb"></div>
						<div style="min-height:360px;background-color:#fff;padding: 24px;"></div>
					</Content>
					<Footer :style="{ textAlign: 'center' }">
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				collapsed: false,
			}
		},
		methods: {
			onCollapse() {
				// this.collapsed = !this.collapsed;
			}
		}
	}
</script>