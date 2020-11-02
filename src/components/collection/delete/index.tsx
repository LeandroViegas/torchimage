import React from 'react'
import { GrClose } from 'react-icons/gr'
import $ from 'jquery'
import './index.css'
import Api from '../../../services/api'

interface MyProps {
    close: (close: boolean) => any,
    name: string
}

interface MyState {
    close: (sl: boolean) => any,
    name: string,
    equalName: boolean
}

class Login extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            close: props.close,
            name: props.name,
            equalName: false
        }
    }

    render() {

        const Delete = () => {
            Api.delete(`/collection?name=${this.state.name}`).then(response => {
                if (response.data?.collection?._id) {
                    document.location.reload(true)
                }
            })
        }


        return (
            <div className="fixed bg-opacity-50 flex items-center bg-black w-full h-full z-10 top-0 left-0">
                <div className="container mx-auto">
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div>
                            <button className="float-right" onClick={() => this.state.close(false)}>
                                <GrClose />
                            </button>
                        </div>
                        <p className="text-gray-900 italic">To make sure you want to delete this collection you gonna need to type the name in the input.</p>
                        <p className="font-semibold">{this.state.name}</p>
                        <div className="mb-4">
                            <label className="block text-orange-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                        </label>
                            <input autoComplete="off" onChange={() => { this.setState({...this.state, equalName: this.state.name === $("[name=name]").val()}) }} className="shadow border rounded w-full py-2 px-3 text-gray-800" name="name" id="name" type="text" placeholder="Name" />
                        </div>
                        <div className="flex items-center justify-between">
                            {this.state.equalName ?
                                <button onClick={() => Delete()} className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded" type="button">
                                    Confirm delete
                                </button>
                                :
                                <div className="border border-orange-600 text-orange-600 font-bold py-2 px-4 rounded">
                                    Confirm delete
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login