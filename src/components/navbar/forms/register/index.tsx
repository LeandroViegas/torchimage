import React from 'react'
import { GrClose } from 'react-icons/gr'
import $ from 'jquery'
import './index.css'
import Api from '../../../../services/api'

interface MyProps {
    close: (sl :boolean, sr: boolean) => any
}

interface MyState {
    close: (sl :boolean, sr: boolean) => any
}

class Register extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            close: props.close
        }
    }

    render() {

        const login = () => {
            Api.post("/auth", {mail: $('#email').val(),password: $('#password').val()}).then((response) => {
                console.log(response)
                if(response.data?.user[0]){
                    localStorage.setItem("user", JSON.stringify({email: response.data?.user[0].mail, username: response.data?.user[0].user}))
                    console.log(localStorage.getItem("user"))
                    // document.location.reload(true)
                }
            })
        }
        

        return (
            <div className="fixed bg-opacity-50 flex items-center bg-black w-full h-full z-10 top-0 left-0">
                <div className="container mx-auto">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div>
                            <button className="float-right" onClick={() => this.state.close(false, false)}>
                                <GrClose />
                            </button>
                        </div>
                        <div className="mb-4">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                        </label>
                            <input className="shadow border rounded w-full py-2 px-3 text-gray-800" id="email" type="email" placeholder="email" />
                            {/* <p className="text-red-400 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="mb-6">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                        </label>
                            <input className="shadow border rounded w-full py-2 px-3 text-gray-800 mb-3" id="password" type="password" placeholder="******************" />
                            {/* <p className="text-red-400 text-xs italic">Please choose a password.</p> */}
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={() => login()} className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded" type="button">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register