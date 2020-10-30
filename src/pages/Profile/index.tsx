import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar'
import Card, { ImagePattern } from '../../components/card'
import Collection from '../../components/collection'
import { FaUser } from 'react-icons/fa'
import './index.css'
import api from '../../services/api'

const Profile = (props: any) => {
    const [userName] = useState<string>(props.match.params.user);

    const [user, setUser] = useState<{
        user: string,
        mail: string,
        bio: string
    }>()

    const [likes, setLikes] = useState<ImagePattern[]>()
    const [collections, setCollections] = useState<{ name: string }[]>()
    const [abaOppened, setAbaOppened] = useState<Number>(0)

    useEffect(() => {
        api.get(`/users?user=${encodeURI(userName)}`).then(r => {
            let ur = r.data.user
            setUser({ user: ur?.user, mail: ur?.mail, bio: ur?.bio })
            api.get(`/image/likeBy?user=${encodeURI(userName)}`).then(r1 => {
                setLikes(r1.data.result)
            })
            api.get(`/collection/list?user=${ur?.user}&image=${""}`).then(response => {
                if (response.data?.collections)
                    setCollections(response.data?.collections)
            })
        })
    }, [userName])

    return (
        <>
            <Navbar />
            <div className="container grid grid-cols-6 p-4 py-6 mx-auto">
                <div className="col-span-6 md:col-span-1 flex justify-center md:justify-end items-center text-6xl px-4">
                    <div>
                        <FaUser className="mx-auto text-gray-900 bg-gray-200 h-20 w-20 flex items-center justify-center rounded-full" />
                        {/* <div className="text-sm py-2 text-gray-800 flex items-center">
                            <span><FaUser /></span>
                            <span>1000 Followers</span>
                        </div> */}
                    </div>
                </div>
                <div className="col-span-6 md:col-span-3">
                    <h1 className="text-gray-900 text-2xl">{user?.user}</h1>
                    <p className="text-gray-800">{user?.mail}</p>
                    <p className="text-gray-800">{user?.bio}</p>
                </div>
            </div>

            <div className="container mx-auto">
                <button onClick={() => setAbaOppened(0)} className={(abaOppened === 0 ? "bg-gray-400" : "bg-gray-300") + " p-3"}>Likes</button>
                <button onClick={() => setAbaOppened(1)} className={(abaOppened === 1 ? "bg-gray-400" : "bg-gray-300") + " p-3"}>Collections</button>
            </div>
            { abaOppened === 0 ?
                <div className="container mx-auto">
                    <div id="photos">
                        {likes?.map((card) => {
                            return <Card id={card.id} likes={card.likes} platform={card.platform} liked={card.liked} thumb={card.thumb} url={card.url} user={card.user} userImageUrl={card.userImageUrl} key={card.id + card.platform} />
                        })}
                    </div>
                </div> : ""}
            { abaOppened === 1 ?
                <div className="container mx-auto">
                    <div className="grid grid-cols-3">
                        {collections?.map((collection) => {
                            return <Collection user={String(user?.user)} name={collection?.name} key={collection?.name} />
                        })}
                    </div>
                </div> : ""}
        </>
    )
}

export default Profile