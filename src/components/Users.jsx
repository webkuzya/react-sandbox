import React, {useEffect, useReducer, useState} from 'react';
import cn from './Users.module.css'
import Input from "./BS/Input";
import Button from "./BS/Button";

export default function Users() {
    const initUser = {
        firstName: '',
        lastName: '',
        userName: '',
    }

    const [users, setUsers] = useState([])
    //const [user, setUser] = useState(initUser)
    const [user, dispatch] = useReducer(userReducer, initUser)
    const [isEdit, setIsEdit] = useState(false)

    const changeHandler = (key, val) => {
        //setUser({...user, [key]: val})
        dispatch({type: 'edit', payload: {key, val,}})
    }

    function userReducer(state, action) {
        switch (action.type) {
            case 'edit':
                return {...state, [action.payload.key]: action.payload.val}
            case 'set':
                return action.payload
            default:
                break
        }
    }

    const fetchUsers = async () => {
        let response = await fetch('http://localhost:8080/users')
        let result = await response.json()
        if (response.ok) {
            setUsers(result.data)
        } else {
            console.log(response.status + ' - ' + result.data.error.description)
        }
    }

    const saveHandler = () => {
        const link = 'http://localhost:8080/users' + (user.id !== undefined ? '/' + user.id : '')
        const method = user.id !== undefined ? 'put' : 'post'

        fetch(link, {
            method,
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            res.json()
            fetchUsers()
            //setUser(initUser)
            dispatch({type: 'set', payload: initUser})
        })
    }

    const deleteUser = id => {
        const link = 'http://localhost:8080/users/' + id

        fetch(link, {
            method: 'delete',
        }).then(res => {
            res.json()
            fetchUsers()
            //setUser(initUser)
            dispatch({type: 'set', payload: initUser})
        })
    }

    const editUser = id => {
        setIsEdit(true)
        //setUser(users.find(x => x.id === id))
        dispatch({type: 'set', payload: users.find(x => x.id === id)})
    }

    const resetUser = () => {
        setIsEdit(false)
        //setUser(initUser)
        dispatch({type: 'set', payload: initUser})
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <div>{users.map(u =>
                <div key={u.id} className={cn.row}>
                    <span>{u.firstName}</span>
                    <span>{u.lastName}</span>
                    <b className="text-center">^{u.userName}^</b>
                    <Button variant="success" onClick={() => editUser(u.id)}>Редактировать</Button>
                    <Button variant="danger" onClick={() => deleteUser(u.id)}>Удалить</Button>
                    <div/>
                </div>)}
            </div>
            <div className={cn.row}>
                <Input type="text" placeholder="Имя" value={user.firstName} onChange={e => changeHandler('firstName', e.target.value)}/>
                <Input type="text" placeholder="Фамилия" value={user.lastName} onChange={e => changeHandler('lastName', e.target.value)}/>
                <Input type="text" placeholder="Ник" value={user.userName} onChange={e => changeHandler('userName', e.target.value)}/>
                <Button variant="primary" onClick={saveHandler}>{isEdit ? 'Сохранить' : 'Добавить'}</Button>
                <Button variant="warning" onClick={()=>{resetUser()}}>{isEdit ? 'Отмена' : 'Сбросить'}</Button>
            </div>
        </div>
    );
};