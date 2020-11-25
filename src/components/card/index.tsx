import React from 'react'
import { FaHeart, FaPlusCircle, FaDownload } from 'react-icons/fa'
import $ from 'jquery'
import Collection from './collection'
import api from '../../services/api'
import './index.css'

interface MyProps {
    id: string;
    platform: string;
    url: string;
    thumb: string;
    user: string;
    userImageUrl: string;
    liked: boolean;
    likes: number;
}

interface MyState {
    id: string;
    platform: string;
    url: string;
    thumb: string;
    user: string;
    userImageUrl: string;
    liked: boolean;
    loadingLike: boolean;
    likes: number;
    logged: boolean;
    collectionWindow: boolean;
}

export interface ImagePattern {
    id: string;
    platform: string;
    url: string;
    thumb: string;
    user: string;
    userImageUrl: string;
    liked: boolean;
    likes: number;
}

class Card extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props);
        this.state = props
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({ ...this.state, logged: JSON.parse(localStorage.getItem("user") || "") ? true : false })
        }
    }

    render() {

        const like = () => {
            if (!this.state.liked && !this.state.loadingLike) {
                this.setState({ ...this.state, likes: this.state.likes + 1, liked: true, loadingLike: true })
                api.post("/image/like", { id: this.state.id, platform: this.state.platform }).then(r => { this.setState({ ...this.state, loadingLike: false }); r.data?.image?._id ? this.setState({ ...this.state, likes: this.state.likes, liked: true }) : this.setState({ ...this.state, likes: this.state.likes - 1, liked: false }) })
            }
        }

        const unlike = () => {
            if (this.state.liked && !this.state.loadingLike) {
                this.setState({ ...this.state, likes: this.state.likes - 1, liked: false, loadingLike: true })
                api.post("/image/unlike", { id: this.state.id, platform: this.state.platform }).then(r => { this.setState({ ...this.state, loadingLike: false }); r.data?.image?._id ? this.setState({ ...this.state, likes: this.state.likes, liked: false }) : this.setState({ ...this.state, likes: this.state.likes + 1, liked: true }) })
            }
        }

        const OpenAndClose = (oppened: boolean) => {
            this.setState({ ...this.state, collectionWindow: oppened })
            $("body").css({ 'overflow-y': oppened ? 'hidden' : 'auto' })
        }

        return (
            <>
                {this.state.collectionWindow ?
                    <Collection thumb={this.state.thumb} platform={{ name: this.state.platform }} user={{ user: this.state.user, userImageUrl: this.state.userImageUrl }} image={String(`${this.state.id}_${this.state.platform}`)} close={OpenAndClose} />
                    : ""
                }
                <div className="card my-1 shadow-sm">
                    <div>
                        <img className="imagens w-full" src={this.state.thumb} alt={this.state.platform + " image by " + this.state.user} />
                        <div className="border border-t-0 bg-orange-600 text-gray-100">
                            <div className="float-right">
                                <a className="inline-flex pr-2" href={this.state.userImageUrl} target="_blank" rel="noopener noreferrer">
                                    <img className="rounded-full h-6 w-6" src={this.state.userImageUrl} alt={this.state.user} />
                                </a>
                                <a className="inline-flex" href={"https://pixabay.com/favicon-32x32.png"} target="_blank" rel="noopener noreferrer">
                                    <img className="rounded-full h-6 w-6" src={"https://pixabay.com/favicon-32x32.png"} alt={this.state.platform} />
                                </a>
                            </div>
                            <div className="flex items-center">
                                {this.state.logged ?
                                    this.state.liked ?
                                        <span onClick={() => unlike()} className="inline-flex cursor-pointer flex items-center">
                                            <span className="pr-1">{this.state.likes}</span>
                                            <span className="text-blue-400"><FaHeart /></span>
                                        </span>
                                        :
                                        <span onClick={() => like()} className="inline-flex cursor-pointer flex items-center">
                                            <span className="pr-1">{this.state.likes}</span>
                                            <span><FaHeart /></span>
                                        </span>
                                    :
                                    <span className="inline-flex cursor-pointer flex items-center">
                                        <span className="pr-1">{this.state.likes}</span>
                                        <span className="text-gray-400"><FaHeart /></span>
                                    </span>
                                }
                                {this.state.logged ?
                                    <span onClick={() => OpenAndClose(true)} className="inline-flex pl-4 cursor-pointer">
                                        <FaPlusCircle />
                                    </span> :
                                    <span className="inline-flex text-gray-400 pl-4 cursor-pointer">
                                        <FaPlusCircle />
                                    </span>
                                }
                                <span className="inline-flex pl-4 cursor-pointer self-center">
                                    <a href={this.state.url} rel="noopener noreferrer" download>
                                        <FaDownload />
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Card