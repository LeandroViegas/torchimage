import React from 'react'
import $ from 'jquery'
import { createBrowserHistory } from "history"
import './index.css'
import Api from '../../services/api'
import Login from './forms/login'
import Register from './forms/register'

interface MyProps {
    search?: () => any
}

interface MyState {
    search?: () => any,
    user: {
        username: string,
        email: string
    }
    forms: {
        showRegister: boolean,
        showLogin: boolean,
    }
}

class Navbar extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        let user
        try {
            if (localStorage.getItem("user")) {
                user = JSON.parse(localStorage.getItem("user") || "") || undefined
            }
        } finally { }
        super(props);
        this.state = {
            search: props.search,
            user: {
                username: user?.username,
                email: user?.email,
            },
            forms: {
                showLogin: false,
                showRegister: false
            }
        };
    }

    componentDidMount() {
        if (localStorage.getItem("user"))
            Api.get("/auth").then((response) => {
                if (response.data?.user) {
                    localStorage.setItem("user", JSON.stringify({ email: response.data?.user.mail, username: response.data?.user.user }))
                    this.setState({
                        user: {
                            username: response.data?.user.user,
                            email: response.data?.user.mail,
                        },
                        forms: {
                            showLogin: this.state.forms?.showLogin,
                            showRegister: this.state.forms?.showRegister
                        }
                    })
                } else {
                    Api.get("/auth/logout")
                    localStorage.removeItem("user")
                    document.location.reload(true)
                }
            })
    }

    render() {
        let history = createBrowserHistory()

        const NavbarSwitch = () => {
            let menuUp = $('.menu-up')
            let menuDown = $(".menu-down")
            if (menuUp.hasClass('border-b-2')) {
                menuUp.removeClass('border-b-2')
                menuUp.removeClass('pb-5')
                menuDown.addClass('hidden')
            } else {
                menuUp.addClass('border-b-2')
                menuUp.addClass('pb-5')
                menuDown.removeClass('hidden')
            }
        }

        const formUpdate = (sl: boolean, sr: boolean) => {
            this.setState({
                user: {
                    username: this.state.user?.username,
                    email: this.state.user?.email,
                },
                forms: {
                    showLogin: sl,
                    showRegister: sr
                }
            })
            $("body").css({ "overflow-y": this.state.forms.showLogin || this.state.forms.showRegister ? "auto" : "hidden" })
        }

        function getParameterByName(name: string, url?: string) {
            if (!url) url = window.location.href;
            name = name.replace(/[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }


        const logout = async () => {
            localStorage.removeItem("user")
            await Api.delete("/auth")
            document.location.reload()
        }

        const search = () => {
            history.push({
                pathname: '/',
                search: `?q=${$("[name=search]").val()}`
            })
            document.location.reload()
        }


        return (
            <>
                {
                    (this.state.forms.showLogin || this.state.forms.showRegister) ?
                        <div className="fixed bg-opacity-50 bg-black w-full h-full z-40 top-0 left-0" onClick={() => formUpdate(false, false)}>

                        </div>
                        : ""
                }
                {(this.state.forms.showLogin) ?
                    <Login close={formUpdate} />
                    : ""
                }
                {(this.state.forms.showRegister) ?
                    <Register close={formUpdate} />
                    : ""
                }

                <nav
                    className="flex items-center justify-between flex-wrap bg-orange-600 py-4 lg:px-12 shadow border-solid border-t-2 border-blue-500">
                    <div className="menu-up flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-gray-300 lg:pb-0">
                        <div className="flex items-center flex-shrink-0 text-white mr-16">
                            <span className="font-bold text-xl tracking-tight"><a href="/">Torch Image</a></span>
                        </div>
                        <div className="block lg:hidden">
                            <button
                                id="nav" onClick={NavbarSwitch}
                                className="flex items-center px-3 py-2 border-2 rounded text-white border-white hover:text-white hover:border-white">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="menu menu-down hidden w-full lg:block md:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
                        <div className="relative mx-auto text-gray-600 lg:block hidden">
                            <form action="/">
                                <input
                                    className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                                    type="search" defaultValue={getParameterByName("q") || ""} name="q" placeholder="Search" />
                                <button type="submit" onClick={() => search()} className="absolute right-0 top-0 mt-3 mr-2">
                                    <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                        version="1.1" id="Capa_1" x="0px" y="0px"
                                        viewBox="0 0 56.966 56.966" width="512px" height="512px">
                                        <path
                                            d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                        <div className="flex">
                            {(this.state.user?.email) ?
                                <>
                                    <a href={'/profile/' + this.state.user?.username} className="block text-md px-4 py-2 rounded text-white ml-2 font-bold hover:text-gray-200 lg:mt-0">{this.state.user?.username}</a>
                                    <button onClick={() => logout()} className="block text-md px-4 ml-2 py-2 rounded text-white hover:text-gray-200 font-bold lg:mt-0">Logout</button>
                                </>
                                :
                                <>
                                    <button onClick={() => formUpdate(false, true)} className="block text-md px-4 py-2 rounded text-white hover:text-gray-200 ml-2 font-bold">Register</button>
                                    <button onClick={() => formUpdate(true, false)} className="block text-md px-4 ml-2 py-2 rounded text-white hover:text-gray-200 font-bold">login</button>
                                </>
                            }
                            {/* <a href="/" className="block text-md px-4 ml-2 py-2 rounded text-white font-bold hover:text-gray-200 lg:mt-0">Explorer</a> */}
                        </div>
                    </div>

                </nav>
            </>
        )
    }
}

export default Navbar