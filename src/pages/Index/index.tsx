import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import { ImagePattern } from '../../components/card'
import { FaSearch } from 'react-icons/fa'
import './index.css'
import api from '../../services/api'

const Home = () => {
    const [posts, setPosts] = useState<ImagePattern[]>();

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
        api.get(`/image/search?q=${getParameterByName("q") || ""}`).then(r => setPosts(r.data?.result || undefined))
    }

    useEffect(() => {
        api.get(`/image/search?q=${getParameterByName("q") || ""}`).then(r => setPosts(r.data?.result || undefined))
    }, [])

    return (
        <>
            <Navbar search={search} />

            {!getParameterByName("q") ?
            <div style={{ height: "500px" }}>
                <img className="absolute w-full h-64 object-cover" style={{ height: "500px" }} src="https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821_960_720.jpg" alt="" />
                <div className="bg-black bg-opacity-50 w-full absolute" style={{ height: "500px" }}>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="z-20 text-center">
                        <h1 className="text-white text-3xl py-4 font-bold">You are lost? Why don't you use a torch?</h1>
                        <form method="GET">
                            <input type="search" name="q" placeholder="Search" className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"/>
                                <button type="submit" className="relative" style={{left: "-30px", top: "3px"}}>
                                    <FaSearch /> 
                                </button> 
                        </form>
                    </div>
                </div>
            </div>
            : ""
            }

            <div className="container py-4 mx-auto">
                <div id="photos">
                    {posts?.map((v, i) => {
                        return <Card id={v.id} liked={v.liked} likes={v.likes} platform={v.platform} thumb={v.thumb} url={v.url} user={v.user} userImageUrl={v.userImageUrl} key={i} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home