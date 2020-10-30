import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Card from '../../components/card'
import {ImagePattern} from '../../components/card'
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
        api.get(`/image/search?q=${getParameterByName("q")}`).then(r => setPosts(r.data?.result || undefined))
    }

    useEffect(() => {
        api.get(`/image/search?q=${getParameterByName("q")}`).then(r => setPosts(r.data?.result || undefined))
    },[])

    return (
        <>
            <Navbar search={search} />
            <div className="container mx-auto">
                <div id="photos">
                    {posts?.map((v,i) => {
                        return <Card id={v.id} liked={v.liked} likes={v.likes} platform={v.platform} thumb={v.thumb} url={v.url} user={v.user} userImageUrl={v.userImageUrl} key={i} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Home