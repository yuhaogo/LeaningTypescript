import './main.less';
import * as React from 'react';
import {Layout} from 'antd';
const {Header,Content}=Layout

class Index extends React.Component<any,any>{
    constructor(props:any){
        super(props);
    }

    render():JSX.Element{
        return(
            // <div className="main">
            //     <div className="menu-main"></div>
            //     <div className="content-main">
            //         <div className="content-body">
            //             <div className="content">
                            
            //             </div>
            //             <div className="move-btn">
            //                 <div className="move-left"></div>
            //                 <div className="move-right"></div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            <Layout className="main">
                <Header className="menu-main">
                    <div className="user-info">
                        
                    </div>
                </Header>
                <Content></Content>
            </Layout>
        )
    }
}
export default Index;