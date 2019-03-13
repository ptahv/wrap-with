import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super();

        Object.keys(props)
            .filter(key => !['render', 'constructor'].includes(key))
            .forEach(key => {
                if (['shouldComponentUpdate'].includes(key))
                    this[key] = (props) => props[key]();
                else 
                    this[key] = () => this.props[key]();
            });

        if (props.constructor)
            props.constructor();
    }

    render() {
        const { render, children } = this.props;
        
        return render 
            ? render()
            : children ? children : null
    }
}