import React, { Component } from 'react'
const usernameKey = 'username'
const passwordKey = 'password'
export default class Login extends Component {
    render() {
        const errorInfoDom = (key) => {
            const { errors } = this.state
            const error = errors[key]

            return (
                <div className="error-container">
                    {(error.showError && error.msg) && <span className="error">{error.msg}</span>}
                </div>
            )
        }
        const generateInputDom = (key, name, type = 'text') => {
            return (
                <section className="form-item">
                    <label htmlFor={key}>{name}:</label>
                    <input type={type}
                        id={key}
                        name={key}
                        placeholder={name}
                        onChange={this.handleInput}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={this.state.model[key]} />
                    {errorInfoDom(key)}
                </section>
            )
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {generateInputDom(usernameKey, '用户名')}
                    {generateInputDom(passwordKey, '密码', 'password')}
                    <section>
                        <input id="submit-btn" type="submit" value="提交" />
                    </section>
                </form>
                <style jsx="true">{`
                            form {
                                margin: 50px auto;
                                text-align: center;
                            }
                            .error-container {
                                height: 10px;
                            }
                            .error {
                                color: red;
                            }
                            .form-item {
                                margin: 20px auto;
                            }
                            .form-item label {
                                display: inline-block;
                                text-align: right;
                                margin-right: 10px;
                                width: 70px;
                                font-size: 20px;
                            }
                            .form-item input {
                                font-size: 20px;
                                width: 240px;
                                border: 1px solid gray;
                                border-radius: 5px;
                            }
                            #submit-btn {
                                font-size: 20px;
                                line-height: 20px;
                                height: 30px;
                                width: 100px;
                                border: 1px solid gray;
                                border-radius: 7px;
                            }
                `}</style>
            </div>
        )
    }

    state = {
        model: {
            [usernameKey]: '',
            [passwordKey]: ''
        },
        errors: {
            [usernameKey]: {
                showError: false,
                msg: '请输入用户名'
            },
            [passwordKey]: {
                showError: false,
                msg: '请输入密码'
            }
        }
    }

    handleBlur = (e) => {
        const { name } = e.target
        const errors = this.state.errors
        errors[name].showError = true
        this.setState({
            errors
        })
    }

    handleFocus = (e) => {
        const { name } = e.target
        const errors = this.state.errors
        errors[name].showError = false
        this.setState({
            errors
        })
    }

    handleInput = (e) => {
        const { name, value } = e.target
        const model = this.state.model
        model[name] = value.trim()
        this.setState({ model })
        this.validateFormFill(name, model[name])
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.validateForm()) {
            window.alert(`
                   ${usernameKey}: ${this.state.model[usernameKey]}
                   ${passwordKey}: ${this.state.model[passwordKey]}`)
        } else {
            let errors = this.state.errors
            Object.keys(errors).forEach(key => {
                errors[key].showError = true
            })
            this.setState({ errors })
        }
    }

    validateFormFill(key, value) {
        const errors = this.state.errors
        switch (key) {
            case usernameKey:
                errors[usernameKey] = validateUsername()
                break
            case passwordKey:
                errors[passwordKey] = validatePassword()
                break
            default:
        }
        this.setState({ errors })
        function validateUsername() {
            let error = null;
            error = validate(() => value.length > 0, "用户名不能为空")
            if (error.msg && error.showError) {
                return error
            }
            error = validate(() => /^[a-zA-Z]\w{2,}@\w{2,8}\.\w{2,8}$/.test(value), "用户名格式不正确")
            return error
        }

        function validatePassword() {
            let error = validate(() => (value.length >= 8), "密码长度至少为8")
            if (error.msg && error.showError) {
                return error
            }
            error = validate(() => /[a-zA-Z]/.test(value), '密码需包含字母')
            if (error.msg && error.showError) {
                return error
            }
            error = validate(() => /\d/.test(value), '密码需包含数字')
            return error
        }
        function validate(fn, msg) {
            const result = {
                showError: false,
                msg: ''
            }
            if (!fn()) {
                result.msg = msg
                result.showError = true
            }
            return result
        }
    }

    validateForm() {
        Object.keys(this.state.model).forEach(key => {
            this.validateFormFill(key, this.state.model[key])
        })

        const errors = this.state.errors
        return Object.keys(errors).every(key => {
            return errors[key].msg.length === 0
        })
    }
}