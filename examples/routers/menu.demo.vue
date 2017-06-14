<style lang="less" scoped>
	h1 {
		margin-bottom: 24px;
	}
	h2 {
		margin-bottom: 16px;
	}
	section {
		margin-bottom: 24px;
	}
	.code-box {
	    border: 1px solid #e9e9e9;
	    border-radius: 4px;
	    display: inline-block;
	    width: 100%;
	    position: relative;
	    margin: 0 0 16px;
	    -webkit-transition: all .2s;
	    transition: all .2s;
	}
	.code-box-demo {
	    border-bottom: 1px solid #e9e9e9;
	    padding: 42px 20px 50px;
	}
	.markdown {
	    color: rgba(0,0,0,.65);
	    font-size: 14px;
	    line-height: 1.8;
	}
	.code-box-meta.markdown {
	    position: relative;
	    padding: 17px 16px 15px 20px;
	    border-radius: 0 0 4px 4px;
	    -webkit-transition: background-color .4s;
	    transition: background-color .4s;
	    width: 100%;
	    font-size: 12px;
	}
	.code-box-title {
	    position: absolute;
	    top: -14px;
	    padding: 1px 8px;
	    margin-left: -8px;
	    color: #777;
	    border-radius: 4px 4px 0 0;
	    background: #fff;
	    -webkit-transition: background-color .4s;
	    transition: background-color .4s;
	}
	.code-box-title a, .code-box-title a:hover {
	    color: rgba(0,0,0,.65);
	    font-size: 14px;
	    font-weight: 500;
	}
	.code-box-meta h4, section.code-box-meta p {
	    margin: 4px 0;
	    width: 98%;
	}
	p {
		margin-bottom: 16px;
	}
</style>
<template>
	<div class="demo-container">
		<section>
			<h1>Menu导航菜单</h1>
			<p>为页面和功能提供导航的菜单列表。</p>
		</section>

		<section>
			<h2>何时使用</h2>
			<p>
				导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。
			</p>
		</section>

		<section>
			<h2>代码演示</h2>
			<section class="code-box">
				<section class="code-box-demo">
					<Menu mode="horizontal" :selectedKeys="['mail']">
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
				</section>
				<section class="code-box-meta markdown">
					<div class="code-box-title">
						<a href="#">顶部导航</a>
					</div>
					<div>
						<p>水平的顶部导航菜单。</p>
					</div>
				</section>
			</section>

			<section class="code-box">
				<section class="code-box-demo">
					<Menu style="width:240px;"
					        :defaultSelectedKeys="['1']"
					        :defaultOpenKeys="['sub1']"
					        mode="inline"
					      >
				        <SubMenu value="sub1">
				        	<template slot="title">
				        		<Icon type="mail" />
				        		<span>Navigation One</span>
				        	</template>
				          	<MenuItemGroup value="g1" title="Item 1">
					            <MenuItem value="1">Option 1</MenuItem>
					            <MenuItem value="2">Option 2</MenuItem>
				          	</MenuItemGroup>
				          	<MenuItemGroup value="g2" title="Item 2">
					            <MenuItem value="3">Option 3</MenuItem>
					            <MenuItem value="4">Option 4</MenuItem>
				          	</MenuItemGroup>
				        </SubMenu>
				        <SubMenu value="sub2">
				        	<template slot="title">
				        		<Icon type="appstore" />
				        		<span>Navigation Two</span>
				        	</template>
					        <MenuItem value="5">Option 5</MenuItem>
					        <MenuItem value="6">Option 6</MenuItem>
					        <SubMenu value="sub3" title="Submenu">
						        <MenuItem value="7">Option 7</MenuItem>
						        <MenuItem value="8">Option 8</MenuItem>
					        </SubMenu>
				        </SubMenu>
				        <SubMenu value="sub4">
				        	<template slot="title">
				        		<Icon type="setting" />
				        		<span>Navigation Three</span>
				        	</template>
					        <MenuItem value="9">Option 9</MenuItem>
					        <MenuItem value="10">Option 10</MenuItem>
					        <MenuItem value="11">Option 11</MenuItem>
					        <MenuItem value="12">Option 12</MenuItem>
				        </SubMenu>
					</Menu>
				</section>
				<section class="code-box-meta markdown">
					<div class="code-box-title">
						<a href="#">内嵌菜单</a>
					</div>
					<div>
						<p>垂直菜单，子菜单内嵌在菜单区域。</p>
					</div>
				</section>
			</section>

			<section class="code-box">
				<section class="code-box-demo">
					<Menu style="width:240px;"
					        :defaultSelectedKeys="['1']"
					        :defaultOpenKeys="['sub1']"
					        mode="vertical"
					      >
				        <SubMenu value="sub1">
				        	<template slot="title">
				        		<Icon type="mail" />
				        		<span>Navigation One</span>
				        	</template>
				          	<MenuItemGroup value="g1" title="Item 1">
					            <MenuItem value="1">Option 1</MenuItem>
					            <MenuItem value="2">Option 2</MenuItem>
				          	</MenuItemGroup>
				          	<MenuItemGroup value="g2" title="Item 2">
					            <MenuItem value="3">Option 3</MenuItem>
					            <MenuItem value="4">Option 4</MenuItem>
				          	</MenuItemGroup>
				        </SubMenu>
				        <SubMenu value="sub2">
				        	<template slot="title">
				        		<Icon type="appstore" />
				        		<span>Navigation Two</span>
				        	</template>
					        <MenuItem value="5">Option 5</MenuItem>
					        <MenuItem value="6">Option 6</MenuItem>
					        <SubMenu value="sub3" title="Submenu">
						        <MenuItem value="7">Option 7</MenuItem>
						        <MenuItem value="8">Option 8</MenuItem>
					        </SubMenu>
				        </SubMenu>
				        <SubMenu value="sub4">
				        	<template slot="title">
				        		<Icon type="setting" />
				        		<span>Navigation Three</span>
				        	</template>
					        <MenuItem value="9">Option 9</MenuItem>
					        <MenuItem value="10">Option 10</MenuItem>
					        <MenuItem value="11">Option 11</MenuItem>
					        <MenuItem value="12">Option 12</MenuItem>
				        </SubMenu>
					</Menu>
				</section>
				<section class="code-box-meta markdown">
					<div class="code-box-title">
						<a href="#">内嵌菜单</a>
					</div>
					<div>
						<p>垂直菜单，子菜单内嵌在菜单区域。</p>
					</div>
				</section>
			</section>

			<section class="code-box">
				<section class="code-box-demo">
					<Menu style="width:240px;"
					        :defaultSelectedKeys="['1']"
					        :defaultOpenKeys="['sub1']"
					        mode="inline"
					        accordion
					      >
				        <SubMenu value="sub1">
				        	<template slot="title">
				        		<Icon type="mail" />
				        		<span>Navigation One</span>
				        	</template>
				          	<MenuItemGroup value="g1" title="Item 1">
					            <MenuItem value="1">Option 1</MenuItem>
					            <MenuItem value="2">Option 2</MenuItem>
				          	</MenuItemGroup>
				          	<MenuItemGroup value="g2" title="Item 2">
					            <MenuItem value="3">Option 3</MenuItem>
					            <MenuItem value="4">Option 4</MenuItem>
				          	</MenuItemGroup>
				        </SubMenu>
				        <SubMenu value="sub2">
				        	<template slot="title">
				        		<Icon type="appstore" />
				        		<span>Navigation Two</span>
				        	</template>
					        <MenuItem value="5">Option 5</MenuItem>
					        <MenuItem value="6">Option 6</MenuItem>
				        </SubMenu>
				        <SubMenu value="sub4">
				        	<template slot="title">
				        		<Icon type="setting" />
				        		<span>Navigation Three</span>
				        	</template>
					        <MenuItem value="9">Option 9</MenuItem>
					        <MenuItem value="10">Option 10</MenuItem>
					        <MenuItem value="11">Option 11</MenuItem>
					        <MenuItem value="12">Option 12</MenuItem>
				        </SubMenu>
					</Menu>
				</section>
				<section class="code-box-meta markdown">
					<div class="code-box-title">
						<a href="#">只展开当前父级菜单</a>
					</div>
					<div>
						<p>点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。</p>
					</div>
				</section>
			</section>
		</section>

		<section class="code-box">
			<section class="code-box-demo">
				<Menu style="width:240px;"
				        :defaultSelectedKeys="['1']"
				        :defaultOpenKeys="['sub1']"
				        mode="inline"
				        theme="dark"
				      >
			        <SubMenu value="sub1">
			        	<template slot="title">
			        		<Icon type="mail" />
			        		<span>Navigation One</span>
			        	</template>
			          	<MenuItemGroup value="g1" title="Item 1">
				            <MenuItem value="1">Option 1</MenuItem>
				            <MenuItem value="2">Option 2</MenuItem>
			          	</MenuItemGroup>
			          	<MenuItemGroup value="g2" title="Item 2">
				            <MenuItem value="3">Option 3</MenuItem>
				            <MenuItem value="4">Option 4</MenuItem>
			          	</MenuItemGroup>
			        </SubMenu>
			        <SubMenu value="sub2">
			        	<template slot="title">
			        		<Icon type="appstore" />
			        		<span>Navigation Two</span>
			        	</template>
				        <MenuItem value="5">Option 5</MenuItem>
				        <MenuItem value="6">Option 6</MenuItem>
				        <SubMenu value="sub3" title="Submenu">
					        <MenuItem value="7">Option 7</MenuItem>
					        <MenuItem value="8">Option 8</MenuItem>
				        </SubMenu>
			        </SubMenu>
			        <SubMenu value="sub4">
			        	<template slot="title">
			        		<Icon type="setting" />
			        		<span>Navigation Three</span>
			        	</template>
				        <MenuItem value="9">Option 9</MenuItem>
				        <MenuItem value="10">Option 10</MenuItem>
				        <MenuItem value="11">Option 11</MenuItem>
				        <MenuItem value="12">Option 12</MenuItem>
			        </SubMenu>
				</Menu>
			</section>
			<section class="code-box-meta markdown">
				<div class="code-box-title">
					<a href="#">主题</a>
				</div>
				<div>
					<p>内建了两套主题 light|dark，默认 light。</p>
				</div>
			</section>
		</section>
	</div>
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