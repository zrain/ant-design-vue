<style lang="less" scoped>
	// .subnav {
	// 	box-shadow: none;
	// }
	.aside-container {
		padding-bottom: 50px;
		font-family: Lato,Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
	}
	.main-container {
		padding: 0 130px 120px 40px;
	}
</style>
<template>
	<div class="components-wrapper">
		<Row>
			<Col xs="24" sm="24" md="6" lg="4">
				<!-- <Menu mode="inline" class="subnav aside-container">
					<MenuItem>Ant Design of Vue</MenuItem>
					<MenuItem>快速上手</MenuItem>
					<MenuItem>项目实战</MenuItem>
					<MenuItem>定制主题</MenuItem>
					<MenuItem>更新日志</MenuItem>
					<MenuItem>社区精选组件</MenuItem>
					<MenuItem>国际化</MenuItem>
					<SubMenu title="Components">
						<MenuItemGroup title="General">
				            <MenuItem name="/components/button">
								<router-link to="/components/button">Button 按钮</router-link>
				            </MenuItem>
				            <MenuItem name="/components/icon">
								<router-link to="/components/icon">Icon 图标</router-link>
				            </MenuItem>
				        </MenuItemGroup>
						<MenuItemGroup title="Layout">
				            <MenuItem name="/components/grid">
								<router-link to="/components/grid">Grid 栅格</router-link>
				            </MenuItem>
				            <MenuItem name="/components/layout">
								<router-link to="/components/layout">Layout 布局</router-link>
				            </MenuItem>
				        </MenuItemGroup>
						<MenuItemGroup title="Navigation">
				            <MenuItem name="/components/dropdown">
								<router-link to="/components/dropdown">Dropdown 下拉菜单</router-link>
				            </MenuItem>
				            <MenuItem name="/components/menu">
								<router-link to="/components/menu">Menu 导航菜单</router-link>
				            </MenuItem>
				        </MenuItemGroup>
						<MenuItemGroup title="Data Entry">
				            <MenuItem name="/components/input">
								<router-link to="/components/input">Input 输入框</router-link>
				            </MenuItem>
				        </MenuItemGroup>
						<MenuItemGroup title="Widget">
				            <MenuItem name="/components/domalign">
								<router-link to="/components/domalign">DomAlign</router-link>
				            </MenuItem>
				            <MenuItem name="/components/trigger">
								<router-link to="/components/trigger">Trigger</router-link>
				            </MenuItem>
				        </MenuItemGroup>
					</SubMenu>
				</Menu> -->
			</Col>
			<Col class="main-container" xs="24" sm="24" md="18" lg="20" >
				<router-view></router-view>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {

	}
</script>