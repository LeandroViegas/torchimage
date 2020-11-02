import React from 'react'
import { FaTrash } from 'react-icons/fa'
import Delete from './delete'

interface MyProps {
    name: string;
    user: string;
    logged: boolean;
}
interface MyState {
    name: string;
    user: string;
    logged: boolean;
    forms: {
        delete: boolean
    }
}
class Collection extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props)
        this.state = {
            ...props,
            forms: { delete: false }
        }
    }

    render() {

        const CloseOpenDelete = (close: boolean) => {
            this.setState({ ...this.state, forms: { delete: close } })
        }

        return (
            <>
                {   this.state.forms.delete ?
                    <Delete close={CloseOpenDelete} name={this.state.name} />
                    : ""
                }
                <div className="col-span-1 p-2">
                    <div className="flex items-center h-32 w-full">
                        <a href={"/profile/" + this.state.user + "/" + this.state.name} className="h-full w-full bg-orange-500 text-white text-center flex items-center">
                            <span className="mx-auto text-md font-bold">{this.state.name}</span>
                        </a>
                    </div>
                    {this.state.logged ?
                        <div className="grid grid-cols-4 w-full">
                            <button onClick={() => this.setState({...this.state, forms: {delete: true}})} className="col-span-1 text-white bg-red-600 py-4">
                                <FaTrash className="mx-auto" />
                            </button>
                        </div> : ""
                    }
                </div>
            </>
        )
    }
}

export default Collection