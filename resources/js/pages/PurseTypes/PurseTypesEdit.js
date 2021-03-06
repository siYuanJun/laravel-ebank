import React from "react";
import {useParams, useHistory} from 'react-router-dom'
import {Button, ButtonToolbar, Form} from "react-bootstrap";
import {axios} from "../../helpers/axios";
import {tips} from "../../helpers/functions";

export default (props) => {
    const history = useHistory();
    const params = useParams();
    const [form, setForm] = React.useState({});
    const focus = React.useRef(null);

    React.useEffect(()=> {
        init();
    }, []);

    async function init(){
        let res = await axios.get('/purse_types/'+params.id);
        focus.current.focus();
        setForm(res);
    }

    async function submit(){
        await axios.post('/purse_types', form);
        tips('提交完成', 'success');
        history.goBack();
    }

    return (
        <div>
            <Form onSubmit={e => {e.preventDefault();submit()}}>
                <Form.Group>
                    <Form.Label>钱包名称</Form.Label>
                    <Form.Control ref={focus} value={form.name} onChange={e => setForm(Object.assign({}, form, {name: e.target.value}))} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>英文别名</Form.Label>
                    <Form.Control value={form.alias} onChange={e => setForm(Object.assign({}, form, {alias: e.target.value}))} />
                    <Form.Text><Form.Text>* 必填，尽量只使用一个单词</Form.Text></Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>状态</Form.Label>
                    <Form.Group>
                    <Form.Check inline type={'radio'} label={'禁用'} name={'status'} value={0} checked={form.status === 0} id={'status0'} onChange={e=> setForm(Object.assign({}, form, {status: Number(e.target.value)}))} />
                    <Form.Check inline type={'radio'} label={'启用'} name={'status'} value={1} checked={form.status === 1} id={'status1'} onChange={e=> setForm(Object.assign({}, form, {status: Number(e.target.value)}))} />
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Button type={"submit"}>提交</Button>
                    <Button className={'ml-3'} variant={"secondary"} onClick={() => history.goBack()}>返回</Button>
                </Form.Group>
            </Form>
        </div>
    );
}
