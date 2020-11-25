import React from 'react'
import { GrClose } from 'react-icons/gr'
import './index.css'
import Api from '../../../../services/api'

interface MyProps {
    close: (sl: boolean, sr: boolean) => any,
}

interface MyState {
    close: (sl: boolean, sr: boolean) => any
    input: { email: string, password: string }
}

class Login extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            input: { email: "", password: "" },
            close: props.close
        }
    }

    render() {


        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            Api.post("/auth", { mail: this.state.input.email, password: this.state.input.password }).then(response => {
                if (response.data?.user) {
                    localStorage.setItem("user", JSON.stringify({ email: response.data?.user.mail, username: response.data?.user.user }))
                    document.location.reload(true)
                }
            })
            console.log("asdsa")
        }

        return (
            <div style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} className="fixed container z-50">
                <div className="bg-white z-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div>
                        <button className="float-right" onClick={() => this.state.close(false, false)}>
                            <GrClose />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input onChange={e => this.setState({...this.state, input: {...this.state.input, email: e.target.value}})} className="shadow border rounded w-full py-2 px-3 text-gray-800" id="email" type="email" placeholder="email" />
                            {/* <p className="text-red-400 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="mb-6">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input onChange={e => this.setState({...this.state, input: {...this.state.input, password: e.target.value}})} className="shadow border rounded w-full py-2 px-3 text-gray-800 mb-3" id="password" type="password" placeholder="******************" />
                            {/* <p className="text-red-400 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login