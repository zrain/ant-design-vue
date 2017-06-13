<template>
	<Menu mode="horizontal" @click="handleClick" :selectedKeys="current">
		<MenuItem name="mail">
			<Icon type="mail" />Navigation One
		</MenuItem>
		<MenuItem disabled>
			<Icon type="appstore" />Navigation Two
		</MenuItem>
		<SubMenu>
			<template slot="title">
				<Icon type="setting"/> Navigation Three - Submenu
			</template>
			<MenuItemGroup title="Item 1">
	            <MenuItem name="1">Option 1</MenuItem>
	            <MenuItem name="2">Option 2</MenuItem>
	        </MenuItemGroup>
	        <MenuItemGroup title="Item 2">
	            <MenuItem name="3">Option 3</MenuItem>
	            <MenuItem name="4">Option 4</MenuItem>
	        </MenuItemGroup>
		</SubMenu>
		<MenuItem key="alipay">
			<a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
		</MenuItem>
	</Menu>
</template>

<script>
	export default {
		data() {
			return {
				current: ['mail']
			}
		},
		methods: {
			handleClick( e ) {
				this.current = [e.name];
			}
		}
	}
</script>