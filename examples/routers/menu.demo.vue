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
			<!-- <MenuItemGroup title="Item 1"> -->
	            <MenuItem>Option 1</MenuItem>
	            <MenuItem>Option 2</MenuItem>
	        <!-- </MenuItemGroup> -->
	        <!-- <MenuItemGroup title="Item 2"> -->
	            <MenuItem>Option 3</MenuItem>
	            <MenuItem>Option 4</MenuItem>
	        <!-- </MenuItemGroup> -->
		</SubMenu>
		<!-- <MenuItem name="test" value="test">测试</MenuItem> -->
		<!-- <MenuItem v-for="i in 3" :key="i">测试</MenuItem> -->
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