import React from 'react'
import { GrClose } from 'react-icons/gr'
import { FaPlus, FaMinus } from 'react-icons/fa'
import $ from 'jquery'
import './index.css'
import Api from '../../../services/api'

interface MyProps {
    image: string,
    user: { user: string, userImageUrl: string },
    platform: { name: string },
    thumb: string,
    close: (opened: boolean) => any
}

interface MyState {
    collections: { name: string, imageAdded: boolean }[],
    image: string,
    user: { user: string, userImageUrl: string },
    platform: { name: string },
    thumb: string,
    createTab: boolean,
    close: (opened: boolean) => any
}

class Collection extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = {
            collections: [],
            image: props.image || "",
            user: props.user,
            createTab: false,
            platform: props.platform,
            thumb: props.thumb,
            close: props.close
        }
        this.ListCollections()
    }

    ListCollections = () => {
        let user = JSON.parse(localStorage.getItem("user") || "") || undefined
        Api.get(`/collection/list?user=${user?.username}&image=${this.state.image}`).then(response => {
            if (response.data?.collections) {
                this.setState({
                    ...this.state,
                    collections: response.data?.collections || []
                })
            }
        })
    }

    render() {

        const CreateCollection = () => {
            Api.post("/collection", { name: $("#collection-name").val() }).then(response => {
                if (response?.data?.collection?._id) {
                    $("#collection-name").val("")
                    this.ListCollections()
                }
            })
        }

        const AddImage = () => {
            Api.put("/collection/addImage", { name: $("[name=add-collection-name]:checked").val(), image: this.state.image }).then(response => {
                if (response?.data?.collection?._id) {
                    this.ListCollections()
                }
            })
        }

        const RemoveImage = () => {
            Api.put("/collection/removeImage", { name: $("[name=remove-collection-name]:checked").val(), image: this.state.image }).then(response => {
                if (response?.data?.collection?._id) {
                    this.ListCollections()
                }
            })
        }

        return (
            <div className="fixed bg-opacity-50 overflow-y-auto bg-black w-screen h-full z-40 top-0 left-0">
                <div className="container form-center top-0 left-0 mx-auto">
                    <div className="bg-white min-h-screen shadow-md rounded px-8 pt-6 pb-8 flex flex-col">
                        <div>
                            <button className="float-right p-2" onClick={() => this.state.close(false)}>
                                <GrClose />
                            </button>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="col-span-2 flex items-center">
                                <div className="mx-auto">
                                    <img src={this.state.thumb} className="w-64" alt={this.state.user.user} />
                                    <div className="float-right flex items-center py-2">
                                        <span className="px-2 font-semibold text-gray-700">
                                            {this.state.user.user}
                                        </span>
                                        <a className="inline-flex pr-2" href={this.state.user.userImageUrl} target="_blank" rel="noopener noreferrer">
                                            <img className="rounded-full h-6 w-6" src={this.state.user.userImageUrl} alt={this.state.user.user} />
                                        </a>
                                    </div>
                                    <div className="text-left flex items-center py-2">
                                        <a className="inline-flex" href={"https://pixabay.com/favicon-32x32.png"} target="_blank" rel="noopener noreferrer">
                                            <img className="rounded-full h-6 w-6" src={"https://pixabay.com/favicon-32x32.png"} alt={this.state.platform.name} />
                                        </a>
                                        <span className="px-2 font-semibold text-gray-700">
                                            {this.state.platform.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 col-span-2" />
                            <div className="col-span-2 md:col-span-1 m-1">
                                <div className="bg-orange-500 w-full p-4">
                                    <h1 className="font-bold text-white">Add this image to collection</h1>
                                </div>
                                <div className="border p-3 shadow-inner">
                                    {this.state.collections ? this.state.collections.filter(x => x.imageAdded === false).map(collection => {
                                        return <div key={collection.name} className="mb-4 mt-3 flex items-center">
                                            <input className="h-4 w-4 mr-2" type="radio" name="add-collection-name" value={collection.name} />
                                            <label htmlFor="userRemember" className="font-semibold text-gray-700">{collection.name}</label>
                                        </div>
                                    }) : ""
                                    }
                                    <button onClick={() => AddImage()} className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-1 px-2 rounded" type="button">
                                        Add to collection
                                </button>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1 m-1">
                                <div className="bg-orange-500 w-full p-4">
                                    <h1 className="font-bold text-white">Remove this image from collection</h1>
                                </div>
                                <div className="border p-3 shadow-inner">
                                    {this.state.collections ? this.state.collections.filter(x => x.imageAdded === true).map(collection => {
                                        return <div key={collection.name} className="mb-4 mt-3 flex items-center">
                                            <input className="h-4 w-4 mr-2" type="radio" name="remove-collection-name" value={collection.name} />
                                            <label htmlFor="userRemember" className="font-semibold text-gray-700">{collection.name}</label>
                                        </div>
                                    }) : ""
                                    }
                                    <button onClick={() => RemoveImage()} className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-1 px-2 rounded" type="button">
                                        Remove from collection
                                </button>
                                </div>
                            </div>
                            <hr className="my-4 col-span-2" />
                            <div className="col-span-2">
                                <div className="bg-orange-500 w-full p-4 grid grid-cols-4">
                                    <div className="col-span-3 flex items-center">
                                        <h1 className="font-bold text-white cursor-pointer" onClick={() => this.setState({ ...this.state, createTab: true })}>Create Collection</h1>
                                    </div>
                                    <div className="col-span-1 text-right mr-4">
                                        {
                                            this.state.createTab ?
                                                <button onClick={() => this.setState({ ...this.state, createTab: false })} className="text-white p-2">
                                                    <FaMinus />
                                                </button> :
                                                <button onClick={() => this.setState({ ...this.state, createTab: true })} className="text-white p-2">
                                                    <FaPlus />
                                                </button>
                                        }
                                    </div>
                                </div>
                                {
                                    this.state.createTab ?
                                        <div className="p-4 shadow-inner border">
                                            <input className="shadow border rounded w-full py-2 px-3 mt-2 mb-4 text-gray-800" id="collection-name" type="collection-name" placeholder="Collection name" />
                                            <button onClick={() => CreateCollection()} className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-1 px-2 rounded" type="button">
                                                Create collection
                                            </button>
                                        </div> : ""
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Collection