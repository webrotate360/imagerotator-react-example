import React, { Component } from 'react';
import { render } from 'react-dom';
import WR360 from '@webrotate360/imagerotator';
import './style.css';
// all.css packs all themes and relies on theme info in published xml. Import individual theme instead if needed, e.g (thin.css or round.css, etc).
import '@webrotate360/imagerotator/build/css/all.css';

class App extends Component {

    componentDidMount() {
        const viewer = WR360.ImageRotator.Create('webrotate360');

        viewer.licenseCode = 'your-license-code';
        viewer.settings.configFileURL = '/example/example.xml';
        viewer.settings.graphicsPath = '/graphics';
        viewer.settings.alt = 'Your alt image description';
        viewer.settings.responsiveBaseWidth = 800;
        viewer.settings.responsiveMinHeight = 300;

        viewer.settings.apiReadyCallback = (api, isFullScreen) => {
            this.viewerApi = api;
            this.viewerApi.images.onDrag(event => {
                console.log(`${ event.action }; current image index = ${ this.viewerApi.images.getCurrentImageIndex() }`);
            });
        }

        viewer.runImageRotator();
    }

    componentWillUnmount() {
        if (this.viewerApi)
            this.viewerApi.delete();
    }

    render() {
        return (
            <div className="alignCenter">
                <div className="viewerContainer">
                    <div id="webrotate360"/>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));