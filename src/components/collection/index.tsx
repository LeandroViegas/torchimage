import React from 'react'

interface MyProps {
    name: string;
    user: string;
}
interface MyState {
    name: string;
    user: string;
}
class Collection extends React.Component<MyProps, MyState> {

    constructor(props: any) {
        super(props)
        this.state = props
    }

    render() {
        return (
            <>
                <div className="col-span-1 p-2 flex items-center h-32 w-full">
                    <a href={"/profile/" + this.state.user + "/" + this.state.name} className="h-full w-full bg-gray-200 text-center flex items-center">
                        <span className="mx-auto">{this.state.name}</span>
                    </a>
                </div>
            </>
        )
    }
}

export default Collection