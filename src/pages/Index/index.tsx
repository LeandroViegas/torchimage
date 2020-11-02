import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import { ImagePattern } from '../../components/card'
import { FaSearch, FaUser } from 'react-icons/fa'
import './index.css'
import api from '../../services/api'
import Collection from '../../components/collection'

const Home = () => {
    const [posts, setPosts] = useState<ImagePattern[]>();
    const [collections, setCollections] = useState<{ name: string, onwer: { user: string } }[]>();
    const [users, setUsers] = useState<{ user: string }[]>();
    const [abaOppened, setAbaOppened] = useState<number>(0);


    function getParameterByName(name: string, url?: string) {
        if (!url) url = window.location.href;
        name = name.replace(/[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const search = () => {
        api.get(`/image/search?q=${getParameterByName("q") || ""}`).then(r => setPosts(r.data?.images || undefined))
        api.get(`/collection/search?q=${getParameterByName("q") || ""}`).then(r => setCollections(r.data?.collections || undefined))
        api.get(`/users/search?q=${getParameterByName("q") || ""}`).then(r => setUsers(r.data?.users || undefined))
    }

    useEffect(() => {
        api.get(`/image/search?q=${getParameterByName("q") || ""}`).then(r => setPosts(r.data?.images || undefined))
        api.get(`/collection/search?q=${getParameterByName("q") || ""}`).then(r => setCollections(r.data?.collections || undefined))
        api.get(`/users/search?q=${getParameterByName("q") || ""}`).then(r => setUsers(r.data?.users || undefined))
    }, [])

    return (
        <>
            <Navbar search={search} />

            {!getParameterByName("q") ?
                <>
                    <div style={{ height: "500px" }}>
                        <img className="absolute w-full h-64 object-cover" style={{ height: "500px" }} src="https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg" alt="" />
                        <div className="bg-black bg-opacity-50 w-full absolute" style={{ height: "500px" }}>
                        </div>
                        <div className="flex items-center justify-center w-full h-full">
                            <div className="z-20 text-center">
                                <h1 className="text-white text-3xl py-4 font-bold">You are lost? Why don't you use a torch?</h1>
                                <form method="GET">
                                    <input type="search" name="q" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
                                    <button type="submit" className="relative" style={{ left: "-30px", top: "3px" }}>
                                        <FaSearch />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container py-4 mx-auto">
                        <div id="photos">
                            {posts?.map((v, i) => {
                                return <Card id={v.id} liked={v.liked} likes={v.likes} platform={v.platform} thumb={v.thumb} url={v.url} user={v.user} userImageUrl={v.userImageUrl} key={i} />
                            })}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="container pt-4 mx-auto">
                        <button onClick={() => setAbaOppened(0)} className={(abaOppened === 0 ? "bg-orange-600" : "bg-orange-500") + " text-white p-3"}>Images</button>
                        <button onClick={() => setAbaOppened(1)} className={(abaOppened === 1 ? "bg-orange-600" : "bg-orange-500") + " text-white p-3"}>Collections</button>
                        <button onClick={() => setAbaOppened(2)} className={(abaOppened === 2 ? "bg-orange-600" : "bg-orange-500") + " text-white p-3"}>Users</button>
                    </div>
                    <div className="container mx-auto">
                        {abaOppened === 0 ?
                            <div id="photos">
                                {posts?.map((v, i) => {
                                    return <Card id={v.id} liked={v.liked} likes={v.likes} platform={v.platform} thumb={v.thumb} url={v.url} user={v.user} userImageUrl={v.userImageUrl} key={i} />
                                })}
                            </div> : ""
                        }
                        {abaOppened === 1 ?
                            <div className="grid grid-cols-4">
                                {collections?.map((collection) => {
                                    return <Collection logged={false} user={String(collection?.onwer?.user)} name={collection?.name} key={collection?.name} />
                                })}
                            </div> : ""
                        }
                        {abaOppened === 2 ?
                            <div className="grid grid-cols-4">
                                {users?.map((user) => {
                                    return <div className="col-span-1 text-center py-4">
                                        <a href={`/profile/${user.user}`}>
                                        <FaUser className="mx-auto text-gray-900 bg-gray-200 h-20 w-20 flex items-center justify-center rounded-full" />
                                        <div className="text-sm py-2 text-gray-800">
                                            {user.user}
                                        </div>
                                        </a>
                                    </div>
                                })}
                            </div> : ""
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Home