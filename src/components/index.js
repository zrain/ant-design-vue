import { Button, ButtonGroup } from './button';
import Icon from './icon';
import { Row, Col } from './grid';
import { Input, InputGroup } from './input';
import { Layout, Header, Footer, Content, Sider } from './layout';

const Antd = {
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
	Sider
}

const install = ( vue ) => {
	Object.keys(Antd).forEach((key) => {
	    vue.component(key, Antd[key]);
	});
}


if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(Antd, {install}); 