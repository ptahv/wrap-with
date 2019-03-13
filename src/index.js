import React from 'react';

export default {
    Providers: class Providers extends React.Component {
        constructor(props) {
            super();
    
            const { children, ...components } = props;
            const componentKeys = Object.keys(components);
    
            this.ProvidersComponent = componentKeys.reduceRight((ChildComponent, key, i) => {
                const Component = components[key];
    
                return ({children}) => (
                    <Component>
                        <ChildComponent>
                            {children}
                        </ChildComponent>
                    </Component>
                )
            }, ({children}) => children)
        }
    
        render() {
            const { ProvidersComponent, props } = this;
    
            return <ProvidersComponent>
                {props.children}
            </ProvidersComponent>
        }
    },

    Consumers: class Consumers extends React.Component {
        constructor(props){
            super();
    
            const { children, ...components } = props;
            const componentKeys = Object.keys(components);
            
            if (!componentKeys.length || typeof children !== 'function')
                return children;
        
            this.ConsumersComponent = componentKeys.reduceRight((ChildComponent, key) => {
                const Component = components[key];
                
                return ({children, data = {}}) => (
                    <Component>
                        {(...val) => {
                            const newData = {
                                ...data,
                                [key]: val.length > 1 ? val : val[0] 
                            };
    
                            return <ChildComponent data={newData}>
                                {children}
                            </ChildComponent>
                        }}
                    </Component>
                )
            }, ({children, data}) => children(data))
        }
    
        render() {
            const { ConsumersComponent, props } = this;

            return <ConsumersComponent>
                {props.children}
            </ConsumersComponent>
        }
    }
}