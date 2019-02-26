import React from 'react';

interface stateMent{

}
const DragItem=(props:any)=>{
    const {child}=props;
    return (
        <div className="drag-item">
            {child}
        </div>
    );
};
class Drag extends React.Component<any,stateMent>{
    constructor(props:any){
        super(props);
    }

    render():JSX.Element{
        return(
            <div className="drag-body">

            </div>
        );
    }
}

export default Drag;