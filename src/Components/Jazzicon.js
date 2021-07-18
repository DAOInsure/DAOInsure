import {createRef, PureComponent} from "react";
import jazzicon from "@metamask/jazzicon";

export default class Jazzicon extends PureComponent {
    container = createRef();

    componentDidMount() {
        this.appendJazzicon();
    }

    componentDidUpdate(){
        const { children } = this.container.current;
        this.container.current.removeChild(children[0]);
        this.appendJazzicon();
    }

    appendJazzicon() {
        const address = this.props.address;
        const diameter = this.props.diameter;
        const seed = parseInt(address.slice(2,10), 16);
        const image = jazzicon(diameter, seed);
        this.container.current.appendChild(image); 
    }

    render() {
        return <span style={{ marginTop: "5px" }} ref={this.container}></span>
    }
}