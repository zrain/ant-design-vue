import { Button, ButtonGroup } from './button';
import { Icon } from './icon';
import { Row, Col } from './grid';
import { Input, InputGroup } from './input';
import { Layout, Header, Footer, Content, Sider } from './layout';
import { Menu, MenuItem, SubMenu, MenuItemGroup } from './menu';
import { Dropdown } from './dropdown';
import { Trigger } from './trigger';
import { DomAlign } from './domAlign';

const ANT_DESIGN_VUE = {
	Button,
	ButtonGroup,
	Icon,
	Row,
	Col,
	Input,
	InputGroup,
	Layout,
	Header,
	Footer,
	Content,
	Sider,
	Menu,
	MenuItem,
	SubMenu,
	MenuItemGroup,
	Trigger,
	Dropdown,
	DomAlign
}

const install = ( vue ) => {
	Object.keys(ANT_DESIGN_VUE).forEach((key) => {
	    vue.component(key, ANT_DESIGN_VUE[key]);
	});
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(ANT_DESIGN_VUE, {install}); 