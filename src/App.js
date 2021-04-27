import './App.css';
import React from 'react';

import Checkbox from "./Checkbox";

const OPTIONS = [
    'Beds',
    'ICU',
    'Oxygen',
    'Ventilator',
    'Tests',
    'Fabiflu',
    'Remdesivir',
    'Favipiravir',
    'Tocilizumab',
    'Plasma',
];

const POPULAR_CITIES = [
    'Delhi',
    'Pune',
    'Mumbai',
    'Bangalore',
    'Thane',
    'Hyderabad',
    'Nagpur',
    'Lucknow',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Goa',
    'Jaipur'
];

class App extends React.Component {
    state = {
        city: '',
        verified: true,
        checkboxes: OPTIONS.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
            {}
        )
    };

    selectAllCheckboxes = isSelected => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
            // BONUS: Can you explain why we pass updater function to setState instead of an object?
            this.setState(prevState => ({
                checkboxes: {
                    ...prevState.checkboxes,
                    [checkbox]: isSelected
                }
            }));
        });
    };

    selectAll = () => this.selectAllCheckboxes(true);

    deselectAll = () => this.selectAllCheckboxes(false);

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [name]: !prevState.checkboxes[name]
            }
        }));
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        var link = "https://twitter.com/search?q="+ (this.state.verified ? "verified+" : "") + this.state.city

        Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .forEach(checkbox => {
                link += "+OR+"+checkbox;
            });

        window.location = link;
    };

    handleVerified = event => {
        this.setState({verified: event.target.value});
    };

    createCheckbox = option => (
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
        />
    );

    handleCity = event => { this.setState({city: event.target.value});};

    createCheckboxes = () => OPTIONS.map(this.createCheckbox);

    createPopularButton = city => (
        <button
            style={{margin: '4px 0px'}}
            type="button"
            className="btn btn-outline-primary mr-2"
            onClick={(e) => this.setState({city: city})}
        >
            {city}
        </button>
    );

    createPopularCities = () => POPULAR_CITIES.map(this.createPopularButton)

    render() {
        return (
            <div>
                <div style={{textAlign: 'center', margin: '24px 0px'}}>
                    <span style={{fontSize: '28px'}}>Covid Resources - Twitter</span>
                </div>
                <div>
                <div className="container" style={{maxWidth: '680px'}}>
                    <div className="row mt-5">
                        <div className="col-sm-12">
                            <div>
                                <div style={{fontSize: '16px', margin: '8px 0px'}}>Popular Cities :</div>
                                {this.createPopularCities()}
                            </div>
                            <form onSubmit={this.handleFormSubmit} style={{margin: '12px 0px'}}>
                                <label>Name of the city:<br/>
                                <input type="text" value={this.state.city} onChange={this.handleCity}/> </label>
                                <Checkbox
                                    label="Verified"
                                    isSelected={this.state.verified}
                                    onCheckboxChange={this.handleVerified}
                                    key="verified"
                                />
                                <div className="form-group mt-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-2"
                                        onClick={this.selectAll}
                                    >
                                        Select All
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary mr-2"
                                        onClick={this.deselectAll}
                                    >
                                        Deselect All
                                    </button>
                                </div>
                                {this.createCheckboxes()}
                                <button type="submit" className="btn btn-primary">
                                    Generate Link
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default App;
